import { withBindComponentPure, useBindComponentPure } from 'imitation-imm'

import ImitationGlobal from './Imitation.Global'
import ImitationPageCanvas from './Imitation.Page.Canvas'
import ImitationPageLibrary from './Imitation.Page.Library'

if (window.innerWidth >= 1200) {
  ImitationGlobal.state.store.navigation.mode = 0

  ImitationPageCanvas.state.store.navigation.basic.open = true
  ImitationPageCanvas.state.store.navigation.layer.open = true

  ImitationPageLibrary.state.store.navigation.basic.open = true
  ImitationPageLibrary.state.store.navigation.content.open = true
}

if (window.innerWidth < 1200) {
  ImitationGlobal.state.store.navigation.mode = 1

  ImitationPageCanvas.state.store.navigation.basic.open = false
  ImitationPageCanvas.state.store.navigation.layer.open = false
  
  ImitationPageLibrary.state.store.navigation.basic.open = false
  ImitationPageLibrary.state.store.navigation.content.open = false
}

export { ImitationGlobal, ImitationPageCanvas, ImitationPageLibrary }
export { withBindComponentPure, useBindComponentPure }