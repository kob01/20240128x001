import NavigationMap from './View.Navigation.Map'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

ImitationNavigation.state.store.mode = 1

ImitationPageCanvas.register(
  () => {
    if (ImitationPageCanvas.state.store.load === true) {
      // ImitationNavigation.state.function.renderWindowsAppend('CanvasAction')
      // ImitationNavigation.state.function.renderWindowsAppend('CanvasControl')
      // ImitationNavigation.state.function.renderWindowsAppend('CanvasLayers')
      // ImitationNavigation.state.function.renderWindowsAppend('CanvasLayer', { canvasLayerHash: 'W847DNS8SRSBJ0D6' })
      // ImitationNavigation.state.function.renderWindowsAppend('CanvasPencils')
      // ImitationNavigation.state.function.renderWindowsAppend('CanvasView')
    }
  },
  state => [ImitationPageCanvas.state.store.load]
)

// ImitationNavigation.state.function.renderWindowsAppend('GlobalPage')


ImitationNavigation.state.function.update()