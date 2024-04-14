import React from 'react'

import Imitation from 'imitation-imm'

import ImitationGlobal from './Imitation.Global'

import { hash, throttleLastRIC } from './utils.common'

const ImitationInstance = new Imitation()

ImitationInstance.state = { update: {}, store: {}, function: {}, memo: {} }

ImitationInstance.state.update.now = performance.now()

ImitationInstance.state.update.renderWindow = performance.now()


ImitationInstance.state.store.mode = 0

ImitationInstance.state.store.renderWindow = []


ImitationInstance.state.function.update = () => {
  ImitationInstance.state.update.now = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.updateRenderWindow = () => {
  ImitationInstance.state.update.renderWindow = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.renderWindowsAppend = (renderWindowsHash, property) => {
  ImitationInstance.state.store.renderWindow.push({ _hash: hash(), renderWindowsHash: renderWindowsHash, property: property, update: performance.now(), load: false, hide: false })

  ImitationInstance.state.function.updateRenderWindow()
}

ImitationInstance.state.function.renderWindowsRemove = (_hash) => {
  const renderWindowsFind = ImitationInstance.state.store.renderWindow.find(i => i._hash === _hash)

  ImitationInstance.state.store.renderWindow = ImitationInstance.state.store.renderWindow.filter(i => i._hash !== _hash)
  renderWindowsFind.update = performance.now()

  ImitationInstance.state.function.updateRenderWindow()
}

ImitationInstance.state.function.renderWindowsActive = (_hash) => {
  const zIndex = ImitationInstance.state.store.renderWindow.find(i => i._hash === _hash).zIndex

  ImitationInstance.state.store.renderWindow.forEach(i => {
    if (i._hash === _hash) i.update = performance.now()
    if (i._hash !== _hash && i.zIndex > zIndex) i.update = performance.now()
    if (i._hash === _hash) i.zIndex = ImitationInstance.state.store.renderWindow.length
    if (i._hash !== _hash && i.zIndex > zIndex) i.zIndex = i.zIndex - 1
  })

  ImitationInstance.state.function.updateRenderWindow()
}

ImitationInstance.state.function.renderWindowsFixTranslate = (_hash) => {
  const renderWindowsFind = ImitationInstance.state.store.renderWindow.find(i => i._hash === _hash)

  if (renderWindowsFind === undefined) return

  renderWindowsFind.translateX = Math.max(renderWindowsFind.translateX, (renderWindowsFind.accordionRef.offsetWidth - ImitationGlobal.state.store.rect.width + 32) / 2)
  renderWindowsFind.translateX = Math.min(renderWindowsFind.translateX, (ImitationGlobal.state.store.rect.width - renderWindowsFind.accordionRef.offsetWidth - 32) / 2)
  renderWindowsFind.translateY = Math.max(renderWindowsFind.translateY, (renderWindowsFind.accordionRef.offsetHeight - ImitationGlobal.state.store.rect.height + 32) / 2)
  renderWindowsFind.translateY = Math.min(renderWindowsFind.translateY, (ImitationGlobal.state.store.rect.height - renderWindowsFind.accordionRef.offsetHeight - 32) / 2)

  renderWindowsFind.update = performance.now()

  ImitationInstance.state.function.updateRenderWindow()
}

ImitationInstance.state.function.renderWindowsFixTranslateThrottleLastRIC = throttleLastRIC(ImitationInstance.state.function.renderWindowsFixTranslate)


ImitationInstance.state.memo.renderWindowsFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.renderWindow.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.renderWindow, ImitationInstance.state.store.renderWindow.length])

ImitationInstance.state.memo.renderWindowsFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.renderWindow.findIndex(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.renderWindow, ImitationInstance.state.store.renderWindow.length])


export default ImitationInstance