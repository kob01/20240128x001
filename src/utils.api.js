import { ImitationGlobal, ImitationPageCanvas, ImitationPageLibrary, withBindComponentPure } from './Imitation'

import { localStorageCache } from './utils.const'

import mockCanvasSource from './mock.canvas.source.json'
import mockCanvasSourceEmpty from './mock.canvas.source.empty.json'
import mockCanvasActive from './mock.canvas.active.json'

var mode = 'localStorage'

if (new URLSearchParams(new URL(window.location.href).search).get('mock')) {
  mode = 'mock'
}

const load = () => {
  if (mode === 'mock') {
    return {
      status: 'mock',
      source: structuredClone(mockCanvasSource),
      active: structuredClone(mockCanvasActive),
    }
  }

  if (mode === 'localStorage') {
    const cache = window.localStorage.getItem(localStorageCache) ? JSON.parse(window.localStorage.getItem(localStorageCache)) : undefined

    if (cache === undefined) return {
      status: 'empty',

    }

    if (cache !== undefined) return {
      status: 'filled',
      source: cache.localStorageCanvasSource,
      active: cache.localStorageCanvasActive,
    }
  }
}

const apiNavigation = () => {
  return new Promise(r => r(load()))
}

const apiCanvas = () => {
  return new Promise(r => r(load()))
}

export { apiNavigation, apiCanvas }