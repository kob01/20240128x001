import React from 'react'

import Imitation from 'imitation-imm'

import ImitationGlobal from './Imitation.Global'

import { hash, throttlePipeTime } from './utils.common'

import { apiNavigation } from './api'

const ImitationInstance = new Imitation()


ImitationInstance.state = { update: {}, store: {}, function: {}, memo: {} }

ImitationInstance.state.store = { ref: {} }


ImitationInstance.state.update.now = performance.now()

ImitationInstance.state.update.accordionWindow = performance.now()


ImitationInstance.state.store.load = false

ImitationInstance.state.store.mode = 0

ImitationInstance.state.store.accordionWindow = []

ImitationInstance.state.store.ref.accordionWindow = []


ImitationInstance.state.function.update = () => {
  ImitationInstance.state.update.now = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.updateAccordionWindow = () => {
  ImitationInstance.state.update.accordionWindow = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.onLoad = () => {
  ImitationGlobal.state.function.loadingUp()

  apiNavigation()
    .then(res => {
      if (res.accordionWindow.length > 0) {
        const process = (accordionWindow, end) => {
          ImitationInstance.state.store.accordionWindow.push(accordionWindow)
          ImitationInstance.state.store.ref.accordionWindow.push({ _hash: hash(), accordionWindowHash: accordionWindow._hash })
          ImitationInstance.state.function.update()
          if (end) ImitationGlobal.state.function.loadingDown()
        }

        const processThrottlePipeTime500 = throttlePipeTime(process, 200)

        res.accordionWindow.forEach((i, index) => processThrottlePipeTime500(i, index === res.accordionWindow.length - 1))
      }

      if (res.accordionWindow.length === 0) {
        ImitationGlobal.state.function.loadingDown()
      }
    })
}

ImitationInstance.state.function.onUnload = () => {
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.accordionWindowsAppend = (accordionWindowsHash, property) => {
  const accordionWindowHash = hash()

  ImitationInstance.state.store.accordionWindow.push({ _hash: accordionWindowHash, accordionWindowsHash: accordionWindowsHash, property: property, translateX: undefined, translateY: undefined, zIndex: undefined, expand: true, load: false, hide: false })
  ImitationInstance.state.store.ref.accordionWindow.push({ _hash: hash(), accordionWindowHash: accordionWindowHash })

  ImitationInstance.state.function.updateAccordionWindow()
}

ImitationInstance.state.function.accordionWindowsAppendThrottlePipeTime500 = throttlePipeTime(ImitationInstance.state.function.accordionWindowsAppend, 500)

ImitationInstance.state.function.accordionWindowsRemove = (_hash) => {
  ImitationInstance.state.store.accordionWindow = ImitationInstance.state.store.accordionWindow.filter(i => i._hash !== _hash)
  ImitationInstance.state.store.ref.accordionWindow = ImitationInstance.state.store.ref.accordionWindow.filter(i => i.accordionWindowHash !== _hash)

  ImitationInstance.state.function.updateAccordionWindow()
}

ImitationInstance.state.function.accordionWindowsActive = (_hash) => {
  const zIndex = ImitationInstance.state.store.accordionWindow.find(i => i._hash === _hash).zIndex

  ImitationInstance.state.store.accordionWindow.forEach(i => {
    if (i._hash === _hash) i.update = performance.now()
    if (i._hash !== _hash && i.zIndex > zIndex) i.update = performance.now()
    if (i._hash === _hash) i.zIndex = ImitationInstance.state.store.accordionWindow.length
    if (i._hash !== _hash && i.zIndex > zIndex) i.zIndex = i.zIndex - 1
  })

  ImitationInstance.state.function.updateAccordionWindow()
}

ImitationInstance.state.function.accordionWindowsFixTranslate = (_hash) => {
  const accordionWindowsFind = ImitationInstance.state.store.accordionWindow.find(i => i._hash === _hash)
  const accordionWindowsRefFind = ImitationInstance.state.store.ref.accordionWindow.find(i => i.accordionWindowHash === _hash)

  if (accordionWindowsFind === undefined) return

  accordionWindowsFind.translateX = Math.max(accordionWindowsFind.translateX, (accordionWindowsRefFind.accordionRef.offsetWidth - ImitationGlobal.state.store.rect.width + 32) / 2)
  accordionWindowsFind.translateX = Math.min(accordionWindowsFind.translateX, (ImitationGlobal.state.store.rect.width - accordionWindowsRefFind.accordionRef.offsetWidth - 32) / 2)
  accordionWindowsFind.translateY = Math.max(accordionWindowsFind.translateY, (accordionWindowsRefFind.accordionRef.offsetHeight - ImitationGlobal.state.store.rect.height + 32) / 2)
  accordionWindowsFind.translateY = Math.min(accordionWindowsFind.translateY, (ImitationGlobal.state.store.rect.height - accordionWindowsRefFind.accordionRef.offsetHeight - 32) / 2)

  ImitationInstance.state.function.updateAccordionWindow()
}

ImitationInstance.state.memo.accordionWindowsFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.accordionWindow.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.accordionWindow, ImitationInstance.state.store.accordionWindow.length])

ImitationInstance.state.memo.accordionWindowsRefFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.ref.accordionWindow.find(i => i.accordionWindowHash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.ref.accordionWindow, ImitationInstance.state.store.ref.accordionWindow.length])

ImitationInstance.state.memo.accordionWindowsFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.accordionWindow.findIndex(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.accordionWindow, ImitationInstance.state.store.accordionWindow.length])


export default ImitationInstance