import React from 'react'

import Imitation from 'imitation-imm'

import pencilInit from './Config.Pencil'

import ImitationGlobal from './Imitation.Global'

import { hash, debounce, throttleLastRAF, throttlePipeTime } from './utils.common'

import mockCanvasSourceEmpty from './mock.canvas.source.empty.json'

const ImitationInstance = new Imitation()


ImitationInstance.state = { update: {}, store: {}, init: {}, function: {}, memo: {} }


ImitationInstance.state.update.now = performance.now()

ImitationInstance.state.update.canvasOffscreenInit = performance.now()

ImitationInstance.state.update.canvasOffscreenRender = performance.now()

ImitationInstance.state.update.canvasOnlinescreenRender = performance.now()

ImitationInstance.state.update.navigationWindow = performance.now()

ImitationInstance.state.store.rect = undefined

ImitationInstance.state.store.recting = false

ImitationInstance.state.store.source = { _hash: hash(), canvas: { layer: [], color: [], point: [] } }

ImitationInstance.state.store.pencil = []

ImitationInstance.state.store.refCanvas = undefined

ImitationInstance.state.store.refContext = undefined

ImitationInstance.state.store.refLayer = []

ImitationInstance.state.store.viewDpr = 2

ImitationInstance.state.store.viewScaleX = 1

ImitationInstance.state.store.viewScaleY = 1

ImitationInstance.state.store.viewTranslateX = 0

ImitationInstance.state.store.viewTranslateY = 0

ImitationInstance.state.store.controlDraw = true

ImitationInstance.state.store.controlMove = true

ImitationInstance.state.store.activeLayer = undefined

ImitationInstance.state.store.activePencil = undefined

ImitationInstance.state.store.activeOperation = undefined


ImitationInstance.state.init.store = JSON.parse(JSON.stringify(ImitationInstance.state.store))


ImitationInstance.state.function.update = () => {
  ImitationInstance.state.update.now = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.updateCanvasOffscreenInit = () => {
  ImitationInstance.state.update.canvasOffscreenInit = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.updateCanvasOffscreenRender = () => {
  ImitationInstance.state.update.canvasOffscreenRender = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.updateCanvasOnlinescreenRender = () => {
  ImitationInstance.state.update.canvasOnlinescreenRender = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.updateNavigationWindow = () => {
  ImitationInstance.state.update.navigationWindow = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.onLoad = (data) => {
  ImitationInstance.state.store.pencil = pencilInit()

  if (data.source) {
    ImitationInstance.state.store.source = data.source
    ImitationInstance.state.store.refLayer = ImitationInstance.state.store.source.canvas.layer.map(i => {
      return {
        _hash: hash(),
        layerHash: i._hash,
        offscreenExceptLastOperationCanvas: undefined,
        offscreenExceptLastOperationContext: undefined,
        offscreenCanvas: undefined,
        offscreenContext: undefined,
        offscreenExceptLastOperationUpdate: false,
        offscreenComposeLastOperationUpdate: false,
        offscreenUpdate: false,
      }
    })
  }

  if (data.active) {
    ImitationInstance.state.store.activeLayer = data.source.activeLayer
    ImitationInstance.state.store.activePencil = data.source.activePencil
    ImitationInstance.state.store.activeOperation = data.source.activeOperation
  }

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onUnload = () => {
  ImitationInstance.state.store = JSON.parse(JSON.stringify(ImitationInstance.state.init.store))
}

ImitationInstance.state.function.onClear = () => {
  ImitationInstance.state.function.onLoad()

  ImitationInstance.state.function.updateCanvasOffscreenInit()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerCreate = () => {
  const i = {
    _hash: hash(),

    visibility: true,

    operation: [],

    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
  }

  ImitationInstance.state.store.source.canvas.layer.push(i)

  ImitationInstance.state.store.refLayer.push({
    _hash: hash(),
    layerHash: i._hash,
    offscreenExceptLastOperationCanvas: undefined,
    offscreenExceptLastOperationContext: undefined,
    offscreenCanvas: undefined,
    offscreenContext: undefined,
    offscreenExceptLastOperationUpdate: false,
    offscreenComposeLastOperationUpdate: false,
    offscreenUpdate: false,
  })

  ImitationInstance.state.function.updateCanvasOffscreenInit()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerCopy = (_hash) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === _hash)

  const result = structuredClone(canvasLayerFind)

  result._hash = hash()

  result.operation.forEach(i => {
    i._hash = hash()
  })

  delete result.offscreenExceptLastOperationCanvas
  delete result.offscreenExceptLastOperationContext
  delete result.offscreenCanvas
  delete result.offscreenContext
  result.offscreenExceptLastOperationUpdate = false
  result.offscreenComposeLastOperationUpdate = false
  result.offscreenUpdate = true

  ImitationInstance.state.store.source.canvas.layer.push(result)

  ImitationInstance.state.store.refLayer.push({
    _hash: hash(),
    layerHash: result._hash,
    offscreenExceptLastOperationCanvas: undefined,
    offscreenExceptLastOperationContext: undefined,
    offscreenCanvas: undefined,
    offscreenContext: undefined,
    offscreenExceptLastOperationUpdate: false,
    offscreenComposeLastOperationUpdate: false,
    offscreenUpdate: false,
  })

  ImitationInstance.state.function.updateCanvasOffscreenInit()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerRemove = (_hash) => {
  ImitationInstance.state.store.source.canvas.layer = ImitationInstance.state.store.source.canvas.layer.filter(i => i._hash !== _hash)

  ImitationInstance.state.store.refLayer = ImitationInstance.state.store.refLayer.filter(i => i.layerHash !== _hash)

  ImitationInstance.state.store.activeLayer = ImitationInstance.state.store.activeLayer === _hash ? undefined : ImitationInstance.state.store.activeLayer

  ImitationInstance.state.function.updateCanvasOnlinescreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerMove = (_hash, type) => {
  const canvasLayerFindIndex = ImitationInstance.state.store.source.canvas.layer.findIndex(i => i._hash === _hash)

  if (type === 0 && canvasLayerFindIndex !== 0) {
    const [a, b] = [ImitationInstance.state.store.source.canvas.layer[canvasLayerFindIndex - 1], ImitationInstance.state.store.source.canvas.layer[canvasLayerFindIndex]]
    ImitationInstance.state.store.source.canvas.layer[canvasLayerFindIndex - 1] = b
    ImitationInstance.state.store.source.canvas.layer[canvasLayerFindIndex] = a
  }

  if (type === 1 && canvasLayerFindIndex !== ImitationInstance.state.store.source.canvas.layer.length - 1) {
    const [a, b] = [ImitationInstance.state.store.source.canvas.layer[canvasLayerFindIndex], ImitationInstance.state.store.source.canvas.layer[canvasLayerFindIndex + 1]]
    ImitationInstance.state.store.source.canvas.layer[canvasLayerFindIndex] = b
    ImitationInstance.state.store.source.canvas.layer[canvasLayerFindIndex + 1] = a
  }

  ImitationInstance.state.function.updateCanvasOnlinescreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerVisibility = (_hash, value) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === _hash)

  canvasLayerFind.visibility = value

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasOperationCopy = (layerHash, operationHash) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === layerHash)
  const canvasLayerRefFind = ImitationInstance.state.store.refLayer.find(i => i.layerHash === layerHash)
  const canvasLayerOperationFind = canvasLayerFind.operation.find(i => i._hash === operationHash)

  const result = structuredClone(canvasLayerOperationFind)

  result._hash = hash()

  canvasLayerFind.operation.push(result)

  canvasLayerRefFind.offscreenUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasOperationRemove = (layerHash, operationHash) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === layerHash)
  const canvasLayerRefFind = ImitationInstance.state.store.refLayer.find(i => i.layerHash === layerHash)

  canvasLayerFind.operation = canvasLayerFind.operation.filter(i => i._hash !== operationHash)

  canvasLayerRefFind.offscreenUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasOperationMove = (layerHash, operationHash, type) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === layerHash)
  const canvasLayerRefFind = ImitationInstance.state.store.refLayer.find(i => i.layerHash === layerHash)
  const canvasLayerOperationFindIndex = canvasLayerFind.operation.findIndex(i => i._hash === operationHash)

  if (type === 0 && canvasLayerOperationFindIndex !== 0) {
    const [a, b] = [canvasLayerFind.operation[canvasLayerOperationFindIndex - 1], canvasLayerFind.operation[canvasLayerOperationFindIndex]]
    canvasLayerFind.operation[canvasLayerOperationFindIndex - 1] = b
    canvasLayerFind.operation[canvasLayerOperationFindIndex] = a
  }

  if (type === 1 && canvasLayerOperationFindIndex !== canvasLayerFind.operation.length - 1) {
    const [a, b] = [canvasLayerFind.operation[canvasLayerOperationFindIndex], canvasLayerFind.operation[canvasLayerOperationFindIndex + 1]]
    canvasLayerFind.operation[canvasLayerOperationFindIndex] = b
    canvasLayerFind.operation[canvasLayerOperationFindIndex + 1] = a
  }

  canvasLayerRefFind.offscreenUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasOperationVisibility = (layerHash, operationHash, value) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === layerHash)
  const canvasLayerRefFind = ImitationInstance.state.store.refLayer.find(i => i.layerHash === layerHash)
  const canvasLayerOperationFind = canvasLayerFind.operation.find(i => i._hash === operationHash)

  canvasLayerOperationFind.visibility = value

  canvasLayerRefFind.offscreenUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasOperationVisibilityTracks = (_hash, index) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === _hash)
  const canvasLayerRefFind = ImitationInstance.state.store.refLayer.find(i => i.layerHash === _hash)

  canvasLayerFind.operation.forEach((i, index_) => {
    if (index_ === index - 1) i.visibility = true
    if (index_ < index - 1) i.visibility = true
    if (index_ > index - 1) i.visibility = false
  })

  canvasLayerRefFind.offscreenUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasOperationVisibilityTrack = (_hash, index) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === _hash)
  const canvasLayerRefFind = ImitationInstance.state.store.refLayer.find(i => i.layerHash === _hash)

  canvasLayerFind.operation[index].visibility = !canvasLayerFind.operation[index].visibility

  canvasLayerRefFind.offscreenUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onPencilSwitch = (_hash) => {
  const find = ImitationInstance.state.store.pencil.find(i => i._hash === _hash)
  ImitationInstance.state.store.activePencil = find._hash
  ImitationInstance.state.function.update()
}


ImitationInstance.state.memo.canvasLayerFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.source.canvas.layer, ImitationInstance.state.store.source.canvas.layer.length])

ImitationInstance.state.memo.canvasLayerFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.source.canvas.layer.findIndex(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.source.canvas.layer, ImitationInstance.state.store.source.canvas.layer.length])

ImitationInstance.state.memo.canvasLayerOperationVisibilityTrackFindIndex = (_hash, dep = []) => React.useMemo(() => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === _hash)
  if (canvasLayerFind === undefined) return -1
  if (canvasLayerFind !== undefined) {
    const canvasOperationFalseFindIndex = canvasLayerFind.operation.findIndex(i => i.visibility === false)
    if (canvasOperationFalseFindIndex === -1) return canvasLayerFind.operation.length
    if (canvasOperationFalseFindIndex !== -1) return canvasOperationFalseFindIndex
  }
}, [...dep, _hash, ImitationInstance.state.store.source.canvas.layer, ImitationInstance.state.store.source.canvas.layer.length])

ImitationInstance.state.memo.canvasLayerRefFind = (layerHash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.refLayer.find(i => i.layerHash === layerHash)
}, [...dep, layerHash, ImitationInstance.state.store.refLayer, ImitationInstance.state.store.refLayer.length])

ImitationInstance.state.memo.canvasLayerOperationFind = (layerHash, layerOperationHash, dep = []) => React.useMemo(() => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === layerHash)
  if (canvasLayerFind === undefined) return undefined
  if (canvasLayerFind !== undefined) return canvasLayerFind.operation.find(i => i._hash === layerOperationHash)
}, [...dep, layerHash, layerOperationHash, ImitationInstance.state.store.source.canvas.layer, ImitationInstance.state.store.source.canvas.layer.length])

ImitationInstance.state.memo.pencilFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.pencil.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.pencil, ImitationInstance.state.store.pencil.length])

ImitationInstance.state.memo.pencilActionRunFind = (_hash, dep = []) => React.useMemo(() => {
  const pencilFind = ImitationInstance.state.store.pencil.find(i => i._hash === _hash)
  if (pencilFind === undefined) return undefined
  if (pencilFind !== undefined) return pencilFind.pencilAction()
}, [...dep, _hash, ImitationInstance.state.store.pencil, ImitationInstance.state.store.pencil.length])

ImitationInstance.state.memo.pencilRenderFindMap = (key, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.pencil.reduce((t, i) => ({ ...t, [i[key]]: i.pencilRender }), {})
}, [...dep, ImitationInstance.state.store.pencil, ImitationInstance.state.store.pencil.length])


export default ImitationInstance