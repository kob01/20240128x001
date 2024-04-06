import React from 'react'

import { useDragControl as useDragControlMouse } from './View.Component.DragControl.Mouse'
import { useDragControl as useDragControlTouch } from './View.Component.DragControl.Touch'
import { useDragControl } from './View.Component.DragControl'
import { useKeyboardRecord } from './View.Component.KeyboardRecord'

import ContentRender from './View.Page.Canvas.ContentRender'

import { ImitationPageCanvas } from './Imitation'

import { range, debounce, throttleLastRIC } from './utils.common'

function App() {
  const canvasFind = ImitationPageCanvas.state.memo.canvasFind(ImitationPageCanvas.state.store.canvas.control)
  const paintActionRunFind = ImitationPageCanvas.state.memo.paintActionRunFind(ImitationPageCanvas.state.store.paint.control)

  const inControlPaint = ImitationPageCanvas.state.store.control.paint

  const dragControlType = React.useRef()
  const dragControlProp = React.useRef()

  const { code } = useKeyboardRecord({ enable: true })

  const inSpace = code.includes('Space')
  const inMeta = code.includes('MetaLeft') || code.includes('MetaRight')

  const onChangeDragControlMouse = (params) => {
    if (ImitationPageCanvas.state.store.recting === true) return

    const status = params.status

    const x = params.x
    const y = params.y
    const changedX = params.changedX
    const changedY = params.changedY

    if (status === 'afterStart' && inSpace === false && inMeta === false && inControlPaint === true && canvasFind !== undefined && canvasFind.visibility === true) {
      dragControlType.current = 0
    }
    if (status === 'afterStart' && inSpace === true && inMeta === false) {
      dragControlType.current = 1
    }
    if (status === 'afterStart' && inMeta === true && inSpace === false && canvasFind !== undefined && canvasFind.visibility === true) {
      dragControlType.current = 2
    }

    if (dragControlType.current === 0 && (status === 'afterStart' || status === 'afterMove' || status === 'afterEnd')) {
      const offsetX = (x - ImitationPageCanvas.state.store.rect.width / 2 - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.view.scaleX / canvasFind.scaleX * ImitationPageCanvas.state.store.dpr
      const offsetY = (y - ImitationPageCanvas.state.store.rect.height / 2 - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.view.scaleY / canvasFind.scaleY * ImitationPageCanvas.state.store.dpr
      const translateX = ImitationPageCanvas.state.store.view.translateX + canvasFind.translateX
      const translateY = ImitationPageCanvas.state.store.view.translateY + canvasFind.translateY
      const relativeX = offsetX - translateX
      const relativeY = offsetY - translateY

      paintActionRunFind(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, canvasFind, canvasFind.action, status, relativeX, relativeY)

      if (status === 'afterStart') canvasFind.previousActionContextShouldUpdate = true

      canvasFind.lastActionContextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }

    if (dragControlType.current === 1 && status === 'afterMove') {
      const offsetX = changedX / ImitationPageCanvas.state.store.view.scaleX * ImitationPageCanvas.state.store.dpr
      const offsetY = changedY / ImitationPageCanvas.state.store.view.scaleY * ImitationPageCanvas.state.store.dpr

      ImitationPageCanvas.state.store.view.translateX = ImitationPageCanvas.state.store.view.translateX + offsetX
      ImitationPageCanvas.state.store.view.translateY = ImitationPageCanvas.state.store.view.translateY + offsetY

      ImitationPageCanvas.state.store.canvas.information.forEach(i => i.contextShouldUpdate = true)

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }

    if (dragControlType.current === 2 && status === 'afterMove') {
      const offsetX = changedX / ImitationPageCanvas.state.store.view.scaleX * ImitationPageCanvas.state.store.dpr
      const offsetY = changedY / ImitationPageCanvas.state.store.view.scaleY * ImitationPageCanvas.state.store.dpr

      canvasFind.translateX = canvasFind.translateX + offsetX
      canvasFind.translateY = canvasFind.translateY + offsetY

      canvasFind.contextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }

    if (status === 'afterEnd') {
      dragControlType.current = undefined
      dragControlProp.current = undefined
    }
  }

  const { onMouseDown } = useDragControlMouse({ enable: true, onChange: onChangeDragControlMouse })

  const onChangeDragControlTouch = (params) => {
    if (ImitationPageCanvas.state.store.recting === true) return

    const status = params.status

    const x = params.x
    const y = params.y
    const changedX = params.changedX
    const changedY = params.changedY

    const inTouch2 = Boolean(params.x && params.x.length === 2 && params.y && params.y.length === 2)
    const inTouch3 = Boolean(params.x && params.x.length === 3 && params.y && params.y.length === 3)

    if (status === 'afterStart' && inControlPaint === true && canvasFind !== undefined && canvasFind.visibility === true) {
      dragControlType.current = 0
    }
    if (status === 'afterStart' && inTouch2 === true) {
      dragControlType.current = 1
    }
    if (status === 'afterStart' && inTouch3 === true && canvasFind !== undefined && canvasFind.visibility === true) {
      dragControlType.current = 2
    }

    if (dragControlType.current === 0 && (status === 'afterStart' || status === 'afterMove' || status === 'afterEnd')) {
      const offsetX = (x[0] - ImitationPageCanvas.state.store.rect.width / 2 - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.view.scaleX / canvasFind.scaleX * ImitationPageCanvas.state.store.dpr
      const offsetY = (y[0] - ImitationPageCanvas.state.store.rect.height / 2 - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.view.scaleY / canvasFind.scaleY * ImitationPageCanvas.state.store.dpr
      const translateX = ImitationPageCanvas.state.store.view.translateX + canvasFind.translateX
      const translateY = ImitationPageCanvas.state.store.view.translateY + canvasFind.translateY
      const relativeX = offsetX - translateX
      const relativeY = offsetY - translateY

      paintActionRunFind(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, canvasFind, canvasFind.action, status, relativeX, relativeY)

      if (status === 'afterStart') canvasFind.previousActionContextShouldUpdate = true

      canvasFind.lastActionContextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }

    if (dragControlType.current === 1 && status === 'afterMove' && inTouch2 === true) {
      const offsetX = (changedX[0] + changedX[1]) / 2 / ImitationPageCanvas.state.store.view.scaleX * ImitationPageCanvas.state.store.dpr
      const offsetY = (changedY[0] + changedY[1]) / 2 / ImitationPageCanvas.state.store.view.scaleY * ImitationPageCanvas.state.store.dpr

      console.log(offsetX, offsetY)

      ImitationPageCanvas.state.store.view.translateX = ImitationPageCanvas.state.store.view.translateX + offsetX
      ImitationPageCanvas.state.store.view.translateY = ImitationPageCanvas.state.store.view.translateY + offsetY

      ImitationPageCanvas.state.store.canvas.information.forEach(i => i.contextShouldUpdate = true)

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }

    if (dragControlType.current === 2 && status === 'afterMove' && inTouch3 === true) {
      const offsetX = (changedX[0] + changedX[1] + changedX[2]) / 3 / ImitationPageCanvas.state.store.view.scaleX * ImitationPageCanvas.state.store.dpr
      const offsetY = (changedY[0] + changedY[1] + changedY[2]) / 3 / ImitationPageCanvas.state.store.view.scaleY * ImitationPageCanvas.state.store.dpr

      canvasFind.translateX = canvasFind.translateX + offsetX
      canvasFind.translateY = canvasFind.translateY + offsetY

      canvasFind.contextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }

    if (status === 'afterEnd') {
      dragControlType.current = undefined
      dragControlProp.current = undefined
    }
  }

  const { onTouchStart } = useDragControlTouch({ enable: true, onChange: onChangeDragControlTouch })

  const onWheel = (e) => {
    if (ImitationPageCanvas.state.store.recting === true) return

    if (e.deltaY === 0) return

    if (e.nativeEvent.wheelDelta === 240 || e.nativeEvent.wheelDelta === -240) {
      const wheelDelta = e.deltaY

      var scaleX = range(Number(Number(ImitationPageCanvas.state.store.view.scaleX - ImitationPageCanvas.state.store.view.scaleX * 0.01 * wheelDelta).toFixed(2)), 0.02, 24)
      if (wheelDelta < 0 && scaleX === ImitationPageCanvas.state.store.view.scaleX) var scaleX = range(ImitationPageCanvas.state.store.view.scaleX + 0.01, 0.02, 24)
      if (wheelDelta > 0 && scaleX === ImitationPageCanvas.state.store.view.scaleX) var scaleX = range(ImitationPageCanvas.state.store.view.scaleX - 0.01, 0.02, 24)
      ImitationPageCanvas.state.store.view.scaleX = scaleX

      var scaleY = range(Number(Number(ImitationPageCanvas.state.store.view.scaleY - ImitationPageCanvas.state.store.view.scaleY * 0.01 * wheelDelta).toFixed(2)), 0.02, 24)
      if (wheelDelta < 0 && scaleY === ImitationPageCanvas.state.store.view.scaleY) var scaleY = range(ImitationPageCanvas.state.store.view.scaleY + 0.01, 0.02, 24)
      if (wheelDelta > 0 && scaleY === ImitationPageCanvas.state.store.view.scaleY) var scaleY = range(ImitationPageCanvas.state.store.view.scaleY - 0.01, 0.02, 24)
      ImitationPageCanvas.state.store.view.scaleY = scaleY

      ImitationPageCanvas.state.store.canvas.information.forEach(i => i.contextShouldUpdate = true)

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }

    if (e.nativeEvent.wheelDelta !== 240 && e.nativeEvent.wheelDelta !== -240) {
      const offsetX = e.deltaX / ImitationPageCanvas.state.store.view.scaleX * ImitationPageCanvas.state.store.dpr * 2 * -1
      const offsetY = e.deltaY / ImitationPageCanvas.state.store.view.scaleY * ImitationPageCanvas.state.store.dpr * 2 * -1

      ImitationPageCanvas.state.store.view.translateX = ImitationPageCanvas.state.store.view.translateX + offsetX
      ImitationPageCanvas.state.store.view.translateY = ImitationPageCanvas.state.store.view.translateY + offsetY

      ImitationPageCanvas.state.store.canvas.information.forEach(i => i.contextShouldUpdate = true)

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }
  }

  const styleInDrag = { position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', width: '100%', height: '100%', transitionProperty: 'width, height', transitionDuration: '1s' }

  return <div style={styleInDrag} onMouseDown={onMouseDown} onTouchStart={onTouchStart} onWheel={onWheel} children={<ContentRender />} />
}

export default App