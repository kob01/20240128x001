import React from 'react'

import { useDragControl } from './View.Component.DragControl'
import { useKeyboardRecord } from './View.Component.KeyboardRecord'

import ContentCanvasRender from './View.Page.Canvas.ContentCanvasRender'

import { ImitationPageCanvas } from './Imitation'

function App() {
  const canvasFind = ImitationPageCanvas.state.memo.canvasFind(ImitationPageCanvas.state.store.canvas.control)
  const paintActionRunFind = ImitationPageCanvas.state.memo.paintActionRunFind(ImitationPageCanvas.state.store.paint.control)

  const dragControlType = React.useRef()
  const dragControlProp = React.useRef()

  const { code } = useKeyboardRecord({ enable: true })

  const inSpace = code.includes('Space')

  const onChangeDragControl = (params) => {
    const status = params.status

    if (status === 'afterStart' && dragControlType.current === undefined && (inSpace === false)) {
      dragControlType.current = 0
    }
    if (status === 'afterStart' && dragControlType.current === undefined && (inSpace === false)) {
      dragControlType.current = 1
    }
    if (status === 'afterStart' && dragControlType.current === undefined && (inSpace === true)) {
      dragControlType.current = 2
    }

    if (status === 'afterStart' && dragControlType.current === 0 && canvasFind !== undefined) {
      const x = params.x
      const y = params.y
      const offsetX = ImitationPageCanvas.state.store.rect.width / 2 / ImitationPageCanvas.state.store.view.scale
      const offsetY = ImitationPageCanvas.state.store.rect.height / 2 / ImitationPageCanvas.state.store.view.scale
      const relativeX = (x - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.view.scale
      const relativeY = (y - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.view.scale

      canvasFind.visibility = true

      paintActionRunFind(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, canvasFind.action, 0, relativeX - offsetX, relativeY - offsetY)

      canvasFind.previousActionContextShouldUpdate = true
      canvasFind.previousContextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasPaintAction()
      ImitationPageCanvas.state.function.update()
    }

    if (status === 'afterMove' && dragControlType.current === 0 && canvasFind !== undefined) {
      const x = params.x
      const y = params.y
      const offsetX = ImitationPageCanvas.state.store.rect.width / 2 / ImitationPageCanvas.state.store.view.scale
      const offsetY = ImitationPageCanvas.state.store.rect.height / 2 / ImitationPageCanvas.state.store.view.scale
      const relativeX = (x - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.view.scale
      const relativeY = (y - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.view.scale

      paintActionRunFind(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, canvasFind.action, 1, relativeX - offsetX, relativeY - offsetY)

      canvasFind.previousContextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasPaintAction()
    }

    if (status === 'afterEnd' && dragControlType.current === 0 && canvasFind !== undefined) {
      paintActionRunFind(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, canvasFind.action, 2)

      canvasFind.contextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasPaintAction()
      ImitationPageCanvas.state.function.update()
    }

    if (status === 'afterMove' && dragControlType.current === 1 && canvasFind !== undefined) {
      const changedX = params.changedX / ImitationPageCanvas.state.store.view.scale
      const changedY = params.changedY / ImitationPageCanvas.state.store.view.scale

      canvasFind.action.forEach(i => {
        i.offset.x = i.offset.x + changedX
        i.offset.y = i.offset.y + changedY
      })

      canvasFind.contextShouldUpdate = true

      ImitationPageCanvas.state.function.updateCanvasPaintAction()
    }

    if (status === 'afterMove' && dragControlType.current === 2) {
      const changedX = params.changedX / ImitationPageCanvas.state.store.view.scale
      const changedY = params.changedY / ImitationPageCanvas.state.store.view.scale

      ImitationPageCanvas.state.store.canvas.information.forEach(i => {
        i.action.forEach(i => {
          i.offset.x = i.offset.x + changedX
          i.offset.y = i.offset.y + changedY
        })
        i.contextShouldUpdate = true
      })

      ImitationPageCanvas.state.function.updateCanvasPaintAction()
    }

    if (status === 'afterEnd') {
      dragControlType.current = undefined
      dragControlProp.current = undefined
    }
  }

  const { onMouseDown, onTouchStart } = useDragControl({ enable: true, onChange: onChangeDragControl })

  const styleInDrag = { position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', width: '100%', height: '100%', transitionProperty: 'width, height', transitionDuration: '1s' }

  return <div style={styleInDrag} onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
    <ContentCanvasRender />
  </div>
}

export default App