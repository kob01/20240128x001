import React from 'react'

import Imitation from 'imitation-imm'

import Paint from './View.Config.Paint'

import { hash, debounce, throttleLastRIC } from './utils.common'

import mockSource from './mock.source'

const ImitationInstance = new Imitation()

ImitationInstance.state = { update: {}, store: {}, function: {}, memo: {} }

ImitationInstance.state.store = { canvas: {}, paint: {}, view: {}, control: {}, active: {} }


ImitationInstance.state.update.now = performance.now()

ImitationInstance.state.update.canvasResize = performance.now()

ImitationInstance.state.update.canvasOffscreenRender = performance.now()

ImitationInstance.state.update.canvasOnlinescreenRender = performance.now()


ImitationInstance.state.store.load = false

ImitationInstance.state.store.rect = undefined

ImitationInstance.state.store.recting = false

ImitationInstance.state.store.source = undefined

ImitationInstance.state.store.canvas.layer = undefined

ImitationInstance.state.store.canvas.current = undefined

ImitationInstance.state.store.canvas.canvasRef = undefined

ImitationInstance.state.store.canvas.contextRef = undefined

ImitationInstance.state.store.paint.option = undefined

ImitationInstance.state.store.paint.current = undefined

ImitationInstance.state.store.paint.setting = undefined

ImitationInstance.state.store.view.dpr = 2

ImitationInstance.state.store.view.scaleX = 1

ImitationInstance.state.store.view.scaleY = 1

ImitationInstance.state.store.view.translateX = 0

ImitationInstance.state.store.view.translateY = 0

ImitationInstance.state.store.control.paint = true

ImitationInstance.state.store.active.layer = undefined

ImitationInstance.state.store.active.action = undefined


ImitationInstance.state.function.update = () => {
  ImitationInstance.state.update.now = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.updateCanvasResizeDebounce500 = debounce(ImitationInstance.state.function.update, 500)

ImitationInstance.state.function.updateCanvasResize = () => {
  ImitationInstance.state.update.canvasResize = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.updateCanvasResizeThrottleLastRIC = throttleLastRIC(ImitationInstance.state.function.updateCanvasResize)

ImitationInstance.state.function.updateCanvasOffscreenRender = () => {
  ImitationInstance.state.update.canvasOffscreenRender = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.updateCanvasOffscreenRenderThrottleLastRIC = throttleLastRIC(ImitationInstance.state.function.updateCanvasOffscreenRender)

ImitationInstance.state.function.updateCanvasOnlinescreenRender = () => {
  ImitationInstance.state.update.canvasOnlinescreenRender = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.updateCanvasOnlinescreenRenderThrottleLastRIC = throttleLastRIC(ImitationInstance.state.function.updateCanvasOnlinescreenRender)

ImitationInstance.state.function.onLoad = () => {
  ImitationInstance.state.store.load = true
  ImitationInstance.state.store.rect = undefined
  ImitationInstance.state.store.source = JSON.parse(JSON.stringify(mockSource[0]))
  ImitationInstance.state.store.canvas.layer = JSON.parse(JSON.stringify(mockSource[0].canvas))

  ImitationInstance.state.store.canvas.layer.forEach(i => {
    Object.assign(i, {
      offscreenPreviousActionCanvasRef: undefined,
      offscreenPreviousActionContextRef: undefined,
      offscreenCanvasRef: undefined,
      offscreenContextRef: undefined,
      previousActionContextShouldUpdate: false,
      lastActionContextShouldUpdate: false,
      contextShouldUpdate: false,
    })
  })

  ImitationInstance.state.function.onCanvasLayerCreate()
  ImitationInstance.state.function.onCanvasLayerCreate()

  ImitationInstance.state.store.canvas.current = ImitationInstance.state.store.canvas.layer[0]._hash
  ImitationInstance.state.store.paint.option = Paint
  ImitationInstance.state.store.paint.filter = [ImitationInstance.state.store.paint.option[0].type]
  ImitationInstance.state.store.paint.current = ImitationInstance.state.store.paint.option[0]._hash
  ImitationInstance.state.store.paint.setting = Paint.map(i => ({ _hash: hash(), paintOptionHash: i._hash, setting: JSON.parse(JSON.stringify(i.settingDefault)) }))

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onUnload = () => {
  ImitationInstance.state.store.load = false
  ImitationInstance.state.store.rect = undefined

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onClear = () => {
  ImitationInstance.state.store.canvas.layer = JSON.parse(JSON.stringify(mockSource[0].canvas))

  ImitationInstance.state.store.canvas.layer.forEach(i => {
    Object.assign(i, {
      offscreenPreviousActionCanvasRef: undefined,
      offscreenPreviousActionContextRef: undefined,
      offscreenCanvasRef: undefined,
      offscreenContextRef: undefined,
      previousActionContextShouldUpdate: false,
      lastActionContextShouldUpdate: false,
      contextShouldUpdate: true,
    })
  })

  ImitationInstance.state.store.canvas.current = ImitationInstance.state.store.canvas.layer[0]._hash

  ImitationInstance.state.function.updateCanvasResize()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onSave = (type) => {
  if (type === 0) {
    const r = JSON.parse(JSON.stringify(ImitationInstance.state.store.source))

    const r_ = JSON.parse(JSON.stringify(ImitationInstance.state.store.canvas.layer))

    r_.forEach(i => {
      delete i.offscreenPreviousActionCanvasRef
      delete i.offscreenPreviousActionContextRef
      delete i.offscreenCanvasRef
      delete i.offscreenContextRef
      delete i.previousActionContextShouldUpdate
      delete i.lastActionContextShouldUpdate
      delete i.contextShouldUpdate
    })

    r.canvas = r_

    navigator.clipboard.writeText(JSON.stringify(r))
  }
  if (type === 1) {
    const r = JSON.parse(JSON.stringify(ImitationInstance.state.store.canvas.layer))

    r.forEach(i => {
      delete i.offscreenPreviousActionCanvasRef
      delete i.offscreenPreviousActionContextRef
      delete i.offscreenCanvasRef
      delete i.offscreenContextRef
      delete i.previousActionContextShouldUpdate
      delete i.lastActionContextShouldUpdate
      delete i.contextShouldUpdate
    })

    navigator.clipboard.writeText(JSON.stringify(r))
  }
}

ImitationInstance.state.function.onViewScaleXChange = (value) => {
  ImitationInstance.state.store.view.scaleX = value

  ImitationInstance.state.store.canvas.layer.forEach(i => i.contextShouldUpdate = true)

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onViewScaleXChangeThrottleLastRIC = throttleLastRIC(ImitationInstance.state.function.onViewScaleXChange)

ImitationInstance.state.function.onViewScaleYChange = (value) => {
  ImitationInstance.state.store.view.scaleY = value

  ImitationInstance.state.store.canvas.layer.forEach(i => i.contextShouldUpdate = true)

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onViewScaleYChangeThrottleLastRIC = throttleLastRIC(ImitationInstance.state.function.onViewScaleYChange)

ImitationInstance.state.function.onViewTranslateXChange = (value) => {
  ImitationInstance.state.store.view.translateX = value

  ImitationInstance.state.store.canvas.layer.forEach(i => i.contextShouldUpdate = true)

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onViewTranslateXChangeThrottleLastRIC = throttleLastRIC(ImitationInstance.state.function.onViewTranslateXChange)

ImitationInstance.state.function.onViewTranslateYChange = (value) => {
  ImitationInstance.state.store.view.translateY = value

  ImitationInstance.state.store.canvas.layer.forEach(i => i.contextShouldUpdate = true)

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onViewTranslateYChangeThrottleLastRIC = throttleLastRIC(ImitationInstance.state.function.onViewTranslateYChange)

ImitationInstance.state.function.onCanvasLayerCreate = () => {
  const i = {
    _hash: hash(),

    visibility: true,

    action: [],

    offscreenPreviousActionCanvasRef: undefined,
    offscreenPreviousActionContextRef: undefined,

    offscreenCanvasRef: undefined,
    offscreenContextRef: undefined,

    previousActionContextShouldUpdate: false,
    lastActionContextShouldUpdate: false,
    contextShouldUpdate: false,

    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
  }

  ImitationInstance.state.store.canvas.layer.push(i)

  ImitationInstance.state.function.updateCanvasResize()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerCopy = (_hash) => {
  const canvasLayerFind = ImitationInstance.state.store.canvas.layer.find(i => i._hash === _hash)

  const result = JSON.parse(JSON.stringify(canvasLayerFind))

  result._hash = hash()

  result.action.forEach(i => {
    i._hash = hash()
  })

  delete result.offscreenPreviousActionCanvasRef
  delete result.offscreenPreviousActionContextRef
  delete result.offscreenCanvasRef
  delete result.offscreenContextRef
  result.previousActionContextShouldUpdate = false
  result.lastActionContextShouldUpdate = false
  result.contextShouldUpdate = true

  ImitationInstance.state.store.canvas.layer.push(result)

  ImitationInstance.state.function.updateCanvasResize()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerRemove = (_hash) => {
  ImitationInstance.state.store.canvas.layer = ImitationInstance.state.store.canvas.layer.filter(i => i._hash !== _hash)

  ImitationInstance.state.store.canvas.current = undefined

  ImitationInstance.state.function.updateCanvasOnlinescreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerMove = (_hash, type) => {
  const canvasLayerFindIndex = ImitationInstance.state.store.canvas.layer.findIndex(i => i._hash === _hash)

  if (type === 0 && canvasLayerFindIndex !== 0) {
    const [a, b] = [ImitationInstance.state.store.canvas.layer[canvasLayerFindIndex - 1], ImitationInstance.state.store.canvas.layer[canvasLayerFindIndex]]
    ImitationInstance.state.store.canvas.layer[canvasLayerFindIndex - 1] = b
    ImitationInstance.state.store.canvas.layer[canvasLayerFindIndex] = a
  }

  if (type === 1 && canvasLayerFindIndex !== ImitationInstance.state.store.canvas.layer.length - 1) {
    const [a, b] = [ImitationInstance.state.store.canvas.layer[canvasLayerFindIndex], ImitationInstance.state.store.canvas.layer[canvasLayerFindIndex + 1]]
    ImitationInstance.state.store.canvas.layer[canvasLayerFindIndex] = b
    ImitationInstance.state.store.canvas.layer[canvasLayerFindIndex + 1] = a
  }

  ImitationInstance.state.function.updateCanvasOnlinescreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerVisibility = (_hash, value) => {
  const canvasLayerFind = ImitationInstance.state.store.canvas.layer.find(i => i._hash === _hash)

  canvasLayerFind.visibility = value

  if (value === true) canvasLayerFind.contextShouldUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerActionVisibilityTracks = (_hash, index) => {
  const canvasLayerFind = ImitationInstance.state.store.canvas.layer.find(i => i._hash === _hash)

  canvasLayerFind.action.forEach((i, index_) => {
    if (index_ === index - 1) i.visibility = true
    if (index_ < index - 1) i.visibility = true
    if (index_ > index - 1) i.visibility = false
  })

  canvasLayerFind.contextShouldUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerActionVisibilityTrack = (_hash, index) => {
  const canvasLayerFind = ImitationInstance.state.store.canvas.layer.find(i => i._hash === _hash)

  canvasLayerFind.action[index].visibility = !canvasLayerFind.action[index].visibility

  canvasLayerFind.contextShouldUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onPaintSwitch = (_hash) => {
  const find = ImitationInstance.state.store.paint.option.find(i => i._hash === _hash)
  ImitationInstance.state.store.paint.current = find._hash
  ImitationInstance.state.function.update()
}


ImitationInstance.state.memo.canvasLayerFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.canvas.layer.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.canvas.layer, ImitationInstance.state.store.canvas.layer.length])

ImitationInstance.state.memo.canvasLayerFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.canvas.layer.findIndex(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.canvas.layer, ImitationInstance.state.store.canvas.layer.length])

ImitationInstance.state.memo.canvasLayerActionVisibilityTrackFindIndex = (_hash, dep = []) => React.useMemo(() => {
  const canvasLayerFind = ImitationInstance.state.store.canvas.layer.find(i => i._hash === _hash)
  if (canvasLayerFind === undefined) return -1
  if (canvasLayerFind !== undefined) {
    const canvasActionFalseFindIndex = canvasLayerFind.action.findIndex(i => i.visibility === false)
    if (canvasActionFalseFindIndex === -1) return canvasLayerFind.action.length
    if (canvasActionFalseFindIndex !== -1) return canvasActionFalseFindIndex
  }
}, [...dep, _hash, ImitationInstance.state.store.canvas.layer, ImitationInstance.state.store.canvas.layer.length])

ImitationInstance.state.memo.paintOptionFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.paint.option.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.paint.option, ImitationInstance.state.store.paint.option.length])

ImitationInstance.state.memo.paintOptionActionRunFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.paint.option.find(i => i._hash === _hash).paintAction()
}, [...dep, _hash, ImitationInstance.state.store.paint.option, ImitationInstance.state.store.paint.option.length])

ImitationInstance.state.memo.paintOptionRenderFindMap = (key, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.paint.option.reduce((t, i) => ({ ...t, [i[key]]: i.paintRender }), {})
}, [...dep, ImitationInstance.state.store.paint.option, ImitationInstance.state.store.paint.option.length])

ImitationInstance.state.memo.paintSettingFind = (paintOptionHash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.paint.setting.find(i => i.paintOptionHash === paintOptionHash)
}, [...dep, paintOptionHash, ImitationInstance.state.store.paint.setting, ImitationInstance.state.store.paint.setting.length])


export default ImitationInstance