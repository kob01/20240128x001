import React from 'react'

import Paper from '@mui/material/Paper'

import { useDragControl as useDragControlMouse } from './View.Component.DragControl.Mouse'
import { useDragControl as useDragControlTouch } from './View.Component.DragControl.Touch'
import { useKeyboardRecord } from './View.Component.KeyboardRecord'

import { ImitationPageCanvas, ImitationGlobal, withBindComponentPure } from './Imitation'

import { hash, range, caculatePositionCenter, debounce, throttleLastRAF } from './utils.common'

function App() {
  const canvasLayerFind = ImitationPageCanvas.state.memo.canvasLayerFind(ImitationPageCanvas.state.store.activeLayer)
  const canvasLayerRefFind = ImitationPageCanvas.state.memo.canvasLayerRefFind(ImitationPageCanvas.state.store.activeLayer)
  const pencilFind = ImitationPageCanvas.state.memo.pencilFind(ImitationPageCanvas.state.store.activePencil)
  const pencilActionRunFind = ImitationPageCanvas.state.memo.pencilActionRunFind(ImitationPageCanvas.state.store.activePencil)
  const pencilRenderFindMap = ImitationPageCanvas.state.memo.pencilRenderFindMap('_hash')

  const inControlDraw = ImitationPageCanvas.state.store.controlDraw
  const inControlMove = ImitationPageCanvas.state.store.controlMove

  const updateDebounce500 = React.useCallback(debounce(ImitationPageCanvas.state.function.update, 500), [])
  const updateCanvasOffscreenRenderThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationPageCanvas.state.function.updateCanvasOffscreenRender), [])

  const wrapperRef = React.useRef()

  const loadRef = React.useRef(false)

  const dragControlType = React.useRef()
  const dragControlProp = React.useRef()
  const dragControlTime = React.useRef()

  const [opacity, setOpacity] = React.useState(0)
  const [styleW, setStyleW] = React.useState()
  const [styleH, setStyleH] = React.useState()
  const [realW, setRealW] = React.useState()
  const [realH, setRealH] = React.useState()

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

    if (status === 'afterStart' && inSpace === false && inMeta === false && inControlDraw === true && canvasLayerFind !== undefined && canvasLayerFind.visibility === true && pencilActionRunFind !== undefined) {
      dragControlType.current = 0
      dragControlProp.current = { operation: undefined }
    }
    if (status === 'afterStart' && inSpace === true && inMeta === false && inControlMove === true) {
      dragControlType.current = 1
    }
    if (status === 'afterStart' && inMeta === true && inSpace === false && canvasLayerFind !== undefined && canvasLayerFind.visibility === true) {
      dragControlType.current = 2
    }

    if (dragControlType.current === 0 && (status === 'afterStart' || status === 'afterMove' || status === 'afterEnd')) {
      const offsetX = (x - ImitationPageCanvas.state.store.rect.width / 2 - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.scaleX / canvasLayerFind.scaleX * ImitationPageCanvas.state.store.dpr
      const offsetY = (y - ImitationPageCanvas.state.store.rect.height / 2 - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.scaleY / canvasLayerFind.scaleY * ImitationPageCanvas.state.store.dpr
      const translateX = ImitationPageCanvas.state.store.translateX / canvasLayerFind.scaleX + canvasLayerFind.translateX
      const translateY = ImitationPageCanvas.state.store.translateY / canvasLayerFind.scaleY + canvasLayerFind.translateY
      const relativeX = offsetX - translateX
      const relativeY = offsetY - translateY
      const canvas = ImitationPageCanvas.state.store.refCanvas
      const context = ImitationPageCanvas.state.store.refContext
      const layer = canvasLayerFind
      const operations = canvasLayerFind.operation

      if (status === 'afterStart') {
        dragControlProp.current.operation = { _hash: hash(), pencilHash: pencilFind._hash, visibility: true, setting: structuredClone(pencilFind.setting) }
        canvasLayerFind.operation.push(dragControlProp.current.operation)
      }

      pencilActionRunFind(status, relativeX, relativeY, canvas, context, layer, operations, dragControlProp.current.operation)

      if (status === 'afterStart') canvasLayerRefFind.offscreenExceptLastOperationUpdate = true

      canvasLayerRefFind.offscreenComposeLastOperationUpdate = true

      updateCanvasOffscreenRenderThrottleLastRAF()
      updateDebounce500()
    }

    if (dragControlType.current === 1 && status === 'afterMove') {
      const offsetX = changedX / ImitationPageCanvas.state.store.scaleX * ImitationPageCanvas.state.store.dpr
      const offsetY = changedY / ImitationPageCanvas.state.store.scaleY * ImitationPageCanvas.state.store.dpr

      ImitationPageCanvas.state.store.translateX = ImitationPageCanvas.state.store.translateX + offsetX
      ImitationPageCanvas.state.store.translateY = ImitationPageCanvas.state.store.translateY + offsetY

      ImitationPageCanvas.state.store.refLayer.forEach(i => i.offscreenUpdate = true)

      updateCanvasOffscreenRenderThrottleLastRAF()
      updateDebounce500()
    }

    if (dragControlType.current === 2 && status === 'afterMove') {
      const offsetX = changedX / ImitationPageCanvas.state.store.scaleX / canvasLayerFind.scaleX * ImitationPageCanvas.state.store.dpr
      const offsetY = changedY / ImitationPageCanvas.state.store.scaleY / canvasLayerFind.scaleY * ImitationPageCanvas.state.store.dpr

      canvasLayerFind.translateX = canvasLayerFind.translateX + offsetX
      canvasLayerFind.translateY = canvasLayerFind.translateY + offsetY

      canvasLayerRefFind.offscreenUpdate = true

      updateCanvasOffscreenRenderThrottleLastRAF()
      updateDebounce500()
    }

    if (status === 'afterEnd') {
      clearTimeout(dragControlTime.current)
      dragControlType.current = undefined
      dragControlProp.current = undefined
      dragControlTime.current = undefined
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

    if (status === 'afterStart' && inSpace === false && inMeta === false && inControlDraw === true && canvasLayerFind !== undefined && canvasLayerFind.visibility === true && pencilActionRunFind !== undefined) {
      dragControlType.current = 0
      dragControlProp.current = { operation: undefined }
    }
    if (status === 'afterStart' && inTouch2 === true && inControlMove === true) {
      clearTimeout(dragControlTime.current)
      dragControlType.current = 1
    }
    if (status === 'afterStart' && inTouch3 === true && canvasLayerFind !== undefined && canvasLayerFind.visibility === true) {
      clearTimeout(dragControlTime.current)
      dragControlType.current = 2
    }

    if (dragControlType.current === 0 && (status === 'afterStart' || status === 'afterMove' || status === 'afterEnd')) {
      const offsetX = (x - ImitationPageCanvas.state.store.rect.width / 2 - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.scaleX / canvasLayerFind.scaleX * ImitationPageCanvas.state.store.dpr
      const offsetY = (y - ImitationPageCanvas.state.store.rect.height / 2 - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.scaleY / canvasLayerFind.scaleY * ImitationPageCanvas.state.store.dpr
      const translateX = ImitationPageCanvas.state.store.translateX / canvasLayerFind.scaleX + canvasLayerFind.translateX
      const translateY = ImitationPageCanvas.state.store.translateY / canvasLayerFind.scaleY + canvasLayerFind.translateY
      const relativeX = offsetX - translateX
      const relativeY = offsetY - translateY
      const canvas = ImitationPageCanvas.state.store.refCanvas
      const context = ImitationPageCanvas.state.store.refContext
      const layer = canvasLayerFind
      const operations = canvasLayerFind.operation

      if (status === 'afterStart') {
        dragControlProp.current.operation = { _hash: hash(), pencilHash: pencilFind._hash, visibility: true, setting: structuredClone(pencilFind.setting) }
        canvasLayerFind.operation.push(dragControlProp.current.operation)
      }

      pencilActionRunFind(status, relativeX, relativeY, canvas, context, layer, operations, dragControlProp.current.operation)

      if (status === 'afterStart') canvasLayerRefFind.offscreenExceptLastOperationUpdate = true

      canvasLayerRefFind.offscreenComposeLastOperationUpdate = true

      updateCanvasOffscreenRenderThrottleLastRAF()
      updateDebounce500()
    }

    if (dragControlType.current === 1 && status === 'afterMove' && inTouch2 === true) {
      const offsetX = (changedX[0] + changedX[1]) / 2 / ImitationPageCanvas.state.store.scaleX * ImitationPageCanvas.state.store.dpr
      const offsetY = (changedY[0] + changedY[1]) / 2 / ImitationPageCanvas.state.store.scaleY * ImitationPageCanvas.state.store.dpr

      ImitationPageCanvas.state.store.translateX = ImitationPageCanvas.state.store.translateX + offsetX
      ImitationPageCanvas.state.store.translateY = ImitationPageCanvas.state.store.translateY + offsetY

      ImitationPageCanvas.state.store.refLayer.forEach(i => i.offscreenUpdate = true)

      updateCanvasOffscreenRenderThrottleLastRAF()
      updateDebounce500()
    }

    if (dragControlType.current === 2 && status === 'afterMove' && inTouch3 === true) {
      const offsetX = (changedX[0] + changedX[1] + changedX[2]) / 3 / ImitationPageCanvas.state.store.scaleX / canvasLayerFind.scaleX * ImitationPageCanvas.state.store.dpr
      const offsetY = (changedY[0] + changedY[1] + changedY[2]) / 3 / ImitationPageCanvas.state.store.scaleY / canvasLayerFind.scaleY * ImitationPageCanvas.state.store.dpr

      canvasLayerFind.translateX = canvasLayerFind.translateX + offsetX
      canvasLayerFind.translateY = canvasLayerFind.translateY + offsetY

      canvasLayerRefFind.offscreenUpdate = true

      updateCanvasOffscreenRenderThrottleLastRAF()
      updateDebounce500()
    }

    if (status === 'afterEnd') {
      clearTimeout(dragControlTime.current)
      dragControlType.current = undefined
      dragControlProp.current = undefined
      dragControlTime.current = undefined
    }
  }

  const { onTouchStart } = useDragControlTouch({ enable: true, onChange: onChangeDragControlTouch })

  const onWheel = (e) => {
    if (ImitationPageCanvas.state.store.recting === true) return

    if (e.nativeEvent.ctrlKey === false && inControlMove === true && inMeta === false) {
      const offsetX = e.nativeEvent.deltaX / ImitationPageCanvas.state.store.scaleX * ImitationPageCanvas.state.store.dpr * 2 * -1
      const offsetY = e.nativeEvent.deltaY / ImitationPageCanvas.state.store.scaleY * ImitationPageCanvas.state.store.dpr * 2 * -1

      ImitationPageCanvas.state.store.translateX = ImitationPageCanvas.state.store.translateX + offsetX
      ImitationPageCanvas.state.store.translateY = ImitationPageCanvas.state.store.translateY + offsetY

      ImitationPageCanvas.state.store.refLayer.forEach(i => i.offscreenUpdate = true)

      updateCanvasOffscreenRenderThrottleLastRAF()
      updateDebounce500()
    }

    if (e.nativeEvent.ctrlKey === false && inControlMove === true && inMeta === true && canvasLayerFind !== undefined && canvasLayerFind.visibility === true) {
      const offsetX = e.nativeEvent.deltaX / ImitationPageCanvas.state.store.scaleX / canvasLayerFind.scaleX * ImitationPageCanvas.state.store.dpr * 2 * -1
      const offsetY = e.nativeEvent.deltaY / ImitationPageCanvas.state.store.scaleY / canvasLayerFind.scaleY * ImitationPageCanvas.state.store.dpr * 2 * -1

      canvasLayerFind.translateX = canvasLayerFind.translateX + offsetX
      canvasLayerFind.translateY = canvasLayerFind.translateY + offsetY

      canvasLayerRefFind.offscreenUpdate = true

      updateCanvasOffscreenRenderThrottleLastRAF()
      updateDebounce500()
    }

    if (e.nativeEvent.ctrlKey === true && inControlMove === true && inMeta === false) {
      var scaleX = range(Number(Number(ImitationPageCanvas.state.store.scaleX - ImitationPageCanvas.state.store.scaleX * 0.01 * e.nativeEvent.deltaY).toFixed(2)), 0.02, 24)
      if (e.nativeEvent.deltaY < 0 && scaleX === ImitationPageCanvas.state.store.scaleX) var scaleX = range(ImitationPageCanvas.state.store.scaleX + 0.01, 0.02, 24)
      if (e.nativeEvent.deltaY > 0 && scaleX === ImitationPageCanvas.state.store.scaleX) var scaleX = range(ImitationPageCanvas.state.store.scaleX - 0.01, 0.02, 24)

      var scaleY = range(Number(Number(ImitationPageCanvas.state.store.scaleY - ImitationPageCanvas.state.store.scaleY * 0.01 * e.nativeEvent.deltaY).toFixed(2)), 0.02, 24)
      if (e.nativeEvent.deltaY < 0 && scaleY === ImitationPageCanvas.state.store.scaleY) var scaleY = range(ImitationPageCanvas.state.store.scaleY + 0.01, 0.02, 24)
      if (e.nativeEvent.deltaY > 0 && scaleY === ImitationPageCanvas.state.store.scaleY) var scaleY = range(ImitationPageCanvas.state.store.scaleY - 0.01, 0.02, 24)

      // const offsetX = (e.pageX - ImitationPageCanvas.state.store.rect.width / 2 - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.scaleX / canvasLayerFind.scaleX * ImitationPageCanvas.state.store.dpr * (1 - scaleX / ImitationPageCanvas.state.store.scaleX)
      // const offsetY = (e.pageY - ImitationPageCanvas.state.store.rect.height / 2 - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.scaleY / canvasLayerFind.scaleY * ImitationPageCanvas.state.store.dpr * (1 - scaleY / ImitationPageCanvas.state.store.scaleY)

      // ImitationPageCanvas.state.store.translateX = ImitationPageCanvas.state.store.translateX + offsetX
      // ImitationPageCanvas.state.store.translateY = ImitationPageCanvas.state.store.translateY + offsetY

      ImitationPageCanvas.state.store.scaleX = scaleX
      ImitationPageCanvas.state.store.scaleY = scaleY

      ImitationPageCanvas.state.store.refLayer.forEach(i => i.offscreenUpdate = true)

      updateCanvasOffscreenRenderThrottleLastRAF()
      updateDebounce500()
    }

    if (e.nativeEvent.ctrlKey === true && inControlMove === true && inMeta === true && canvasLayerFind !== undefined && canvasLayerFind.visibility === true) {
      var scaleX = range(Number(Number(canvasLayerFind.scaleX - canvasLayerFind.scaleX * 0.01 * e.nativeEvent.deltaY).toFixed(2)), 0.02, 24)
      if (e.nativeEvent.deltaY < 0 && scaleX === canvasLayerFind.scaleX) var scaleX = range(canvasLayerFind.scaleX + 0.01, 0.02, 24)
      if (e.nativeEvent.deltaY > 0 && scaleX === canvasLayerFind.scaleX) var scaleX = range(canvasLayerFind.scaleX - 0.01, 0.02, 24)

      var scaleY = range(Number(Number(canvasLayerFind.scaleY - canvasLayerFind.scaleY * 0.01 * e.nativeEvent.deltaY).toFixed(2)), 0.02, 24)
      if (e.nativeEvent.deltaY < 0 && scaleY === canvasLayerFind.scaleY) var scaleY = range(canvasLayerFind.scaleY + 0.01, 0.02, 24)
      if (e.nativeEvent.deltaY > 0 && scaleY === canvasLayerFind.scaleY) var scaleY = range(canvasLayerFind.scaleY - 0.01, 0.02, 24)

      // const offsetX = (e.pageX - ImitationPageCanvas.state.store.rect.width / 2 - ImitationPageCanvas.state.store.rect.left) / ImitationPageCanvas.state.store.scaleX / canvasLayerFind.scaleX * ImitationPageCanvas.state.store.dpr * (1 - scaleX / ImitationPageCanvas.state.store.scaleX)
      // const offsetY = (e.pageY - ImitationPageCanvas.state.store.rect.height / 2 - ImitationPageCanvas.state.store.rect.top) / ImitationPageCanvas.state.store.scaleY / canvasLayerFind.scaleY * ImitationPageCanvas.state.store.dpr * (1 - scaleY / ImitationPageCanvas.state.store.scaleY)

      // canvasLayerFind.translateX = canvasLayerFind.translateX + offsetX
      // canvasLayerFind.translateY = canvasLayerFind.translateY + offsetY

      canvasLayerFind.scaleX = scaleX
      canvasLayerFind.scaleY = scaleY

      canvasLayerRefFind.offscreenUpdate = true

      updateCanvasOffscreenRenderThrottleLastRAF()
      updateDebounce500()
    }
  }

  const operationRender = (layer, canvas, context, operation) => {
    operation
      .filter(i => i.visibility === true && pencilRenderFindMap[i.pencilHash])
      .forEach(i => {
        context.save()

        context.translate(canvas.width / 2, canvas.height / 2)

        context.scale(ImitationPageCanvas.state.store.scaleX, ImitationPageCanvas.state.store.scaleY)
        context.translate(ImitationPageCanvas.state.store.translateX, ImitationPageCanvas.state.store.translateY)
        context.scale(layer.scaleX, layer.scaleY)
        context.translate(layer.translateX, layer.translateY)

        pencilRenderFindMap[i.pencilHash](canvas, context, layer, i)

        context.restore()
      })
  }

  const canvasOffscreenInit = () => {
    ImitationPageCanvas.state.store.refLayer.forEach(i => {
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

      if (i.offscreenExceptLastOperationCanvas === undefined) {
        i.offscreenExceptLastOperationCanvas = new OffscreenCanvas(realW, realH)
        i.offscreenExceptLastOperationContext = i.offscreenExceptLastOperationCanvas.getContext('2d')
        i.offscreenUpdate = true
      }

      if (i.offscreenExceptLastOperationCanvas.width !== realW || i.offscreenExceptLastOperationCanvas.height !== realH) {
        i.offscreenExceptLastOperationCanvas.width = realW
        i.offscreenExceptLastOperationCanvas.height = realH
        i.offscreenExceptLastOperationContext = i.offscreenExceptLastOperationCanvas.getContext('2d')
        i.offscreenUpdate = true
      }
    })

    canvasOffscreenRender()
  }

  const canvasOffscreenRender = () => {
    ImitationPageCanvas.state.store.source.canvas.layer.forEach(i => {
      const canvasLayerRefFind = ImitationPageCanvas.state.store.refLayer.find(i_ => i_.layerHash === i._hash)

      if (canvasLayerRefFind.offscreenExceptLastOperationUpdate === true) {
        canvasLayerRefFind.offscreenExceptLastOperationContext.clearRect(0, 0, canvasLayerRefFind.offscreenExceptLastOperationCanvas.width, canvasLayerRefFind.offscreenExceptLastOperationCanvas.height)
        operationRender(i, canvasLayerRefFind.offscreenExceptLastOperationCanvas, canvasLayerRefFind.offscreenExceptLastOperationContext, i.operation.slice(0, i.operation.length - 1))
      }

      if (canvasLayerRefFind.offscreenComposeLastOperationUpdate === true) {
        canvasLayerRefFind.offscreenContext.clearRect(0, 0, canvasLayerRefFind.offscreenCanvas.width, canvasLayerRefFind.offscreenCanvas.height)
        canvasLayerRefFind.offscreenContext.drawImage(canvasLayerRefFind.offscreenExceptLastOperationCanvas, ...caculatePositionCenter(canvasLayerRefFind.offscreenCanvas, canvasLayerRefFind.offscreenExceptLastOperationCanvas, { x: 0, y: 0 }))
        operationRender(i, canvasLayerRefFind.offscreenCanvas, canvasLayerRefFind.offscreenContext, i.operation.slice(i.operation.length - 1, i.operation.length))
      }

      if (canvasLayerRefFind.offscreenUpdate === true) {
        canvasLayerRefFind.offscreenContext.clearRect(0, 0, canvasLayerRefFind.offscreenCanvas.width, canvasLayerRefFind.offscreenCanvas.height)
        operationRender(i, canvasLayerRefFind.offscreenCanvas, canvasLayerRefFind.offscreenContext, i.operation)
      }

      canvasLayerRefFind.offscreenExceptLastOperationUpdate = false
      canvasLayerRefFind.offscreenComposeLastOperationUpdate = false
      canvasLayerRefFind.offscreenUpdate = false
    })

    canvasOnlinescreenRender()
  }

  const canvasOnlinescreenRender = () => {
    ImitationPageCanvas.state.store.refContext.clearRect(0, 0, ImitationPageCanvas.state.store.refCanvas.width, ImitationPageCanvas.state.store.refCanvas.height)

    ImitationPageCanvas.state.store.source.canvas.layer.forEach(i => {
      const canvasLayerRefFind = ImitationPageCanvas.state.store.refLayer.find(i_ => i_.layerHash === i._hash)

      if (i.visibility === true) {
        const position = caculatePositionCenter(ImitationPageCanvas.state.store.refCanvas, canvasLayerRefFind.offscreenCanvas, { x: 0, y: 0 })
        if (position !== undefined) ImitationPageCanvas.state.store.refContext.drawImage(canvasLayerRefFind.offscreenCanvas, ...position)
      }
    })
  }

  React.useEffect(() => {
    ImitationPageCanvas.state.store.refContext = ImitationPageCanvas.state.store.refCanvas.getContext('2d')
  }, [])

  React.useEffect(() => {
    if (ImitationPageCanvas.state.store.recting === true || ImitationPageCanvas.state.store.rect === undefined || ImitationPageCanvas.state.store.rect.width === 0 || ImitationPageCanvas.state.store.rect.height === 0) return

    setStyleW(ImitationPageCanvas.state.store.rect.width)
    setStyleH(ImitationPageCanvas.state.store.rect.height)
    setRealW(ImitationPageCanvas.state.store.rect.width * ImitationPageCanvas.state.store.dpr)
    setRealH(ImitationPageCanvas.state.store.rect.height * ImitationPageCanvas.state.store.dpr)
  }, [ImitationPageCanvas.state.store.recting, ImitationPageCanvas.state.store.rect, ImitationPageCanvas.state.store.dpr])

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

  React.useEffect(() => {
    const touchmove = (e) => e.preventDefault()
    wrapperRef.current.addEventListener('touchmove', touchmove, { passive: false })
    return () => wrapperRef.current.removeEventListener('touchmove', touchmove, { passive: false })
  }, [])

  return <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', width: '100%', height: '100%' }} onMouseDown={onMouseDown} onTouchStart={onTouchStart} onWheel={onWheel} ref={el => wrapperRef.current = el}>
    <canvas style={{ position: 'absolute', width: styleW, height: styleH, opacity: opacity, transition: '1s all' }} width={realW} height={realH} ref={el => ImitationPageCanvas.state.store.refCanvas = el} />
  </div>
}

const dependence = [
  {
    instance: ImitationPageCanvas, dependence: state => [
      ImitationPageCanvas.state.store.recting,
      ImitationPageCanvas.state.store.rect,
      ImitationPageCanvas.state.store.dpr,
      ImitationPageCanvas.state.store.controlDraw,
      ImitationPageCanvas.state.store.controlMove,
      ImitationPageCanvas.state.store.activeLayer,
      ImitationPageCanvas.state.store.activePencil,
      ImitationPageCanvas.state.update.canvasOffscreenInit,
      ImitationPageCanvas.state.update.canvasOffscreenRender,
      ImitationPageCanvas.state.update.canvasOnlinescreenRender
    ]
  }
]

export default withBindComponentPure(App, dependence)