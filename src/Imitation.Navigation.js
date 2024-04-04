import Imitation from 'imitation-imm'

const ImitationInstance = new Imitation()

ImitationInstance.state = { update: {}, store: {}, function: {}, memo: {} }

ImitationInstance.state.store = { expand: {} }

ImitationInstance.state.store.tooltip = { global: {}, canvas: {}, library: {} }

ImitationInstance.state.store.expand = { global: {}, canvas: {}, library: {} }

ImitationInstance.state.update.now = performance.now()

ImitationInstance.state.store.open = false

ImitationInstance.state.store.tooltip.global.theme = false

ImitationInstance.state.store.tooltip.global.page = false

ImitationInstance.state.store.tooltip.library.view = false

ImitationInstance.state.store.tooltip.library.information = false

ImitationInstance.state.store.tooltip.library.pagination = false

ImitationInstance.state.store.tooltip.canvas.basic = false

ImitationInstance.state.store.tooltip.canvas.paint = false

ImitationInstance.state.store.tooltip.canvas.layer = false

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

ImitationInstance.state.function.tooltip = () => {
  Object.values(ImitationInstance.state.store.tooltip).forEach(i => Object.keys(i).forEach(k => i[k] = false))
  ImitationInstance.dispatch()
}

export default ImitationInstance