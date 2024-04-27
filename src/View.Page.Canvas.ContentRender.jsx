import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import { ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { caculatePositionCenter } from './utils.common'

function App() {
  const pencilRenderFindMap = ImitationPageCanvas.state.memo.pencilRenderFindMap('_hash')

  const loadRef = React.useRef(false)

  const [opacity, setOpacity] = React.useState(0)
  const [styleW, setStyleW] = React.useState()
  const [styleH, setStyleH] = React.useState()
  const [realW, setRealW] = React.useState()
  const [realH, setRealH] = React.useState()

  const refFunction = el => ImitationPageCanvas.state.store.ref.canvas = el

  const graphRender = (layer, canvas, context, graph) => {
    context.save()

    context.translate(canvas.width / 2, canvas.height / 2)

    context.scale(ImitationPageCanvas.state.store.view.scaleX, ImitationPageCanvas.state.store.view.scaleY)
    context.translate(ImitationPageCanvas.state.store.view.translateX, ImitationPageCanvas.state.store.view.translateY)

    context.scale(layer.scale, layer.scale)
    context.translate(layer.translateX, layer.translateY)

    graph
      .filter(i => i.visibility === true && pencilRenderFindMap[i.pencilHash])
      .forEach(i => pencilRenderFindMap[i.pencilHash](canvas, context, layer, i))

    context.restore()
  }

  const canvasOffscreenInit = () => {
    ImitationPageCanvas.state.store.ref.layer.forEach(i => {
      if (i.offscreenCanvas === undefined) {
        i.offscreenCanvas = new OffscreenCanvas(realW, realH)
        i.offscreenContext = i.offscreenCanvas.getContext('2d')
        i.offscreenUpdate = true
      }

      if (i.offscreenCanvas.width !== realW || i.offscreenCanvas.height !== realH) {
        i.offscreenCanvas.width = realW
        i.offscreenCanvas.height = realH
        i.offscreenContext = i.offscreenCanvas.getContext('2d')
        i.offscreenUpdate = true
      }

      if (i.offscreenExceptLastGraphCanvas === undefined) {
        i.offscreenExceptLastGraphCanvas = new OffscreenCanvas(realW, realH)
        i.offscreenExceptLastGraphContext = i.offscreenExceptLastGraphCanvas.getContext('2d')
        i.offscreenUpdate = true
      }

      if (i.offscreenExceptLastGraphCanvas.width !== realW || i.offscreenExceptLastGraphCanvas.height !== realH) {
        i.offscreenExceptLastGraphCanvas.width = realW
        i.offscreenExceptLastGraphCanvas.height = realH
        i.offscreenExceptLastGraphContext = i.offscreenExceptLastGraphCanvas.getContext('2d')
        i.offscreenUpdate = true
      }
    })

    canvasOffscreenRender()
  }

  const canvasOffscreenRender = () => {
    ImitationPageCanvas.state.store.source.canvas.layer.forEach(i => {
      const canvasLayerRefFind = ImitationPageCanvas.state.store.ref.layer.find(i_ => i_.layerHash === i._hash)

      if (i.visibility === true && canvasLayerRefFind.offscreenExceptLastGraphUpdate === true) {
        canvasLayerRefFind.offscreenExceptLastGraphContext.clearRect(0, 0, canvasLayerRefFind.offscreenExceptLastGraphCanvas.width, canvasLayerRefFind.offscreenExceptLastGraphCanvas.height)
        graphRender(i, canvasLayerRefFind.offscreenExceptLastGraphCanvas, canvasLayerRefFind.offscreenExceptLastGraphContext, i.graph.slice(0, i.graph.length - 1))
      }

      if (i.visibility === true && canvasLayerRefFind.offscreenComposeLastGraphUpdate === true) {
        canvasLayerRefFind.offscreenContext.clearRect(0, 0, canvasLayerRefFind.offscreenCanvas.width, canvasLayerRefFind.offscreenCanvas.height)
        canvasLayerRefFind.offscreenContext.drawImage(canvasLayerRefFind.offscreenExceptLastGraphCanvas, ...caculatePositionCenter(canvasLayerRefFind.offscreenCanvas, canvasLayerRefFind.offscreenExceptLastGraphCanvas, { x: 0, y: 0 }))
        graphRender(i, canvasLayerRefFind.offscreenCanvas, canvasLayerRefFind.offscreenContext, i.graph.slice(i.graph.length - 1, i.graph.length))
      }

      if (i.visibility === true && canvasLayerRefFind.offscreenUpdate === true) {
        canvasLayerRefFind.offscreenContext.clearRect(0, 0, canvasLayerRefFind.offscreenCanvas.width, canvasLayerRefFind.offscreenCanvas.height)
        graphRender(i, canvasLayerRefFind.offscreenCanvas, canvasLayerRefFind.offscreenContext, i.graph)
      }

      canvasLayerRefFind.offscreenExceptLastGraphUpdate = false
      canvasLayerRefFind.offscreenComposeLastGraphUpdate = false
      canvasLayerRefFind.offscreenUpdate = false
    })

    canvasOnlinescreenRender()
  }

  const canvasOnlinescreenRender = () => {
    ImitationPageCanvas.state.store.ref.context.clearRect(0, 0, ImitationPageCanvas.state.store.ref.canvas.width, ImitationPageCanvas.state.store.ref.canvas.height)

    ImitationPageCanvas.state.store.source.canvas.layer.forEach(i => {
      const canvasLayerRefFind = ImitationPageCanvas.state.store.ref.layer.find(i_ => i_.layerHash === i._hash)

      if (i.visibility === true) {
        const position = caculatePositionCenter(ImitationPageCanvas.state.store.ref.canvas, canvasLayerRefFind.offscreenCanvas, { x: 0, y: 0 })
        if (position !== undefined) ImitationPageCanvas.state.store.ref.context.drawImage(canvasLayerRefFind.offscreenCanvas, ...position)
      }
    })
  }

  React.useEffect(() => {
    ImitationPageCanvas.state.store.ref.context = ImitationPageCanvas.state.store.ref.canvas.getContext('2d')
  }, [])

  React.useEffect(() => {
    if (ImitationPageCanvas.state.store.recting === true || ImitationPageCanvas.state.store.rect === undefined || ImitationPageCanvas.state.store.rect.width === 0 || ImitationPageCanvas.state.store.rect.height === 0) return

    setStyleW(ImitationPageCanvas.state.store.rect.width)
    setStyleH(ImitationPageCanvas.state.store.rect.height)
    setRealW(ImitationPageCanvas.state.store.rect.width * ImitationPageCanvas.state.store.view.dpr)
    setRealH(ImitationPageCanvas.state.store.rect.height * ImitationPageCanvas.state.store.view.dpr)
  }, [ImitationPageCanvas.state.store.recting, ImitationPageCanvas.state.store.rect, ImitationPageCanvas.state.store.view.dpr])

  React.useEffect(() => {
    if (ImitationPageCanvas.state.store.recting === true || ImitationPageCanvas.state.store.rect === undefined) {
      setOpacity(0)
    }
    if (ImitationPageCanvas.state.store.recting === false && ImitationPageCanvas.state.store.rect !== undefined) {
      requestAnimationFrame(() => setOpacity(1))
    }
  }, [ImitationPageCanvas.state.store.recting, ImitationPageCanvas.state.store.rect])

  React.useEffect(() => {
    if (realW !== undefined && realW !== 0 && realH !== undefined && realH !== 0) canvasOffscreenInit()
  }, [styleW, styleH, realW, realH])

  React.useEffect(() => {
    if (loadRef.current === true) canvasOffscreenInit()
  }, [ImitationPageCanvas.state.update.canvasOffscreenInit])

  React.useEffect(() => {
    if (loadRef.current === true) canvasOffscreenRender()
  }, [ImitationPageCanvas.state.update.canvasOffscreenRender])

  React.useEffect(() => {
    if (loadRef.current === true) canvasOnlinescreenRender()
  }, [ImitationPageCanvas.state.update.canvasOnlinescreenRender])

  React.useEffect(() => loadRef.current = true, [])

  return <canvas style={{ position: 'absolute', width: styleW, height: styleH, opacity: opacity, transition: '1s all' }} width={realW} height={realH} ref={refFunction} />
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.canvasOffscreenInit, ImitationPageCanvas.state.update.canvasOffscreenRender, ImitationPageCanvas.state.update.canvasOnlinescreenRender] }
]

export default withBindComponentPure(App, dependence)