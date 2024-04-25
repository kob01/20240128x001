import React from 'react'

import Imitation from 'imitation-imm'

import PencilInit from './View.Config.Pencil'

import ImitationGlobal from './Imitation.Global'

import { hash, debounce, throttleLastRAF, throttlePipeTime } from './utils.common'

import { apiCanvas } from './api'

const ImitationInstance = new Imitation()


ImitationInstance.state = { update: {}, store: {}, function: {}, memo: {} }

ImitationInstance.state.store = { ref: {}, pencil: {}, view: {}, control: {}, active: {} }


ImitationInstance.state.update.now = performance.now()

ImitationInstance.state.update.canvasOffscreenInit = performance.now()

ImitationInstance.state.update.canvasOffscreenRender = performance.now()

ImitationInstance.state.update.canvasOnlinescreenRender = performance.now()


ImitationInstance.state.store.rect = undefined

ImitationInstance.state.store.recting = false

ImitationInstance.state.store.source = undefined

ImitationInstance.state.store.pencil = PencilInit()

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
  ImitationGlobal.state.function.loadingUp()

  apiCanvas()
    .then(res => {
      ImitationInstance.state.store.source = res.source

      ImitationInstance.state.store.ref.layer = ImitationInstance.state.store.source.canvas.layer.map(i => {
        return {
          _hash: hash(),
          layerHash: i._hash,
          offscreenExceptLastActionCanvas: undefined,
          offscreenExceptLastActionContext: undefined,
          offscreenCanvas: undefined,
          offscreenContext: undefined,
          offscreenExceptLastActionUpdate: false,
          offscreenComposeLastActionUpdate: false,
          offscreenUpdate: false,
        }
      })

      ImitationInstance.state.store.active.layer = res.active.layer
      ImitationInstance.state.store.active.pencil = res.active.pencil
      ImitationInstance.state.store.active.action = res.active.action

      ImitationInstance.state.function.update()

      ImitationGlobal.state.function.loadingDown()
    })
}

ImitationInstance.state.function.onUnload = () => {
  ImitationInstance.state.function.update()
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

ImitationInstance.state.function.onCanvasLayerActionCopy = (layerHash, actionHash) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === layerHash)
  const canvasLayerRefFind = ImitationInstance.state.store.ref.layer.find(i => i.layerHash === layerHash)
  const canvasLayerActionFind = canvasLayerFind.action.find(i => i._hash === actionHash)

  const result = structuredClone(canvasLayerActionFind)

  result._hash = hash()

  canvasLayerFind.action.push(result)

  canvasLayerRefFind.offscreenUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerActionRemove = (layerHash, actionHash) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === layerHash)
  const canvasLayerRefFind = ImitationInstance.state.store.ref.layer.find(i => i.layerHash === layerHash)

  canvasLayerFind.action = canvasLayerFind.action.filter(i => i._hash !== actionHash)

  canvasLayerRefFind.offscreenUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerActionMove = (layerHash, actionHash, type) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === layerHash)
  const canvasLayerRefFind = ImitationInstance.state.store.ref.layer.find(i => i.layerHash === layerHash)
  const canvasLayerActionFindIndex = canvasLayerFind.action.findIndex(i => i._hash === actionHash)

  if (type === 0 && canvasLayerActionFindIndex !== 0) {
    const [a, b] = [canvasLayerFind.action[canvasLayerActionFindIndex - 1], canvasLayerFind.action[canvasLayerActionFindIndex]]
    canvasLayerFind.action[canvasLayerActionFindIndex - 1] = b
    canvasLayerFind.action[canvasLayerActionFindIndex] = a
  }

  if (type === 1 && canvasLayerActionFindIndex !== canvasLayerFind.action.length - 1) {
    const [a, b] = [canvasLayerFind.action[canvasLayerActionFindIndex], canvasLayerFind.action[canvasLayerActionFindIndex + 1]]
    canvasLayerFind.action[canvasLayerActionFindIndex] = b
    canvasLayerFind.action[canvasLayerActionFindIndex + 1] = a
  }

  canvasLayerRefFind.offscreenUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerActionVisibility = (layerHash, actionHash, value) => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === layerHash)
  const canvasLayerRefFind = ImitationInstance.state.store.ref.layer.find(i => i.layerHash === layerHash)
  const canvasLayerActionFind = canvasLayerFind.action.find(i => i._hash === actionHash)

  canvasLayerActionFind.visibility = value

  canvasLayerRefFind.offscreenUpdate = true

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

ImitationInstance.state.memo.canvasLayerActionFind = (layerHash, layerActionHash, dep = []) => React.useMemo(() => {
  const canvasLayerFind = ImitationInstance.state.store.source.canvas.layer.find(i => i._hash === layerHash)
  if (canvasLayerFind === undefined) return undefined
  if (canvasLayerFind !== undefined) return canvasLayerFind.action.find(i => i._hash === layerActionHash)
}, [...dep, layerHash, layerActionHash, ImitationInstance.state.store.source.canvas.layer, ImitationInstance.state.store.source.canvas.layer.length])

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