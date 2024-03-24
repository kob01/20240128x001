import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import { ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { canvasDrawImageCenter } from './utils.common'

function App() {
  const paintRenderFindTypeMap = ImitationPageCanvas.state.memo.paintRenderFindMap('_hash')

  const loadRef = React.useRef(false)

  const [styleW, setStyleW] = React.useState()
  const [styleH, setStyleH] = React.useState()
  const [realW, setRealW] = React.useState()
  const [realH, setRealH] = React.useState()

  const refFunction = el => ImitationPageCanvas.state.store.canvas.canvasRef = el

  const actionAssign = (action) => Object({ ...action, offset: { x: action.offset.x + realW / 2, y: action.offset.y + realH / 2, visibility: true } })

  const actionRender = (context, action) => action.filter(i => i.visibility === true).forEach(i => paintRenderFindTypeMap[i.hashPaint](context, actionAssign(i)))

  const canvasInformationInit = () => {
    ImitationPageCanvas.state.store.canvas.information.forEach(i => {
      if (i.offscreenCanvasRef === undefined) {
        i.offscreenCanvasRef = new OffscreenCanvas(realW, realH)
        i.offscreenContextRef = i.offscreenCanvasRef.getContext(i.offscreenContextType)
        i.contextShouldUpdate = true
      }

      if (i.offscreenCanvasRef.width !== realW || i.offscreenCanvasRef.height !== realH) {
        i.offscreenCanvasRef.width = realW
        i.offscreenCanvasRef.height = realH
        i.offscreenContextRef = i.offscreenCanvasRef.getContext(i.offscreenContextType)
        i.contextShouldUpdate = true
      }

      if (i.offscreenPreviousActionCanvasRef === undefined) {
        i.offscreenPreviousActionCanvasRef = new OffscreenCanvas(realW, realH)
        i.offscreenPreviousActionContextRef = i.offscreenPreviousActionCanvasRef.getContext(i.offscreenContextType)
        i.contextShouldUpdate = true
      }

      if (i.offscreenPreviousActionCanvasRef.width !== styleW || i.offscreenPreviousActionCanvasRef.height !== realH) {
        i.offscreenPreviousActionCanvasRef.width = styleW
        i.offscreenPreviousActionCanvasRef.height = realH
        i.offscreenPreviousActionContextRef = i.offscreenPreviousActionCanvasRef.getContext(i.offscreenContextType)
        i.contextShouldUpdate = true
      }
    })

    canvasInformationRenderOffscreen()
  }

  const canvasInformationRenderOffscreen = () => {
    ImitationPageCanvas.state.store.canvas.information.forEach(i => {
      if (i.visibility === false) {
        i.offscreenContextRef.clearRect(0, 0, i.offscreenCanvasRef.width, i.offscreenCanvasRef.height)
      }

      if (i.visibility === true && i.previousActionContextShouldUpdate === true) {
        i.offscreenPreviousActionContextRef.clearRect(0, 0, i.offscreenPreviousActionCanvasRef.width, i.offscreenPreviousActionCanvasRef.height)
        actionRender(i.offscreenPreviousActionContextRef, i.action.slice(0, i.action.length - 1))
      }

      if (i.visibility === true && i.previousContextShouldUpdate === true) {
        i.offscreenContextRef.clearRect(0, 0, ImitationPageCanvas.state.store.canvas.canvasRef.width, ImitationPageCanvas.state.store.canvas.canvasRef.height)
        canvasDrawImageCenter(i.offscreenCanvasRef, i.offscreenContextRef, i.offscreenPreviousActionCanvasRef)
        actionRender(i.offscreenContextRef, i.action.slice(i.action.length - 1, i.action.length))
      }

      if (i.visibility === true && i.contextShouldUpdate === true) {
        i.offscreenContextRef.clearRect(0, 0, ImitationPageCanvas.state.store.canvas.canvasRef.width, ImitationPageCanvas.state.store.canvas.canvasRef.height)
        actionRender(i.offscreenContextRef, i.action)
      }

      i.previousActionContextShouldUpdate = false
      i.previousContextShouldUpdate = false
      i.contextShouldUpdate = false
    })

    canvasInformationRenderOnlineScreen()
  }

  const canvasInformationRenderOnlineScreen = () => {
    ImitationPageCanvas.state.store.canvas.contextRef.clearRect(0, 0, ImitationPageCanvas.state.store.canvas.canvasRef.width, ImitationPageCanvas.state.store.canvas.canvasRef.height)

    ImitationPageCanvas.state.store.canvas.information.forEach(i => {
      canvasDrawImageCenter(ImitationPageCanvas.state.store.canvas.canvasRef, ImitationPageCanvas.state.store.canvas.contextRef, i.offscreenCanvasRef)
    })
  }

  React.useEffect(() => {
    ImitationPageCanvas.state.store.canvas.contextRef = ImitationPageCanvas.state.store.canvas.canvasRef.getContext('2d')
  }, [])

  React.useEffect(() => {
    if (ImitationPageCanvas.state.store.recting === true || ImitationPageCanvas.state.store.rect.width === 0 || ImitationPageCanvas.state.store.rect.height === 0) return

    setStyleW(ImitationPageCanvas.state.store.rect.width)
    setStyleH(ImitationPageCanvas.state.store.rect.height)
    setRealW(ImitationPageCanvas.state.store.rect.width / ImitationPageCanvas.state.store.view.scale)
    setRealH(ImitationPageCanvas.state.store.rect.height / ImitationPageCanvas.state.store.view.scale)
  }, [ImitationPageCanvas.state.store.recting, ImitationPageCanvas.state.store.rect, ImitationPageCanvas.state.store.view.scale])

  React.useEffect(() => {
    if (realW !== undefined && realW !== 0 && realH !== undefined && realH !== 0) canvasInformationInit()
  }, [realW, realH])

  React.useEffect(() => {
    if (loadRef.current === true) canvasInformationRenderOffscreen()
  }, [ImitationPageCanvas.state.update.canvasPaintAction])

  React.useEffect(() => loadRef.current = true, [])

  return <>
    <canvas style={{ position: 'absolute', width: styleW, height: styleH, opacity: ImitationPageCanvas.state.store.recting === false ? 1 : 0, transition: '1s all' }} width={realW} height={realH} ref={refFunction} />
    <CircularProgress color='primary' style={{ position: 'absolute', opacity: ImitationPageCanvas.state.store.recting === true ? 1 : 0, transition: '1s all' }} />
  </>
}

const dependence = [{ instance: ImitationPageCanvas, dependence: state => [state.update.canvasPaintAction] }]

export default withBindComponentPure(App, dependence)