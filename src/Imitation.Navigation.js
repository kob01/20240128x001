import React from 'react'

import Imitation from 'imitation-imm'

const ImitationInstance = new Imitation()

ImitationInstance.state = { update: {}, store: {}, function: {}, memo: {} }

ImitationInstance.state.store = { expand: {} }

ImitationInstance.state.store.tooltip = {  }

ImitationInstance.state.store.expand = { global: {}, canvas: {}, library: {} }

ImitationInstance.state.update.now = performance.now()

ImitationInstance.state.store.mode = 0

ImitationInstance.state.store.tooltip.open = false

ImitationInstance.state.store.tooltip.type = undefined

ImitationInstance.state.store.expand.global.theme = true

ImitationInstance.state.store.expand.global.page = true

ImitationInstance.state.store.expand.library.view = true

ImitationInstance.state.store.expand.library.information = true

ImitationInstance.state.store.expand.library.action = true

ImitationInstance.state.store.expand.library.pagination = true

ImitationInstance.state.store.expand.canvas.view = true

ImitationInstance.state.store.expand.canvas.control = true

ImitationInstance.state.store.expand.canvas.action = true

ImitationInstance.state.store.expand.canvas.paint = true

ImitationInstance.state.store.expand.canvas.paintsetting = true

ImitationInstance.state.store.expand.canvas.layer = true

ImitationInstance.state.store.expand.canvas.layersetting = true

ImitationInstance.state.store.expand.canvas.layeraction = true


ImitationInstance.state.function.update = () => {
  ImitationInstance.state.update.now = performance.now()
  ImitationInstance.dispatch()
}


export default ImitationInstance