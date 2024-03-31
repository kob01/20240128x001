import React from 'react'

import { useDragControl } from './View.Component.DragControl'
import { useKeyboardRecord } from './View.Component.KeyboardRecord'

import ContentCanvasRender from './View.Page.Canvas.ContentCanvasRender'

import { ImitationPageCanvas } from './Imitation'

import { range, debounce, throttleLastRIC } from './utils.common'

function App() {
  const canvasFind = ImitationPageCanvas.state.memo.canvasFind(ImitationPageCanvas.state.store.canvas.control)
  const paintActionRunFind = ImitationPageCanvas.state.memo.paintActionRunFind(ImitationPageCanvas.state.store.paint.control)
  const paintOffsetFindMap = ImitationPageCanvas.state.memo.paintOffsetFindMap('_hash')

  const inControlPaint = ImitationPageCanvas.state.store.control.paint
  const inControlMove = ImitationPageCanvas.state.store.control.move

  const dragControlType = React.useRef()
  const dragControlProp = React.useRef()

  const { code } = useKeyboardRecord({ enable: true })

  const inSpace = code.includes('Space')
  const inMeta = code.includes('MetaLeft') || code.includes('MetaRight')

  const onChangeDragControl = (params) => {
    if (ImitationPageCanvas.state.store.recting === true) return

    const status = params.status

    const inTouch2 = Boolean(params.xs && params.xs.length === 2 && params.ys && params.ys.length === 2)
    const inTouch3 = Boolean(params.xs && params.xs.length === 3 && params.ys && params.ys.length === 3)

    if (status === 'afterStart' && (inControlPaint === true && inSpace === false && inMeta === false && inTouch2 === false) && canvasFind.visibility === true) {
      dragControlType.current = 0
    }
    if (status === 'afterStart' && (inControlPaint === false && inSpace === true && inMeta === false && inTouch2 === false) && canvasFind.visibility === true) {
      dragControlType.current = 0
    }
    if (status === 'afterStart' && (inControlMove === true && inSpace === false && inMeta === false && inTouch2 === false)) {
      dragControlType.current = 1
    }
    if (status === 'afterStart' && (inControlMove === false && inSpace === true && inMeta === false && inTouch2 === false)) {
      dragControlType.current = 1
    }
    if (status === 'afterStart' && (inMeta === true)) {
      dragControlType.current = 2
    }
    if (status === 'afterStart' && (inTouch2 === true)) {
      dragControlType.current = 3
    }
    if (status === 'afterStart' && (inTouch3 === true) && canvasFind.visibility === true) {
      dragControlType.current = 4
    }

    if (status === 'afterStart' && dragControlType.current === 0 && canvasFind !== undefined) {
      const x = params.x
      const y = params.y
      const offsetX = (x - ImitationPageCanvas.state.store.rect.width / 2 - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.view.scale * ImitationPageCanvas.state.store.dpr
      const offsetY = (y - ImitationPageCanvas.state.store.rect.height / 2 - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.view.scale * ImitationPageCanvas.state.store.dpr
      const translateX = ImitationPageCanvas.state.store.view.translateX
      const translateY = ImitationPageCanvas.state.store.view.translateY
      const relativeX = offsetX - translateX
      const relativeY = offsetY - translateY

      paintActionRunFind(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, canvasFind.action, 0, relativeX, relativeY)

      canvasFind.previousActionContextShouldUpdate = true
      canvasFind.previousContextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }

    if (status === 'afterMove' && dragControlType.current === 0 && canvasFind !== undefined) {
      const x = params.x
      const y = params.y
      const offsetX = (x - ImitationPageCanvas.state.store.rect.width / 2 - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.view.scale * ImitationPageCanvas.state.store.dpr
      const offsetY = (y - ImitationPageCanvas.state.store.rect.height / 2 - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.view.scale * ImitationPageCanvas.state.store.dpr
      const translateX = ImitationPageCanvas.state.store.view.translateX
      const translateY = ImitationPageCanvas.state.store.view.translateY
      const relativeX = offsetX - translateX
      const relativeY = offsetY - translateY

      paintActionRunFind(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, canvasFind.action, 1, relativeX, relativeY)

      canvasFind.previousContextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }

    if (status === 'afterEnd' && dragControlType.current === 0 && canvasFind !== undefined) {
      paintActionRunFind(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, canvasFind.action, 2)

      canvasFind.previousContextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }

    if (status === 'afterMove' && dragControlType.current === 1) {
      const changedX = params.changedX
      const changedY = params.changedY
      const offsetX = changedX / ImitationPageCanvas.state.store.view.scale * ImitationPageCanvas.state.store.dpr
      const offsetY = changedY / ImitationPageCanvas.state.store.view.scale * ImitationPageCanvas.state.store.dpr

      ImitationPageCanvas.state.store.view.translateX = ImitationPageCanvas.state.store.view.translateX + offsetX
      ImitationPageCanvas.state.store.view.translateY = ImitationPageCanvas.state.store.view.translateY + offsetY

      ImitationPageCanvas.state.store.canvas.information.forEach(i => i.contextShouldUpdate = true)

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }

    if (status === 'afterMove' && dragControlType.current === 2) {
      const changedX = params.changedX
      const changedY = params.changedY
      const offsetX = changedX / ImitationPageCanvas.state.store.view.scale * ImitationPageCanvas.state.store.dpr
      const offsetY = changedY / ImitationPageCanvas.state.store.view.scale * ImitationPageCanvas.state.store.dpr

      canvasFind.action.forEach(i => {
        paintOffsetFindMap[i.hashPaint](canvasFind.offscreenCanvasRef, canvasFind.offscreenContextRef, i, { offsetX: offsetX, offsetY: offsetY })
      })

      canvasFind.contextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }

    if (status === 'afterMove' && dragControlType.current === 3 && inTouch2 === true) {
      const xs = params.xs
      const ys = params.ys
      const changedXs = params.changedXs
      const changedYs = params.changedYs

      const originDistance = Math.pow(Math.pow(xs[0] - changedXs[0], 2) + Math.pow(ys[1] - changedYs[1], 2), 0.5)
      const targetDistance = Math.pow(Math.pow(xs[0], 2) + Math.pow(ys[1], 2), 0.5)

      const distance = (targetDistance - originDistance)

      if (distance === 0) return

      var scale = range(Number(Number(ImitationPageCanvas.state.store.view.scale + ImitationPageCanvas.state.store.view.scale * 0.01 * distance).toFixed(2)), 0.02, 24)

      if (distance < 0 && scale === ImitationPageCanvas.state.store.view.scale) var scale = range(ImitationPageCanvas.state.store.view.scale + 0.01, 0.02, 24)
      if (distance > 0 && scale === ImitationPageCanvas.state.store.view.scale) var scale = range(ImitationPageCanvas.state.store.view.scale - 0.01, 0.02, 24)

      ImitationPageCanvas.state.store.view.scale = scale

      ImitationPageCanvas.state.store.canvas.information.forEach(i => i.contextShouldUpdate = true)

      ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
      ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
    }

    if (status === 'afterEnd') {
      dragControlType.current = undefined
      dragControlProp.current = undefined
    }
  }

  const { onMouseDown, onTouchStart } = useDragControl({ enable: true, onChange: onChangeDragControl })

  const onWheel = (e) => {
    if (ImitationPageCanvas.state.store.recting === true) return

    if (e.deltaY === 0) return

    var scale = range(Number(Number(ImitationPageCanvas.state.store.view.scale - ImitationPageCanvas.state.store.view.scale * 0.01 * e.deltaY).toFixed(2)), 0.02, 24)

    if (e.deltaY < 0 && scale === ImitationPageCanvas.state.store.view.scale) var scale = range(ImitationPageCanvas.state.store.view.scale + 0.01, 0.02, 24)
    if (e.deltaY > 0 && scale === ImitationPageCanvas.state.store.view.scale) var scale = range(ImitationPageCanvas.state.store.view.scale - 0.01, 0.02, 24)

    ImitationPageCanvas.state.store.view.scale = scale

    ImitationPageCanvas.state.store.canvas.information.forEach(i => i.contextShouldUpdate = true)

    ImitationPageCanvas.state.function.updateCanvasOffscreenRenderThrottleLastRIC()
    ImitationPageCanvas.state.function.updateCanvasResizeDebounce500()
  }

  const styleInDrag = { position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', width: '100%', height: '100%', transitionProperty: 'width, height', transitionDuration: '1s' }

  return <div style={styleInDrag} onMouseDown={onMouseDown} onTouchStart={onTouchStart} onWheel={onWheel}>
    <ContentCanvasRender />
  </div>
}

export default App