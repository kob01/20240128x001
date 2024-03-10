import React from 'react'

import Paper from '@mui/material/Paper'

import { useDragControl } from './View.Component.DragControl'
import { useKeyboardRecord } from './View.Component.KeyboardRecord'

import { ImitationPageCanvas } from './Imitation'

import { PaperSX } from './utils.mui.sx'
import { throttle } from './utils.common'

function ContentCanvasRender() {
  const paintOriginFindMap = ImitationPageCanvas.state.memo.paintOriginFindMap()

  const refFunction = el => ImitationPageCanvas.state.store.canvas.canvasRef = el

  React.useEffect(() => {
    ImitationPageCanvas.state.store.canvas.contextRef = ImitationPageCanvas.state.store.canvas.canvasRef.getContext('2d')
  }, [])

  React.useEffect(() => {
    ImitationPageCanvas.state.store.canvas.contextRef.clearRect(0, 0, ImitationPageCanvas.state.store.canvas.canvasRef.width, ImitationPageCanvas.state.store.canvas.canvasRef.height)
    ImitationPageCanvas.state.store.canvas.information.forEach(i => {
      i.pixel.forEach(i => {
        const target = {
          ...i,
          x: i.x + ImitationPageCanvas.state.store.rect.width / 2 / ImitationPageCanvas.state.store.view.scale,
          y: i.y + ImitationPageCanvas.state.store.rect.height / 2 / ImitationPageCanvas.state.store.view.scale,
        }
        paintOriginFindMap[i._hash](ImitationPageCanvas.state.store.canvas.contextRef, target)
      })
    })
  }, [ImitationPageCanvas.state.update.canvas, ImitationPageCanvas.state.store.rect, ImitationPageCanvas.state.store.view.scale])

  return <canvas style={{ position: 'absolute', width: ImitationPageCanvas.state.store.rect.width, height: ImitationPageCanvas.state.store.rect.height }} width={ImitationPageCanvas.state.store.rect.width / ImitationPageCanvas.state.store.view.scale} height={ImitationPageCanvas.state.store.rect.height / ImitationPageCanvas.state.store.view.scale} ref={refFunction} />
}

function ContentCanvasWrapper() {
  const canvasFind = ImitationPageCanvas.state.memo.canvasFind(ImitationPageCanvas.state.store.canvas.control)
  const paintActionFindRun = ImitationPageCanvas.state.memo.paintActionFindRun(ImitationPageCanvas.state.store.paint.control)

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

    if (status === 'afterStart' && dragControlType.current === 0) {
      const x = params.x
      const y = params.y
      const offsetX = ImitationPageCanvas.state.store.rect.width / 2 / ImitationPageCanvas.state.store.view.scale
      const offsetY = ImitationPageCanvas.state.store.rect.height / 2 / ImitationPageCanvas.state.store.view.scale
      const relativeX = (x - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.view.scale
      const relativeY = (y - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.view.scale

      const r = paintActionFindRun(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, 0, relativeX, relativeY, offsetX, offsetY)

      if (r) canvasFind.pixel.push(...r)
    }

    if (status === 'afterMove' && dragControlType.current === 0) {
      const x = params.x
      const y = params.y
      const offsetX = ImitationPageCanvas.state.store.rect.width / 2 / ImitationPageCanvas.state.store.view.scale
      const offsetY = ImitationPageCanvas.state.store.rect.height / 2 / ImitationPageCanvas.state.store.view.scale
      const relativeX = (x - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.view.scale
      const relativeY = (y - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.view.scale

      const r = paintActionFindRun(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, 1, relativeX, relativeY, offsetX, offsetY)

      if (r) canvasFind.pixel.push(...r)
    }

    if (status === 'afterEnd' && dragControlType.current === 0) {
      const r = paintActionFindRun(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, 2)

      if (r) canvasFind.pixel.push(...r)
    }

    if (status === 'afterMove' && dragControlType.current === 1) {
      const changedX = params.changedX / ImitationPageCanvas.state.store.view.scale
      const changedY = params.changedY / ImitationPageCanvas.state.store.view.scale

      canvasFind.pixel.forEach(i => {
        i.x = i.x + changedX
        i.y = i.y + changedY
      })

      ImitationPageCanvas.state.update.canvas = performance.now()
      ImitationPageCanvas.state.function.update()
    }

    if (status === 'afterMove' && dragControlType.current === 2) {
      const changedX = params.changedX / ImitationPageCanvas.state.store.view.scale
      const changedY = params.changedY / ImitationPageCanvas.state.store.view.scale

      ImitationPageCanvas.state.store.canvas.information.forEach(i => {
        i.pixel.forEach(i => {
          i.x = i.x + changedX
          i.y = i.y + changedY
        })
      })

      ImitationPageCanvas.state.update.canvas = performance.now()
      ImitationPageCanvas.state.function.update()
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

function Content() {
  const ref = React.useRef()

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(
      throttle(
        en => {
          ImitationPageCanvas.state.store.rect = en[0].target.getBoundingClientRect()
          ImitationPageCanvas.state.function.update()
        },
        500
      )
    )

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [])

  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ref={el => ref.current = el}>
    {
      ImitationPageCanvas.state.store.rect !== undefined ? <ContentCanvasWrapper /> : null
    }
  </div>
}

function App() {
  return <Paper {...PaperSX()} style={{ width: '100%', height: '100%' }}>
    <Content />
  </Paper>
}

export default App