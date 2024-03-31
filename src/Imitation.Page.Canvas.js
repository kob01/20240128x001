import React from 'react'

import Imitation from 'imitation-imm'

import ImitationGlobal from './Imitation.Global'

import Paint from './View.Config.Paint'

import { hash, debounce, throttleLastRIC } from './utils.common'

import mockSource from './mock.source'

const ImitationInstance = new Imitation()

ImitationInstance.state = { update: {}, store: {}, function: {}, memo: {} }

ImitationInstance.state.store = { canvas: {}, paint: {}, navigation: {}, view: {}, control: {} }

ImitationInstance.state.store.navigation = { basic: {}, content: {} }

ImitationInstance.state.store.navigation.basic = { expand: {} }

ImitationInstance.state.store.navigation.layer = { expand: {} }


ImitationInstance.state.update.now = performance.now()

ImitationInstance.state.update.canvasResize = performance.now()

ImitationInstance.state.update.canvasOffscreenRender = performance.now()

ImitationInstance.state.update.canvasOnlinescreenRender = performance.now()


ImitationInstance.state.store.load = false

ImitationInstance.state.store.rect = undefined

ImitationInstance.state.store.recting = false

ImitationInstance.state.store.dpr = 2

ImitationInstance.state.store.source = undefined

ImitationInstance.state.store.canvas.information = undefined

ImitationInstance.state.store.canvas.control = undefined

ImitationInstance.state.store.canvas.canvasRef = undefined

ImitationInstance.state.store.canvas.contextRef = undefined

ImitationInstance.state.store.paint.information = undefined

ImitationInstance.state.store.paint.control = undefined

ImitationInstance.state.store.paint.setting = undefined

ImitationInstance.state.store.paint.filter = ['2d']

ImitationInstance.state.store.navigation.basic.open = false

ImitationInstance.state.store.navigation.basic.expand.view = false

ImitationInstance.state.store.navigation.basic.expand.control = false

ImitationInstance.state.store.navigation.basic.expand.paint = false

ImitationInstance.state.store.navigation.basic.expand.layer = false

ImitationInstance.state.store.navigation.basic.expand.action = false

ImitationInstance.state.store.navigation.layer.open = false

ImitationInstance.state.store.navigation.layer.expand.setting = false

ImitationInstance.state.store.navigation.layer.expand.action = false

ImitationInstance.state.store.view.scale = 1

ImitationInstance.state.store.view.translateX = 0

ImitationInstance.state.store.view.translateY = 0

ImitationInstance.state.store.control.paint = true

ImitationInstance.state.store.control.move = false


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
  ImitationInstance.state.store.canvas.information = JSON.parse(JSON.stringify(mockSource[0].canvas))

  ImitationInstance.state.store.canvas.information.forEach(i => {
    Object.assign(i, {
      offscreenPreviousActionCanvasRef: undefined,
      offscreenPreviousActionContextRef: undefined,
      offscreenCanvasRef: undefined,
      offscreenContextRef: undefined,
      previousActionContextShouldUpdate: false,
      previousContextShouldUpdate: false,
      contextShouldUpdate: false,
    })
  })

  ImitationInstance.state.function.onCanvasLayerCreate()
  ImitationInstance.state.function.onCanvasLayerCreate()

  ImitationInstance.state.store.canvas.control = ImitationInstance.state.store.canvas.information[0]._hash
  ImitationInstance.state.store.paint.information = Paint
  ImitationInstance.state.store.paint.filter = [ImitationInstance.state.store.paint.information[0].type]
  ImitationInstance.state.store.paint.control = ImitationInstance.state.store.paint.information[0]._hash
  ImitationInstance.state.store.paint.setting = JSON.parse(JSON.stringify(ImitationInstance.state.store.paint.information[0].settingDefault))

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onUnload = () => {
  ImitationInstance.state.store.load = false
  ImitationInstance.state.store.rect = undefined

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onClear = () => {
  ImitationInstance.state.store.canvas.information = JSON.parse(JSON.stringify(mockSource[0].canvas))

  ImitationInstance.state.store.canvas.information.forEach(i => {
    Object.assign(i, {
      offscreenPreviousActionCanvasRef: undefined,
      offscreenPreviousActionContextRef: undefined,
      offscreenCanvasRef: undefined,
      offscreenContextRef: undefined,
      previousActionContextShouldUpdate: false,
      previousContextShouldUpdate: false,
      contextShouldUpdate: true,
    })
  })

  ImitationInstance.state.store.canvas.control = ImitationInstance.state.store.canvas.information[0]._hash

  ImitationInstance.state.function.updateCanvasResize()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onSave = (type) => {
  if (type === 0) {
    const r = JSON.parse(JSON.stringify(ImitationInstance.state.store.source))

    const r_ = JSON.parse(JSON.stringify(ImitationInstance.state.store.canvas.information))

    r_.forEach(i => {
      delete i.offscreenPreviousActionCanvasRef
      delete i.offscreenPreviousActionContextRef
      delete i.offscreenCanvasRef
      delete i.offscreenContextRef
      delete i.previousActionContextShouldUpdate
      delete i.previousContextShouldUpdate
      delete i.contextShouldUpdate
    })

    r.canvas = r_

    navigator.clipboard.writeText(JSON.stringify(r))
  }
  if (type === 1) {
    const r = JSON.parse(JSON.stringify(ImitationInstance.state.store.canvas.information))

    r.forEach(i => {
      delete i.offscreenPreviousActionCanvasRef
      delete i.offscreenPreviousActionContextRef
      delete i.offscreenCanvasRef
      delete i.offscreenContextRef
      delete i.previousActionContextShouldUpdate
      delete i.previousContextShouldUpdate
      delete i.contextShouldUpdate
    })

    navigator.clipboard.writeText(JSON.stringify(r))
  }
}

ImitationInstance.state.function.onNavigationExpandChange = (type, key, value) => {
  ImitationInstance.state.store.navigation[type].expand[key] = value

  if (type === 'basic' && key === 'layer' && value === true) {
    if (ImitationGlobal.state.store.navigation.mode === 0) ImitationInstance.state.store.navigation.layer.open = true
    ImitationInstance.state.store.navigation.layer.expand.setting = value
    ImitationInstance.state.store.navigation.layer.expand.action = value
  }

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onViewScaleChange = (value) => {
  ImitationInstance.state.store.view.scale = value

  ImitationInstance.state.store.canvas.information.forEach(i => i.contextShouldUpdate = true)

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onViewScaleChangeThrottleLastRIC = throttleLastRIC(ImitationInstance.state.function.onViewScaleChange)

ImitationInstance.state.function.onViewTranslateXChange = (value) => {
  ImitationInstance.state.store.view.translateX = value

  ImitationInstance.state.store.canvas.information.forEach(i => i.contextShouldUpdate = true)

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onViewTranslateXChangeThrottleLastRIC = throttleLastRIC(ImitationInstance.state.function.onViewTranslateXChange)

ImitationInstance.state.function.onViewTranslateYChange = (value) => {
  ImitationInstance.state.store.view.translateY = value

  ImitationInstance.state.store.canvas.information.forEach(i => i.contextShouldUpdate = true)

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onViewTranslateYChangeThrottleLastRIC = throttleLastRIC(ImitationInstance.state.function.onViewTranslateYChange)

ImitationInstance.state.function.onControlChange = (key, value) => {
  ImitationInstance.state.store.control[key] = value

  if (key === 'paint') {
    ImitationInstance.state.store.control.move = !value
  }

  if (key === 'move') {
    ImitationInstance.state.store.control.paint = !value
  }

  ImitationInstance.state.function.update()
}

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
    previousContextShouldUpdate: false,
    contextShouldUpdate: false,
  }

  ImitationInstance.state.store.canvas.information.push(i)

  ImitationInstance.state.function.updateCanvasResize()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerRemove = (_hash) => {
  ImitationInstance.state.store.canvas.information = ImitationInstance.state.store.canvas.information.filter(i => i._hash !== _hash)

  ImitationInstance.state.store.canvas.control = undefined

  ImitationInstance.state.function.updateCanvasOnlinescreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerMove = (_hash, type) => {
  const canvasFindIndex = ImitationInstance.state.store.canvas.information.findIndex(i => i._hash === _hash)

  if (type === 0 && canvasFindIndex !== 0) {
    const [a, b] = [ImitationInstance.state.store.canvas.information[canvasFindIndex - 1], ImitationInstance.state.store.canvas.information[canvasFindIndex]]
    ImitationInstance.state.store.canvas.information[canvasFindIndex - 1] = b
    ImitationInstance.state.store.canvas.information[canvasFindIndex] = a
  }

  if (type === 1 && canvasFindIndex !== ImitationInstance.state.store.canvas.information.length - 1) {
    const [a, b] = [ImitationInstance.state.store.canvas.information[canvasFindIndex], ImitationInstance.state.store.canvas.information[canvasFindIndex + 1]]
    ImitationInstance.state.store.canvas.information[canvasFindIndex] = b
    ImitationInstance.state.store.canvas.information[canvasFindIndex + 1] = a
  }

  ImitationInstance.state.function.updateCanvasOnlinescreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerVisibility = (_hash, value) => {
  const canvasFind = ImitationInstance.state.store.canvas.information.find(i => i._hash === _hash)

  canvasFind.visibility = value

  if (value === true) canvasFind.contextShouldUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerSwitch = (content) => {
  if (ImitationInstance.state.store.control.hash === content.hash) return

  ImitationInstance.state.store.control._hash = hash()
  ImitationInstance.state.store.control.hash = content.hash

  if (ImitationGlobal.state.store.navigation.mode === 0) ImitationInstance.state.store.navigation.layer.open = true
  ImitationInstance.state.store.navigation.layer.expand.setting = value
  ImitationInstance.state.store.navigation.layer.expand.action = value

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerActionVisibilityTracks = (_hash, index) => {
  const canvasFind = ImitationInstance.state.store.canvas.information.find(i => i._hash === _hash)

  canvasFind.action.forEach((i, index_) => {
    if (index_ === index - 1) i.visibility = true
    if (index_ < index - 1) i.visibility = true
    if (index_ > index - 1) i.visibility = false
  })

  canvasFind.contextShouldUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onCanvasLayerActionVisibilityTrack = (_hash, index) => {
  const canvasFind = ImitationInstance.state.store.canvas.information.find(i => i._hash === _hash)

  canvasFind.action[index].visibility = !canvasFind.action[index].visibility

  canvasFind.contextShouldUpdate = true

  ImitationInstance.state.function.updateCanvasOffscreenRender()
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onPaintSwitch = (_hash) => {
  const find = ImitationInstance.state.store.paint.information.find(i => i._hash === _hash)
  ImitationInstance.state.store.paint.control = find._hash
  ImitationInstance.state.store.paint.setting = JSON.parse(JSON.stringify(find.settingDefault))
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onPaintFilterTypeSwitch = (value) => {
  const find = ImitationInstance.state.store.paint.information.find(i => i.type === type)
  ImitationInstance.state.store.paint.control = find._hash
  ImitationInstance.state.store.paint.setting = JSON.parse(JSON.stringify(find.settingDefault))
  ImitationInstance.state.store.paint.filter[1] = value
  ImitationInstance.state.function.update()
}


ImitationInstance.state.memo.canvasFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.canvas.information.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.canvas.information])

ImitationInstance.state.memo.canvasFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.canvas.information.findIndex(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.canvas.information])

ImitationInstance.state.memo.canvasActionVisibilityTrackFindIndex = (_hash, dep = []) => React.useMemo(() => {
  const canvasFind = ImitationInstance.state.store.canvas.information.find(i => i._hash === _hash)
  if (canvasFind === undefined) return -1
  if (canvasFind !== undefined) {
    const canvasActionFalseFindIndex = canvasFind.action.findIndex(i => i.visibility === false)
    if (canvasActionFalseFindIndex === -1) return canvasFind.action.length
    if (canvasActionFalseFindIndex !== -1) return canvasActionFalseFindIndex
  }
}, [...dep, _hash, ImitationInstance.state.store.canvas.information])

ImitationInstance.state.memo.paintFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.paint.information.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.paint.information])

ImitationInstance.state.memo.paintActionRunFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.paint.information.find(i => i._hash === _hash).paintAction()
}, [...dep, _hash, ImitationInstance.state.store.paint.information])

ImitationInstance.state.memo.paintRenderFindMap = (key, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.paint.information.reduce((t, i) => ({ ...t, [i[key]]: i.paintRender }), {})
}, [...dep, ImitationInstance.state.store.paint.information])

ImitationInstance.state.memo.paintOffsetFindMap = (key, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.paint.information.reduce((t, i) => ({ ...t, [i[key]]: i.paintOffset }), {})
}, [...dep, ImitationInstance.state.store.paint.information])


export default ImitationInstance