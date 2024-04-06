import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import { ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { caculatePositionCenter } from './utils.common'

function App() {
  const paintRenderFindMap = ImitationPageCanvas.state.memo.paintRenderFindMap('_hash')

  const loadRef = React.useRef(false)

  const [styleW, setStyleW] = React.useState()
  const [styleH, setStyleH] = React.useState()
  const [realW, setRealW] = React.useState()
  const [realH, setRealH] = React.useState()
  const [transition, setTransition] = React.useState('1s all')

  const refFunction = el => ImitationPageCanvas.state.store.canvas.canvasRef = el

  const actionRender = (layer, canvas, context, action) => {
    context.save()

    context.translate(canvas.width / 2, canvas.height / 2)

    context.scale(ImitationPageCanvas.state.store.view.scaleX, ImitationPageCanvas.state.store.view.scaleY)
    context.translate(ImitationPageCanvas.state.store.view.translateX , ImitationPageCanvas.state.store.view.translateY)

    context.scale(layer.scale, layer.scale)
    context.translate(layer.translateX , layer.translateY)

    action
      .filter(i => i.visibility === true && paintRenderFindMap[i.hashPaint])
      .forEach(i => paintRenderFindMap[i.hashPaint](canvas, context, layer, i))

    context.restore()
  }

  const canvasResize = () => {
    ImitationPageCanvas.state.store.canvas.information.forEach(i => {
      if (i.offscreenCanvasRef === undefined) {
        i.offscreenCanvasRef = new OffscreenCanvas(realW, realH)
        i.offscreenContextRef = i.offscreenCanvasRef.getContext('2d')

        i.contextShouldUpdate = true
      }

      if (i.offscreenCanvasRef.width !== realW || i.offscreenCanvasRef.height !== realH) {
        i.offscreenCanvasRef.width = realW
        i.offscreenCanvasRef.height = realH
        i.offscreenContextRef = i.offscreenCanvasRef.getContext('2d')

        i.contextShouldUpdate = true
      }

      if (i.offscreenPreviousActionCanvasRef === undefined) {
        i.offscreenPreviousActionCanvasRef = new OffscreenCanvas(realW, realH)
        i.offscreenPreviousActionContextRef = i.offscreenPreviousActionCanvasRef.getContext('2d')

        i.contextShouldUpdate = true
      }

      if (i.offscreenPreviousActionCanvasRef.width !== realW || i.offscreenPreviousActionCanvasRef.height !== realH) {
        i.offscreenPreviousActionCanvasRef.width = realW
        i.offscreenPreviousActionCanvasRef.height = realH
        i.offscreenPreviousActionContextRef = i.offscreenPreviousActionCanvasRef.getContext('2d')

        i.contextShouldUpdate = true
      }
    })

    canvasOffscreenRender()
  }

  const canvasOffscreenRender = () => {
    ImitationPageCanvas.state.store.canvas.information.forEach(i => {
      if (i.visibility === true && i.previousActionContextShouldUpdate === true) {
        i.offscreenPreviousActionContextRef.clearRect(0, 0, i.offscreenPreviousActionCanvasRef.width, i.offscreenPreviousActionCanvasRef.height)
        actionRender(i, i.offscreenPreviousActionCanvasRef, i.offscreenPreviousActionContextRef, i.action.slice(0, i.action.length - 1))
      }

      if (i.visibility === true && i.lastActionContextShouldUpdate === true) {
        i.offscreenContextRef.clearRect(0, 0, i.offscreenCanvasRef.width, i.offscreenCanvasRef.height)
        i.offscreenContextRef.drawImage(i.offscreenPreviousActionCanvasRef, ...caculatePositionCenter(i.offscreenCanvasRef, i.offscreenPreviousActionCanvasRef, { x: 0, y: 0 }))
        actionRender(i, i.offscreenCanvasRef, i.offscreenContextRef, i.action.slice(i.action.length - 1, i.action.length))
      }

      if (i.visibility === true && i.contextShouldUpdate === true) {
        i.offscreenContextRef.clearRect(0, 0, i.offscreenCanvasRef.width, i.offscreenCanvasRef.height)
        actionRender(i, i.offscreenCanvasRef, i.offscreenContextRef, i.action)
      }

      i.previousActionContextShouldUpdate = false
      i.lastActionContextShouldUpdate = false
      i.contextShouldUpdate = false
    })

    canvasOnlinescreenRender()
  }

  const canvasOnlinescreenRender = () => {
    ImitationPageCanvas.state.store.canvas.contextRef.clearRect(0, 0, ImitationPageCanvas.state.store.canvas.canvasRef.width, ImitationPageCanvas.state.store.canvas.canvasRef.height)

    ImitationPageCanvas.state.store.canvas.information.forEach(i => {
      if (i.visibility === true) {
        const position = caculatePositionCenter(ImitationPageCanvas.state.store.canvas.canvasRef, i.offscreenCanvasRef, { x: 0, y: 0 })
        if (position !== undefined) ImitationPageCanvas.state.store.canvas.contextRef.drawImage(i.offscreenCanvasRef, ...position)
      }
    })
  }

  React.useEffect(() => {
    ImitationPageCanvas.state.store.canvas.contextRef = ImitationPageCanvas.state.store.canvas.canvasRef.getContext('2d')
  }, [])

  React.useEffect(() => {
    if (ImitationPageCanvas.state.store.recting === true || ImitationPageCanvas.state.store.rect.width === 0 || ImitationPageCanvas.state.store.rect.height === 0) return

    setStyleW(ImitationPageCanvas.state.store.rect.width)
    setStyleH(ImitationPageCanvas.state.store.rect.height)
    setRealW(ImitationPageCanvas.state.store.rect.width * ImitationPageCanvas.state.store.dpr)
    setRealH(ImitationPageCanvas.state.store.rect.height * ImitationPageCanvas.state.store.dpr)
  }, [ImitationPageCanvas.state.store.recting, ImitationPageCanvas.state.store.rect, ImitationPageCanvas.state.store.dpr])

  React.useEffect(() => {
    if (realW !== undefined && realW !== 0 && realH !== undefined && realH !== 0) canvasResize()
  }, [styleW, styleH, realW, realH])

  React.useEffect(() => {
    if (loadRef.current === true) canvasResize()
  }, [ImitationPageCanvas.state.update.canvasResize])

  React.useEffect(() => {
    if (loadRef.current === true) canvasOffscreenRender()
  }, [ImitationPageCanvas.state.update.canvasOffscreenRender])

  React.useEffect(() => {
    if (loadRef.current === true) canvasOnlinescreenRender()
  }, [ImitationPageCanvas.state.update.canvasOnlinescreenRender])

  React.useEffect(() => loadRef.current = true, [])

  return <>
    <canvas style={{ position: 'absolute', width: styleW, height: styleH, opacity: ImitationPageCanvas.state.store.recting === false ? 1 : 0, transition: transition }} width={realW} height={realH} ref={refFunction} />
    <CircularProgress color='primary' style={{ position: 'absolute', opacity: ImitationPageCanvas.state.store.recting === true ? 1 : 0, transition: '1s all' }} />
  </>
}

const dependence = [{ instance: ImitationPageCanvas, dependence: state => [state.update.canvasOffscreenRender] }]

export default withBindComponentPure(App, dependence)