import Imitation from 'imitation-imm'

const ImitationInstance = new Imitation()

ImitationInstance.state = { update: {}, store: {}, function: {}, memo: {} }


ImitationInstance.state.update.now = performance.now()

ImitationInstance.state.store.rect = undefined

ImitationInstance.state.store.recting = false

ImitationInstance.state.store.loading = 0

ImitationInstance.state.store.message = ''

ImitationInstance.state.store.page = 'Canvas'

ImitationInstance.state.store.theme = { palette: { background: { main: 'rgba(255, 255, 255, 1)' }, primary: { main: 'rgba(0, 0, 0, 1)' }, secondary: { main: 'rgb(156, 39, 176)' }, success: { main: 'rgb(46, 125, 50)' } } }


ImitationInstance.state.function.update = () => {
  ImitationInstance.state.update.now = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.messageAppend = (message) => {
  ImitationInstance.state.store.message = message
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.loadingPlus = () => {
  ImitationInstance.state.store.loading = ImitationInstance.state.store.loading + 1
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.loadingUp = () => {
  ImitationInstance.state.store.loading = ImitationInstance.state.store.loading + 1
  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.loadingDown = () => {
  ImitationInstance.state.store.loading = ImitationInstance.state.store.loading - 1
  ImitationInstance.state.function.update()
}


export default ImitationInstance