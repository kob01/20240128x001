import React from 'react'

import Imitation from './utils.imitation'
import { hash } from './utils.common'

import Paint from './View.Config.Paint'

import a from './a.json'

const c = [
  { _hash: hash(), width: 1000, height: 1000, translateX: 0, translateY: 0, scale: 0.5, pixel: a },
  { _hash: hash(), width: 500, height: 500, translateX: 0, translateY: 0, scale: 0.5, pixel: a },
]

Imitation.state['page.canvas'] = new Object()

Imitation.state['page.canvas'].load = false

Imitation.state['page.canvas'].size = undefined

// Imitation.state['page.canvas'].source = { _hash: 1, canvas: c }

Imitation.state['page.canvas'].canvas = []

Imitation.state['page.canvas'].control = { _hash: hash(), hash: undefined }

Imitation.state['page.canvas'].setting = new Object()

Imitation.state['page.canvas'].setting.dialog = false

Imitation.state['page.canvas'].setting.tab = 0

Imitation.state['page.canvas'].paint = new Object()

Imitation.state['page.canvas'].paint.current = Paint[0]._hash

Imitation.state['page.canvas'].paint.setting = new Object()

Imitation.state['page.canvas'].paint.setting = JSON.parse(JSON.stringify(Paint[0].default))

Imitation.state['page.canvas'].view = new Object()

Imitation.state['page.canvas'].view.scaleLayer = false

Imitation.state['page.canvas'].view.scaleAll = false

Imitation.state['page.canvas'].view.translateLayer = false

Imitation.state['page.canvas'].view.translateAll = false

Imitation.state['page.canvas'].view.perspective = false

Imitation.state['page.canvas'].view.perspectiveGap = 100

Imitation.state['page.canvas'].view.perspectiveRotateX = 30

Imitation.state['page.canvas'].view.perspectiveRotateY = 60

Imitation.state['page.canvas'].view.panorama = true

Imitation.state['page.canvas'].layer = new Object()

Imitation.state['page.canvas'].layer.width = 1000

Imitation.state['page.canvas'].layer.height = 1000

Imitation.state['page.canvas'].opacity = false

Imitation.state['page.canvas.ref'] = new Object()

Imitation.state['page.canvas.ref'].canvas = []

Imitation.state['page.canvas.ref'].paint = Paint

Imitation.state['page.canvas.function'] = new Object()

Imitation.state['page.canvas.function'].onLoad = () => {
  const canvas = localStorage.getItem(Imitation.state.version + '@canvas') ? JSON.parse(localStorage.getItem(Imitation.state.version + '@canvas')) : c

  Imitation.state['page.canvas'].load = true
  Imitation.state['page.canvas'].canvas = canvas
  Imitation.state['page.canvas'].control = { _hash: hash(), hash: Imitation.state['page.canvas'].canvas[0]._hash }
  Imitation.state['page.canvas.ref'].canvas = Imitation.state['page.canvas'].canvas.map(i => ({ _hash: i._hash }))
  Imitation.dispatch()
}

Imitation.state['page.canvas.function'].onClear = () => {
  localStorage.removeItem(Imitation.state.version + '@canvas')
  Imitation.state['page.canvas.function'].onLoad()
}

Imitation.state['page.canvas.function'].onSave = () => {
  const r = []

  Imitation.state['page.canvas'].canvas.forEach(i => {
    const canvasRef = Imitation.state['page.canvas.ref'].canvas.find(i_ => i_._hash === i._hash)

    const imageData = canvasRef.context.getImageData(0, 0, canvasRef.canvas.width, canvasRef.canvas.height)

    const pixelData = imageData.data

    var pixelArray = []

    pixelData.forEach((i, index) => {
      const arrayIndex = Math.floor(index / 4)

      if (pixelArray[arrayIndex] === undefined) {
        const x = arrayIndex % canvasRef.canvas.width
        const y = Math.floor(arrayIndex / canvasRef.canvas.width)
        pixelArray[arrayIndex] = { x, y, color: [] }
      }

      if (pixelArray[arrayIndex] !== undefined) pixelArray[arrayIndex].color.push(i)

      if (pixelArray[arrayIndex].color[3]) pixelArray[arrayIndex].color[3] = pixelArray[arrayIndex].color[3] / 255
    })

    pixelArray = pixelArray.filter(i => i.color[0] !== 0 || i.color[1] !== 0 || i.color[2] !== 0 || i.color[3] !== 0)

    r.push({ ...i, pixel: pixelArray })
  })

  localStorage.setItem(Imitation.state.version + '@canvas', JSON.stringify(r))

  // navigator.clipboard.writeText(JSON.stringify(pixelArray))
}

Imitation.state['page.canvas.function'].onCreateLayer = (content) => {
  const i = { _hash: hash(), translateX: 0, translateY: 0, scale: 0.5, pixel: [], ...content }

  Imitation.state['page.canvas'].canvas.push(i)
  Imitation.state['page.canvas.ref'].canvas.push({ _hash: i._hash })

  Imitation.dispatch()
}

Imitation.state['page.canvas.function'].onRemoveLayer = (_hash) => {
  if (Imitation.state['page.canvas'].canvas.length === 1) return

  Imitation.state['page.canvas'].canvas = Imitation.state['page.canvas'].canvas.filter(i => i._hash !== _hash)
  Imitation.state['page.canvas.ref'].canvas = Imitation.state['page.canvas.ref'].canvas.filter(i => i._hash !== _hash)

  if (Imitation.state['page.canvas'].control.hash === _hash) Imitation.state['page.canvas'].control.hash = Imitation.state['page.canvas'].canvas[0]._hash

  Imitation.dispatch()
}

Imitation.state['page.canvas.function'].onSwitchLayer = (content) => {
  if (Imitation.state['page.canvas'].control.hash === content.hash) return

  Imitation.state['page.canvas'].control._hash = hash()
  Imitation.state['page.canvas'].control.hash = content.hash

  Imitation.dispatch()
}

Imitation.state['page.canvas.function'].onTranslateFix = () => {
  const max = [0, 0, 0, 0]

  Imitation.state['page.canvas'].canvas.forEach(i => {
    max[0] = Math.max(max[0], i.width / 2 - i.translateX)
    max[1] = Math.max(max[1], i.width / 2 + i.translateX)
    max[2] = Math.max(max[2], i.height / 2 - i.translateY)
    max[3] = Math.max(max[3], i.height / 2 + i.translateY)
  })

  Imitation.state['page.canvas'].canvas.forEach(i => {
    i.translateX = i.translateX + (max[0] - max[1]) / 2
    i.translateY = i.translateY + (max[2] - max[3]) / 2
  })

  Imitation.dispatch()
}

Imitation.state['page.canvas.function'].onSwitchPaint = (_hash) => {
  const find = Imitation.state['page.canvas.ref'].paint.find(i => i._hash === _hash)
  Imitation.state['page.canvas'].paint.current = find._hash
  Imitation.state['page.canvas'].paint.setting = JSON.parse(JSON.stringify(find.default))
  Imitation.dispatch()
}

Imitation.state['page.canvas.memo'] = new Object()

Imitation.state['page.canvas.memo'].size = (dep = []) => React.useMemo(() => {
  var size = undefined

  const sizeInFullview = { width: Imitation.state['page.canvas'].size.width, height: Imitation.state['page.canvas'].size.height }
  const sizeInOverview = { width: Imitation.state['page.canvas'].size.overviewWidth, height: Imitation.state['page.canvas'].size.overviewHeight }

  if (Imitation.state['page.canvas'].view.panorama === true) size = sizeInFullview
  if (Imitation.state['page.canvas'].view.panorama === false) size = sizeInOverview

  return size
}, [...dep, Imitation.state['page.canvas'].size, Imitation.state['page.canvas'].view.panorama])

Imitation.state['page.canvas.memo'].canvasFind = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.canvas'].canvas.find(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.canvas'].canvas])

Imitation.state['page.canvas.memo'].canvasFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.canvas'].canvas.findIndex(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.canvas'].canvas])

Imitation.state['page.canvas.memo'].canvasRefFind = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.canvas.ref'].canvas.find(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.canvas.ref'].canvas])

Imitation.state['page.canvas.memo'].canvasRefFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.canvas.ref'].canvas.findIndex(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.canvas.ref'].canvas])

Imitation.state['page.canvas.memo'].paintFind = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.canvas.ref'].paint.find(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.canvas.ref'].paint])

Imitation.state['page.canvas.memo'].paintSettingFind = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.canvas.ref'].paint.find(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.canvas.ref'].paint])