import React from 'react'

import Paper from '@mui/material/Paper'

import { useDragControl } from './View.Component.DragControl'
import { useKeyboardRecord } from './View.Component.KeyboardRecord'

import { ImitationPageCanvas } from './Imitation'

import RequestIdleCallbackPipe from './RequestIdleCallbackPipe'

import { PaperSX } from './utils.mui.sx'
import { throttle, fixed, canvasDrawImageCenter } from './utils.common'

function ContentCanvasRender() {
  const canvasFind = ImitationPageCanvas.state.memo.canvasFind(ImitationPageCanvas.state.store.canvas.control)
  const paintOriginFindTypeMap = ImitationPageCanvas.state.memo.paintOriginFindTypeMap()

  const refFunction = el => ImitationPageCanvas.state.store.canvas.canvasRef = el

  const actionPositionAssign = (action) => ({
    ...action,
    offset: {
      x: action.offset.x + ImitationPageCanvas.state.store.canvas.canvasRef.width / 2,
      y: action.offset.y + ImitationPageCanvas.state.store.canvas.canvasRef.height / 2,
    }
  })

  const renderAction = (context, actions) => actions.forEach(i => paintOriginFindTypeMap[i.type](context, actionPositionAssign(i)))

  React.useEffect(() => {
    ImitationPageCanvas.state.store.canvas.contextRef = ImitationPageCanvas.state.store.canvas.canvasRef.getContext('2d')
  }, [])

  React.useEffect(() => {
    ImitationPageCanvas.state.store.canvas.information.forEach(i => {
      if (i.offscreenCanvasRef === undefined) {
        i.offscreenCanvasRef = new OffscreenCanvas(ImitationPageCanvas.state.store.canvas.canvasRef.width, ImitationPageCanvas.state.store.canvas.canvasRef.height)
        i.offscreenContextRef = i.offscreenCanvasRef.getContext('2d')
      }

      if (i.offscreenCanvasRef.width !== ImitationPageCanvas.state.store.canvas.canvasRef.width || i.offscreenCanvasRef.height !== ImitationPageCanvas.state.store.canvas.canvasRef.height) {
        i.offscreenCanvasRef.width = ImitationPageCanvas.state.store.canvas.canvasRef.width
        i.offscreenCanvasRef.height = ImitationPageCanvas.state.store.canvas.canvasRef.height
        i.offscreenContextRef = i.offscreenCanvasRef.getContext('2d')
      }
    })
  }, [ImitationPageCanvas.state.store.rect, ImitationPageCanvas.state.store.view.scale])

  React.useEffect(() => {
    ImitationPageCanvas.state.store.canvas.information.forEach(i => {
      if (i.offscreenBase64Image === undefined && i.offscreenBase64 !== undefined) {
        new Promise(r => {
          const image = new Image()
          image.src = i.offscreenBase64
          image.onload = () => { i.offscreenBase64Image = image; r(); }
        }).then(() => {
          if (i._hash === ImitationPageCanvas.state.store.canvas.control) {
            canvasDrawImageCenter(i.offscreenCanvasRef, i.offscreenContextRef, i.offscreenBase64Image)
            i.action.forEach(i_ => paintOriginFindTypeMap[i_.type](i.offscreenContextRef, i_))
          }
          if (i._hash !== ImitationPageCanvas.state.store.canvas.control) {
            canvasDrawImageCenter(i.offscreenCanvasRef, i.offscreenContextRef, i.offscreenBase64Image)
          }
          ImitationPageCanvas.state.function.updateCanvasRender()
          ImitationPageCanvas.state.function.update()
        })
      }

      if (i.offscreenBase64Image !== undefined && i.offscreenBase64 !== undefined) {
        if (i._hash === ImitationPageCanvas.state.store.canvas.control) {
          canvasDrawImageCenter(i.offscreenCanvasRef, i.offscreenContextRef, i.offscreenBase64Image)
          i.action.forEach(i_ => paintOriginFindTypeMap[i_.type](i.offscreenContextRef, i_))
        }
        if (i._hash !== ImitationPageCanvas.state.store.canvas.control) {
          canvasDrawImageCenter(i.offscreenCanvasRef, i.offscreenContextRef, i.offscreenBase64Image)
        }
        ImitationPageCanvas.state.function.updateCanvasRender()
        ImitationPageCanvas.state.function.update()
      }

      if (i.offscreenBase64 === undefined) {
        i.offscreenContextRef.clearRect(0, 0, ImitationPageCanvas.state.store.canvas.canvasRef.width, ImitationPageCanvas.state.store.canvas.canvasRef.height)
        renderAction(i.offscreenContextRef, i.action)
        ImitationPageCanvas.state.function.updateCanvasRender()
        ImitationPageCanvas.state.function.update()
      }
    })
  }, [ImitationPageCanvas.state.update.canvasAction, ImitationPageCanvas.state.store.rect, ImitationPageCanvas.state.store.view.scale])

  React.useEffect(() => {
    ImitationPageCanvas.state.store.canvas.contextRef.clearRect(0, 0, ImitationPageCanvas.state.store.canvas.canvasRef.width, ImitationPageCanvas.state.store.canvas.canvasRef.height)
    ImitationPageCanvas.state.store.canvas.information.forEach(i => {
      canvasDrawImageCenter(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, i.offscreenCanvasRef)
    })
  }, [ImitationPageCanvas.state.update.canvasRender])

  return <canvas style={{ position: 'absolute', width: ImitationPageCanvas.state.store.rect.width, height: ImitationPageCanvas.state.store.rect.height }} width={ImitationPageCanvas.state.store.rect.width / ImitationPageCanvas.state.store.view.scale} height={ImitationPageCanvas.state.store.rect.height / ImitationPageCanvas.state.store.view.scale} ref={refFunction} />
}

function ContentCanvasWrapper() {
  const paintOriginFindTypeMap = ImitationPageCanvas.state.memo.paintOriginFindTypeMap()
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

    if (status === 'afterStart' && dragControlType.current === 0 && canvasFind !== undefined) {
      const x = params.x
      const y = params.y
      const offsetX = ImitationPageCanvas.state.store.rect.width / 2 / ImitationPageCanvas.state.store.view.scale
      const offsetY = ImitationPageCanvas.state.store.rect.height / 2 / ImitationPageCanvas.state.store.view.scale
      const relativeX = (x - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.view.scale
      const relativeY = (y - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.view.scale

      paintActionFindRun(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, canvasFind.action, 0, relativeX - offsetX, relativeY - offsetY)
      
      ImitationPageCanvas.state.function.updateCanvasAction()
      ImitationPageCanvas.state.function.update()
    }

    if (status === 'afterMove' && dragControlType.current === 0 && canvasFind !== undefined) {
      const x = params.x
      const y = params.y
      const offsetX = ImitationPageCanvas.state.store.rect.width / 2 / ImitationPageCanvas.state.store.view.scale
      const offsetY = ImitationPageCanvas.state.store.rect.height / 2 / ImitationPageCanvas.state.store.view.scale
      const relativeX = (x - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.view.scale
      const relativeY = (y - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.view.scale

      paintActionFindRun(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, canvasFind.action, 1, relativeX - offsetX, relativeY - offsetY)
      
      ImitationPageCanvas.state.function.updateCanvasAction()
      ImitationPageCanvas.state.function.update()
    }

    if (status === 'afterEnd' && dragControlType.current === 0 && canvasFind !== undefined) {
      paintActionFindRun(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, ImitationPageCanvas.state.store.paint.setting, canvasFind.action, 2)
      
      ImitationPageCanvas.state.function.updateCanvasAction()
      ImitationPageCanvas.state.function.update()
    }

    if (status === 'afterMove' && dragControlType.current === 1 && canvasFind !== undefined) {
      const changedX = params.changedX / ImitationPageCanvas.state.store.view.scale
      const changedY = params.changedY / ImitationPageCanvas.state.store.view.scale

      canvasFind.action.forEach(i => {
        i.offset.x = i.offset.x + fixed(changedX)
        i.offset.y = i.offset.y + fixed(changedY)
      })

      ImitationPageCanvas.state.function.updateCanvasAction()
      ImitationPageCanvas.state.function.update()
    }

    if (status === 'afterMove' && dragControlType.current === 2) {
      const changedX = params.changedX / ImitationPageCanvas.state.store.view.scale
      const changedY = params.changedY / ImitationPageCanvas.state.store.view.scale

      ImitationPageCanvas.state.store.canvas.information.forEach(i => {
        i.action.forEach(i => {
          i.offset.x = i.offset.x + fixed(changedX)
          i.offset.y = i.offset.y + fixed(changedY)
        })
      })

      ImitationPageCanvas.state.function.updateCanvasAction()
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