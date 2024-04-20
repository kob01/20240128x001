import React from 'react'

import Imitation from 'imitation-imm'

import PencilInit from './View.Config.Pencil'

import { hash, debounce, throttleLastRAF } from './utils.common'

import mockSource from './mock.source'

const ImitationInstance = new Imitation()


ImitationInstance.state = { update: {}, store: {}, function: {}, memo: {} }

ImitationInstance.state.store = { ref: {}, pencil: {}, view: {}, control: {}, active: {} }


ImitationInstance.state.update.now = performance.now()

ImitationInstance.state.update.canvasOffscreenInit = performance.now()

ImitationInstance.state.update.canvasOffscreenRender = performance.now()

ImitationInstance.state.update.canvasOnlinescreenRender = performance.now()


ImitationInstance.state.store.load = false

ImitationInstance.state.store.rect = undefined

ImitationInstance.state.store.recting = false

ImitationInstance.state.store.source = undefined

ImitationInstance.state.store.pencil = undefined

ImitationInstance.state.store.ref.canvas = undefined

ImitationInstance.state.store.ref.context = undefined

ImitationInstance.state.store.ref.layer = []

ImitationInstance.state.store.view.dpr = 2

ImitationInstance.state.store.view.scaleX = 1

ImitationInstance.state.store.view.scaleY = 1

ImitationInstance.state.store.view.translateX = 0

ImitationInstance.state.store.view.translateY = 0

ImitationInstance.state.store.control.draw = true

ImitationInstance.state.store.control.move = true

ImitationInstance.state.store.active.layer = undefined

ImitationInstance.state.store.active.pencil = undefined

ImitationInstance.state.store.active.action = undefined


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

ImitationInstance.state.function.onLoad = () => {
  ImitationInstance.state.store.load = true
  ImitationInstance.state.store.rect = undefined
  ImitationInstance.state.store.source = structuredClone(mockSource[0])
  ImitationInstance.state.store.source.canvas = structuredClone(mockSource[0].canvas)

  ImitationInstance.state.store.source.canvas.layer.forEach(i => {
    ImitationInstance.state.store.ref.layer.push({
      _hash: hash(),
      layerHash: i._hash,
      offscreenExceptLastActionCanvas: undefined,
      offscreenExceptLastActionContext: undefined,
      offscreenCanvas: undefined,
      offscreenContext: undefined,
      offscreenExceptLastActionUpdate: false,
      offscreenComposeLastActionUpdate: false,
      offscreenUpdate: false,
    })
  })

  ImitationInstance.state.function.onCanvasLayerCreate()

  ImitationInstance.state.store.pencil = PencilInit()

  ImitationInstance.state.store.active.layer = ImitationInstance.state.store.source.canvas.layer[0]._hash
  ImitationInstance.state.store.active.pencil = ImitationInstance.state.store.pencil[0]._hash

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onUnload = () => {
  ImitationInstance.state.store.load = false
  ImitationInstance.state.store.rect = undefined

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onClear = () => {
  ImitationInstance.state.function.onLoad()

  ImitationInstance.state.function.updateCanvasOffscreenInit()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onSave = (type) => {
  if (type === 0) {
    navigator.clipboard.writeText(JSON.stringify(ImitationInstance.state.store.source))
  }
  if (type === 1) {
    navigator.clipboard.writeText(JSON.stringify(ImitationInstance.state.store.source.canvas))
  }
}

ImitationInstance.state.function.onCanvasLayerCreate = () => {
  const i = {
    _hash: hash(),

    visibility: true,

    action: [],

    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
  }

  ImitationInstance.state.store.source.canvas.layer.push(i)

  ImitationInstance.state.store.ref.layer.push({
    _hash: hash(),
    layerHash: i._hash,
    offscreenExceptLastActionCanvas: undefined,
    offscreenExceptLastActionContext: undefined,
    offscreenCanvas: undefined,
    offscreenContext: undefined,
    offscreenExceptLastActionUpdate: false,
    offscreenComposeLastActionUpdate: false,
    offscreenUpdate: false,
  })

  ImitationInstance.state.function.updateCanvasOffscreenInit()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerCopy = (_hash) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === _hash)

  const result = structuredClone(canvasLayerFind)

  result._hash = hash()

  result.action.forEach(i => {
    i._hash = hash()
  })

  delete result.offscreenExceptLastActionCanvas
  delete result.offscreenExceptLastActionContext
  delete result.offscreenCanvas
  delete result.offscreenContext
  result.offscreenExceptLastActionUpdate = false
  result.offscreenComposeLastActionUpdate = false
  result.offscreenUpdate = true

  ImitationInstance.state.store.source.canvas.layer.push(result)

  ImitationInstance.state.store.ref.layer.push({
    _hash: hash(),
    layerHash: result._hash,
    offscreenExceptLastActionCanvas: undefined,
    offscreenExceptLastActionContext: undefined,
    offscreenCanvas: undefined,
    offscreenContext: undefined,
    offscreenExceptLastActionUpdate: false,
    offscreenComposeLastActionUpdate: false,
    offscreenUpdate: false,
  })

  ImitationInstance.state.function.updateCanvasOffscreenInit()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerRemove = (_hash) => {
  ImitationInstance.state.store.source.canvas.layer = ImitationInstance.state.store.source.canvas.layer.filter(i => i._hash !== _hash)

  ImitationInstance.state.store.ref.layer = ImitationInstance.state.store.ref.layer.filter(i => i.layerHash !== _hash)

  ImitationInstance.state.store.active.layer = ImitationInstance.state.store.active.layer === _hash ? undefined : ImitationInstance.state.store.active.layer

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
  const canvasLayerRefFind = ImitationInstance.state.store.ref.layer.find(i => i.layerHash === _hash)

  canvasLayerFind.visibility = value

  if (value === true) canvasLayerRefFind.offscreenUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerActionVisibilityTracks = (_hash, index) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === _hash)
  const canvasLayerRefFind = ImitationInstance.state.store.ref.layer.find(i => i.layerHash === _hash)

  canvasLayerFind.action.forEach((i, index_) => {
    if (index_ === index - 1) i.visibility = true
    if (index_ < index - 1) i.visibility = true
    if (index_ > index - 1) i.visibility = false
  })

  canvasLayerRefFind.offscreenUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerActionVisibilityTrack = (_hash, index) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === _hash)
  const canvasLayerRefFind = ImitationInstance.state.store.ref.layer.find(i => i.layerHash === _hash)

  canvasLayerFind.action[index].visibility = !canvasLayerFind.action[index].visibility

  canvasLayerRefFind.offscreenUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onPencilSwitch = (_hash) => {
  const find = ImitationInstance.state.store.pencil.find(i => i._hash === _hash)
  ImitationInstance.state.store.active.pencil = find._hash
  ImitationInstance.state.function.update()
}


ImitationInstance.state.memo.canvasLayerFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.source.canvas.layer, ImitationInstance.state.store.source.canvas.layer.length])

ImitationInstance.state.memo.canvasLayerFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.source.canvas.layer.findIndex(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.source.canvas.layer, ImitationInstance.state.store.source.canvas.layer.length])

ImitationInstance.state.memo.canvasLayerActionVisibilityTrackFindIndex = (_hash, dep = []) => React.useMemo(() => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === _hash)
  if (canvasLayerFind === undefined) return -1
  if (canvasLayerFind !== undefined) {
    const canvasActionFalseFindIndex = canvasLayerFind.action.findIndex(i => i.visibility === false)
    if (canvasActionFalseFindIndex === -1) return canvasLayerFind.action.length
    if (canvasActionFalseFindIndex !== -1) return canvasActionFalseFindIndex
  }
}, [...dep, _hash, ImitationInstance.state.store.source.canvas.layer, ImitationInstance.state.store.source.canvas.layer.length])

ImitationInstance.state.memo.canvasLayerRefFind = (layerHash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.ref.layer.find(i => i.layerHash === layerHash)
}, [...dep, layerHash, ImitationInstance.state.store.ref.layer, ImitationInstance.state.store.ref.layer.length])


ImitationInstance.state.memo.pencilFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.pencil.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.pencil, ImitationInstance.state.store.pencil.length])

ImitationInstance.state.memo.pencilActionRunFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.pencil.find(i => i._hash === _hash).pencilAction()
}, [...dep, _hash, ImitationInstance.state.store.pencil, ImitationInstance.state.store.pencil.length])

ImitationInstance.state.memo.pencilRenderFindMap = (key, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.pencil.reduce((t, i) => ({ ...t, [i[key]]: i.pencilRender }), {})
}, [...dep, ImitationInstance.state.store.pencil, ImitationInstance.state.store.pencil.length])


export default ImitationInstance