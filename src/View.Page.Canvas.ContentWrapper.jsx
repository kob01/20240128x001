import React from 'react'

import { useDragControl as useDragControlMouse } from './View.Component.DragControl.Mouse'
import { useDragControl as useDragControlTouch } from './View.Component.DragControl.Touch'
import { useKeyboardRecord } from './View.Component.KeyboardRecord'

import ContentRender from './View.Page.Canvas.ContentRender'

import { ImitationPageCanvas } from './Imitation'

import { range } from './utils.common'

function App() {
  const canvasLayerFind = ImitationPageCanvas.state.memo.canvasLayerFind(ImitationPageCanvas.state.store.canvas.current)
  const paintOptionActionRunFind = ImitationPageCanvas.state.memo.paintOptionActionRunFind(ImitationPageCanvas.state.store.paint.current)
  const paintSettingFind = ImitationPageCanvas.state.memo.paintSettingFind(ImitationPageCanvas.state.store.paint.current)

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

    if (status === 'afterStart' && inSpace === false && inMeta === false && inControlPaint === true && canvasLayerFind !== undefined && canvasLayerFind.visibility === true) {
      dragControlType.current = 0
    }
    if (status === 'afterStart' && inSpace === true && inMeta === false) {
      dragControlType.current = 1
    }
    if (status === 'afterStart' && inMeta === true && inSpace === false && canvasLayerFind !== undefined && canvasLayerFind.visibility === true) {
      dragControlType.current = 2
    }

    if (dragControlType.current === 0 && (status === 'afterStart' || status === 'afterMove' || status === 'afterEnd')) {
      const offsetX = (x - ImitationPageCanvas.state.store.rect.width / 2 - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.view.scaleX / canvasLayerFind.scaleX * ImitationPageCanvas.state.store.view.dpr
      const offsetY = (y - ImitationPageCanvas.state.store.rect.height / 2 - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.view.scaleY / canvasLayerFind.scaleY * ImitationPageCanvas.state.store.view.dpr
      const translateX = ImitationPageCanvas.state.store.view.translateX + canvasLayerFind.translateX
      const translateY = ImitationPageCanvas.state.store.view.translateY + canvasLayerFind.translateY
      const relativeX = offsetX - translateX
      const relativeY = offsetY - translateY

      paintOptionActionRunFind(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, paintSettingFind.setting, canvasLayerFind, canvasLayerFind.action, status, relativeX, relativeY)

      if (status === 'afterStart') canvasLayerFind.previousActionContextShouldUpdate = true

      canvasLayerFind.lastActionContextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRAF()
      ImitationPageCanvas.state.function.updateDebounce500()
    }

    if (dragControlType.current === 1 && status === 'afterMove') {
      const offsetX = changedX / ImitationPageCanvas.state.store.view.scaleX * ImitationPageCanvas.state.store.view.dpr
      const offsetY = changedY / ImitationPageCanvas.state.store.view.scaleY * ImitationPageCanvas.state.store.view.dpr

      ImitationPageCanvas.state.store.view.translateX = ImitationPageCanvas.state.store.view.translateX + offsetX
      ImitationPageCanvas.state.store.view.translateY = ImitationPageCanvas.state.store.view.translateY + offsetY

      ImitationPageCanvas.state.store.canvas.layer.forEach(i => i.contextShouldUpdate = true)

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRAF()
      ImitationPageCanvas.state.function.updateDebounce500()
    }

    if (dragControlType.current === 2 && status === 'afterMove') {
      const offsetX = changedX / ImitationPageCanvas.state.store.view.scaleX * ImitationPageCanvas.state.store.view.dpr
      const offsetY = changedY / ImitationPageCanvas.state.store.view.scaleY * ImitationPageCanvas.state.store.view.dpr

      canvasLayerFind.translateX = canvasLayerFind.translateX + offsetX
      canvasLayerFind.translateY = canvasLayerFind.translateY + offsetY

      canvasLayerFind.contextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRAF()
      ImitationPageCanvas.state.function.updateDebounce500()
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

    if (status === 'afterStart' && inControlPaint === true && canvasLayerFind !== undefined && canvasLayerFind.visibility === true) {
      dragControlType.current = 0
    }
    if (status === 'afterStart' && inTouch2 === true) {
      dragControlType.current = 1
    }
    if (status === 'afterStart' && inTouch3 === true && canvasLayerFind !== undefined && canvasLayerFind.visibility === true) {
      dragControlType.current = 2
    }

    if (dragControlType.current === 0 && (status === 'afterStart' || status === 'afterMove' || status === 'afterEnd')) {
      const offsetX = (x[0] - ImitationPageCanvas.state.store.rect.width / 2 - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.view.scaleX / canvasLayerFind.scaleX * ImitationPageCanvas.state.store.view.dpr
      const offsetY = (y[0] - ImitationPageCanvas.state.store.rect.height / 2 - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.view.scaleY / canvasLayerFind.scaleY * ImitationPageCanvas.state.store.view.dpr
      const translateX = ImitationPageCanvas.state.store.view.translateX + canvasLayerFind.translateX
      const translateY = ImitationPageCanvas.state.store.view.translateY + canvasLayerFind.translateY
      const relativeX = offsetX - translateX
      const relativeY = offsetY - translateY

      paintOptionActionRunFind(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, paintSettingFind.setting, canvasLayerFind, canvasLayerFind.action, status, relativeX, relativeY)

      if (status === 'afterStart') canvasLayerFind.previousActionContextShouldUpdate = true

      canvasLayerFind.lastActionContextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRAF()
      ImitationPageCanvas.state.function.updateDebounce500()
    }

    if (dragControlType.current === 1 && status === 'afterMove' && inTouch2 === true) {
      const offsetX = (changedX[0] + changedX[1]) / 2 / ImitationPageCanvas.state.store.view.scaleX * ImitationPageCanvas.state.store.view.dpr
      const offsetY = (changedY[0] + changedY[1]) / 2 / ImitationPageCanvas.state.store.view.scaleY * ImitationPageCanvas.state.store.view.dpr

      console.log(offsetX, offsetY)

      ImitationPageCanvas.state.store.view.translateX = ImitationPageCanvas.state.store.view.translateX + offsetX
      ImitationPageCanvas.state.store.view.translateY = ImitationPageCanvas.state.store.view.translateY + offsetY

      ImitationPageCanvas.state.store.canvas.layer.forEach(i => i.contextShouldUpdate = true)

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRAF()
      ImitationPageCanvas.state.function.updateDebounce500()
    }

    if (dragControlType.current === 2 && status === 'afterMove' && inTouch3 === true) {
      const offsetX = (changedX[0] + changedX[1] + changedX[2]) / 3 / ImitationPageCanvas.state.store.view.scaleX * ImitationPageCanvas.state.store.view.dpr
      const offsetY = (changedY[0] + changedY[1] + changedY[2]) / 3 / ImitationPageCanvas.state.store.view.scaleY * ImitationPageCanvas.state.store.view.dpr

      canvasLayerFind.translateX = canvasLayerFind.translateX + offsetX
      canvasLayerFind.translateY = canvasLayerFind.translateY + offsetY

      canvasLayerFind.contextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRAF()
      ImitationPageCanvas.state.function.updateDebounce500()
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

      ImitationPageCanvas.state.store.canvas.layer.forEach(i => i.contextShouldUpdate = true)

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRAF()
      ImitationPageCanvas.state.function.updateDebounce500()
    }

    if (e.nativeEvent.wheelDelta !== 240 && e.nativeEvent.wheelDelta !== -240) {
      const offsetX = e.deltaX / ImitationPageCanvas.state.store.view.scaleX * ImitationPageCanvas.state.store.view.dpr * 2 * -1
      const offsetY = e.deltaY / ImitationPageCanvas.state.store.view.scaleY * ImitationPageCanvas.state.store.view.dpr * 2 * -1

      ImitationPageCanvas.state.store.view.translateX = ImitationPageCanvas.state.store.view.translateX + offsetX
      ImitationPageCanvas.state.store.view.translateY = ImitationPageCanvas.state.store.view.translateY + offsetY

      ImitationPageCanvas.state.store.canvas.layer.forEach(i => i.contextShouldUpdate = true)

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRAF()
      ImitationPageCanvas.state.function.updateDebounce500()
    }
  }

  const styleInDrag = { position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', width: '100%', height: '100%', transitionProperty: 'width, height', transitionDuration: '1s' }

  return <div style={styleInDrag} onMouseDown={onMouseDown} onTouchStart={onTouchStart} onWheel={onWheel} children={<ContentRender />} />
}

export default App