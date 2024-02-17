import React from 'react'

import Imitation from './utils.imitation'

import { hash } from './utils.common'

import source from './utils.source'

Imitation.state['page.library'] = new Object()

Imitation.state['page.library'].size = undefined

Imitation.state['page.library'].load = false

Imitation.state['page.library'].source = []

Imitation.state['page.library'].render = []

Imitation.state['page.library'].setting = new Object()

Imitation.state['page.library'].setting.dialog = false

Imitation.state['page.library'].setting.tab = 0

Imitation.state['page.library'].view = new Object()

Imitation.state['page.library'].view.panorama = false

Imitation.state['page.library.function'] = new Object()

Imitation.state['page.library.function'].onLoad = () => {
  Imitation.state['page.library'].load = true
  Imitation.state['page.library'].source = source
  Imitation.state['page.library'].render = [{ _hash: hash(), hash: Imitation.state['page.library'].source[0]._hash, direction: 2 }]
  Imitation.dispatch()
}

Imitation.state['page.library.function'].onSwitch = (content) => {
  if (Imitation.state['page.library'].render[Imitation.state['page.library'].render.length - 1].hash === content.hash) return

  const last = Imitation.state['page.library'].render[Imitation.state['page.library'].render.length - 1]

  last.direction = content.direction

  const r = { _hash: hash(), hash: content.hash, direction: content.direction }

  Imitation.state['page.library'].render.push(r)

  Imitation.dispatch()
}

Imitation.state['page.library.memo'] = new Object()

Imitation.state['page.library.memo'].size = (dep = []) => React.useMemo(() => {
  var size = undefined

  const sizeInFullview = { width: Imitation.state['page.library'].size.width, height: Imitation.state['page.library'].size.height }
  const sizeInOverview = { width: Imitation.state['page.library'].size.overviewWidth, height: Imitation.state['page.library'].size.overviewHeight }

  if (Imitation.state['page.library'].view.panorama === true) size = sizeInFullview
  if (Imitation.state['page.library'].view.panorama === false) size = sizeInOverview

  return size
}, [...dep, Imitation.state['page.library'].size, Imitation.state['page.library'].view.panorama])

Imitation.state['page.library.memo'].sourceFind = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.library'].source.find(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.library'].source])

Imitation.state['page.library.memo'].sourceFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.library'].source.findIndex(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.library'].source])

Imitation.state['page.library.memo'].renderFind = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.library'].render.find(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.library'].render, Imitation.state['page.library'].render.length])

Imitation.state['page.library.memo'].renderFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.library'].render.findIndex(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.library'].render, Imitation.state['page.library'].render.length])

Imitation.state['page.library.memo'].renderFindIndexInLast = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.library'].render.findIndex(i => i._hash === _hash) === Imitation.state['page.library'].render.length - 1
}, [...dep, _hash, Imitation.state['page.library'].render, Imitation.state['page.library'].render.length])