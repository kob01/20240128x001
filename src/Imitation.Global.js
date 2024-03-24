import Imitation from 'imitation-imm'

const ImitationInstance = new Imitation()

ImitationInstance.state = { update: {}, store: {}, function: {}, memo: {} }

ImitationInstance.state.store = { navigation: {} }

ImitationInstance.state.update.now = performance.now()

ImitationInstance.state.store.theme = { palette: { background: { main: 'rgb(255, 255, 255)' }, primary: { main: 'rgb(0, 0, 0)' }, secondary: { main: 'rgb(156, 39, 176)' }, success: { main: 'rgb(46, 125, 50)' } } }

ImitationInstance.state.store.loading = 0

ImitationInstance.state.store.message = ''

ImitationInstance.state.store.navigation.open = false

ImitationInstance.state.store.navigation.expand = [true, true]

ImitationInstance.state.store.navigation.mode = 0

ImitationInstance.state.store.router = new URLSearchParams(new URL(window.location.href).search).get('router') || 'Library'

ImitationInstance.state.function.update = () => {
  ImitationInstance.state.update.now = performance.now()
  ImitationInstance.dispatch()
}

export default ImitationInstance