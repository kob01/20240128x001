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

ImitationInstance.state.store.renderImage = []

ImitationInstance.state.store.view.panorama = false


ImitationInstance.state.function.update = () => {
  ImitationInstance.state.update.now = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.onLoad = () => {
  ImitationInstance.state.store.load = true
  ImitationInstance.state.store.rect = undefined
  ImitationInstance.state.store.source = mockSource
  ImitationInstance.state.store.renderImage = [{ _hash: hash(), sourceHash: ImitationInstance.state.store.source[0]._hash, direction: 2 }]
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onUnload = () => {
  ImitationInstance.state.store.load = false
  ImitationInstance.state.store.rect = undefined
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onSwitch = (content) => {
  if (ImitationInstance.state.store.renderImage[ImitationInstance.state.store.renderImage.length - 1].sourceHash === content.sourceHash) return

  const last = ImitationInstance.state.store.renderImage[ImitationInstance.state.store.renderImage.length - 1]
  last.direction = content.direction
  const r = { _hash: hash(), sourceHash: content.sourceHash, direction: content.direction }

  ImitationInstance.state.store.renderImage.push(r)
  ImitationInstance.state.function.update()
}


ImitationInstance.state.memo = new Object()

ImitationInstance.state.memo.sourceFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.source.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.source])

ImitationInstance.state.memo.sourceFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.source.findIndex(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.source])

ImitationInstance.state.memo.renderImageFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.renderImage.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.renderImage, ImitationInstance.state.store.renderImage.length])

ImitationInstance.state.memo.renderImageFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.renderImage.findIndex(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.renderImage, ImitationInstance.state.store.renderImage.length])

ImitationInstance.state.memo.renderImageFindIndexInLast = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.renderImage.findIndex(i => i._hash === _hash) === ImitationInstance.state.store.renderImage.length - 1
}, [...dep, _hash, ImitationInstance.state.store.renderImage, ImitationInstance.state.store.renderImage.length])


export default ImitationInstance