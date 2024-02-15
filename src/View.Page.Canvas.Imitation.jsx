import React from 'react'

import Imitation from './utils.imitation'
import { hash, rgba } from './utils.common'
import source from './utils.source'
import paint from './utils.paint'

import a from './a.json'

const c = [
  { _hash: hash(), width: 1000, height: 1000, translateX: 0, translateY: 0, pixel: a },
  { _hash: hash(), width: 500, height: 500, translateX: 0, translateY: 0, pixel: a },
]

Imitation.state['page.canvas'] = new Object()

Imitation.state['page.canvas'].size = undefined

Imitation.state['page.canvas'].source = { _hash: 1, canvas: c }

Imitation.state['page.canvas'].canvas = c

Imitation.state['page.canvas'].control = { hash: c[0]._hash }

Imitation.state['page.canvas'].setting = new Object()

Imitation.state['page.canvas'].setting.dialog = false

Imitation.state['page.canvas'].setting.tab = 0

Imitation.state['page.canvas'].paint = new Object()

Imitation.state['page.canvas'].paint.options = paint

Imitation.state['page.canvas'].paint.current = paint[0]._hash

Imitation.state['page.canvas'].paint.setting = new Object()

Imitation.state['page.canvas'].paint.setting.color = '#000000'

Imitation.state['page.canvas'].paint.setting.alpha = 1

Imitation.state['page.canvas'].view = new Object()

Imitation.state['page.canvas'].view.dpr = 2

Imitation.state['page.canvas'].view.translate = false

Imitation.state['page.canvas'].view.translateAll = false

Imitation.state['page.canvas'].view.perspective = false

Imitation.state['page.canvas'].view.perspectiveGap = 50

Imitation.state['page.canvas'].view.perspectiveRotateX = 30

Imitation.state['page.canvas'].view.perspectiveRotateY = 60

Imitation.state['page.canvas'].fullview = false

Imitation.state['page.canvas'].opacity = false

Imitation.state['page.canvas.ref'] = new Object()

Imitation.state['page.canvas.ref'].canvas = Imitation.state['page.canvas'].canvas.map(i => ({ _hash: i._hash }))

Imitation.state['page.canvas.function'] = new Object()

Imitation.state['page.canvas.function'].onSave = () => {
  const canvasRef = Imitation.state['page.canvas.ref'].canvas.find(i => i._hash === Imitation.state['page.canvas'].control.hash)

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

  navigator.clipboard.writeText(JSON.stringify(pixelArray))
}

Imitation.state['page.canvas.function'].onSwitch = (content) => {
  if (Imitation.state['page.canvas'].control.hash === content.hash) return

  Imitation.state['page.canvas'].control.hash = content.hash

  Imitation.dispatch()
}

Imitation.state['page.canvas.memo'] = new Object()

Imitation.state['page.canvas.memo'].size = (dep = []) => React.useMemo(() => {
  var size = undefined

  const sizeInFullview = { width: Imitation.state['page.canvas'].size.width, height: Imitation.state['page.canvas'].size.height }
  const sizeInOverview = { width: Imitation.state['page.canvas'].size.overviewWidth, height: Imitation.state['page.canvas'].size.overviewHeight }

  if (Imitation.state['page.canvas'].fullview === true) size = sizeInFullview
  if (Imitation.state['page.canvas'].fullview === false) size = sizeInOverview

  return size
}, [...dep, Imitation.state['page.canvas'].size, Imitation.state['page.canvas'].fullview])

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

Imitation.state['page.canvas.memo'].paintCurrentFind = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.canvas'].paint.options.find(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.canvas'].paint.options])
