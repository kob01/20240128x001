import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, ImitationPageLibrary, withBindComponentPure } from './Imitation'

import mockNavigationAccordionWindow from './mock.navigation.accordionWindow.json'
import mockCanvasSource from './mock.canvas.source.json'
import mockCanvasActive from './mock.canvas.active.json'

const apiLocalStorage = () => {
  return new Promise(r => {
    const cache = window.localStorage.getItem('cache') ? JSON.parse(window.localStorage.getItem('cache')) : undefined

    if (cache) {
      ImitationPageCanvas.state.function.onInit({ source: cache.localStorageCanvasSource, active: cache.localStorageCanvasActive })
      ImitationNavigation.state.function.onInit({ accordionWindow: cache.localStorageNavigationAccordionWindow })
    }

    r()
  })
}

const apiMock = () => {
  return new Promise(r => {
    ImitationPageCanvas.state.function.onInit({ source: structuredClone(mockCanvasSource), active: structuredClone(mockCanvasActive) })
    ImitationNavigation.state.function.onInit({ accordionWindow: structuredClone(mockNavigationAccordionWindow) })
    
    r()
  })
}

export { apiLocalStorage, apiMock }