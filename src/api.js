import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, ImitationPageLibrary, withBindComponentPure } from './Imitation'

import mockNavigationAccordionWindow from './mock.navigation.accordionWindow.json'
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
      source: structuredClone(mockCanvasSource),
      active: structuredClone(mockCanvasActive),
      accordionWindow: structuredClone(mockNavigationAccordionWindow)
    }
  }

  if (mode === 'localStorage') {
    const cache = window.localStorage.getItem('cache') ? JSON.parse(window.localStorage.getItem('cache')) : undefined

    if (cache === undefined) return {
      source: mockCanvasSourceEmpty,
      active: {},
      accordionWindow: []
    }

    if (cache !== undefined) return {
      source: cache.localStorageCanvasSource,
      active: cache.localStorageCanvasActive,
      accordionWindow: cache.localStorageNavigationAccordionWindow
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