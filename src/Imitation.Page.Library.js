import React from 'react'

import Imitation from 'imitation-imm'

import { hash } from './utils.common'

import mockSource from './mock.source'

const ImitationInstance = new Imitation()

ImitationInstance.state = { update: {}, store: {}, function: {}, memo: {} }

ImitationInstance.state.store = {  view: {} }


ImitationInstance.state.update.now = performance.now()


ImitationInstance.state.store.load = false

ImitationInstance.state.store.rect = undefined

ImitationInstance.state.store.recting = false

ImitationInstance.state.store.source = []

ImitationInstance.state.store.render = []

ImitationInstance.state.store.view.panorama = false


ImitationInstance.state.function.update = () => {
  ImitationInstance.state.update.now = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.onLoad = () => {
  ImitationInstance.state.store.load = true
  ImitationInstance.state.store.rect = undefined
  ImitationInstance.state.store.source = mockSource
  ImitationInstance.state.store.render = [{ _hash: hash(), hashSource: ImitationInstance.state.store.source[0]._hash, direction: 2 }]
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onUnload = () => {
  ImitationInstance.state.store.load = false
  ImitationInstance.state.store.rect = undefined
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onSwitch = (content) => {
  if (ImitationInstance.state.store.render[ImitationInstance.state.store.render.length - 1].hashSource === content.hashSource) return

  const last = ImitationInstance.state.store.render[ImitationInstance.state.store.render.length - 1]
  last.direction = content.direction
  const r = { _hash: hash(), hashSource: content.hashSource, direction: content.direction }

  ImitationInstance.state.store.render.push(r)
  ImitationInstance.state.function.update()
}


ImitationInstance.state.memo = new Object()

ImitationInstance.state.memo.sourceFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.source.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.source])

ImitationInstance.state.memo.sourceFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.source.findIndex(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.source])

ImitationInstance.state.memo.renderFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.render.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.render, ImitationInstance.state.store.render.length])

ImitationInstance.state.memo.renderFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.render.findIndex(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.render, ImitationInstance.state.store.render.length])

ImitationInstance.state.memo.renderFindIndexInLast = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.render.findIndex(i => i._hash === _hash) === ImitationInstance.state.store.render.length - 1
}, [...dep, _hash, ImitationInstance.state.store.render, ImitationInstance.state.store.render.length])


export default ImitationInstance