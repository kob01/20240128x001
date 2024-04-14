import Imitation from 'imitation-imm'

import { throttleLastRIC } from './utils.common'

const ImitationInstance = new Imitation()

ImitationInstance.state = { update: {}, store: {}, function: {}, memo: {} }


ImitationInstance.state.store = { page: {} }


ImitationInstance.state.update.now = performance.now()


ImitationInstance.state.store.theme = { palette: { background: { main: 'rgba(255, 255, 255, 1)' }, primary: { main: 'rgba(0, 0, 0, 1)' }, secondary: { main: 'rgb(156, 39, 176)' }, success: { main: 'rgb(46, 125, 50)' } } }

ImitationInstance.state.store.loading = 0

ImitationInstance.state.store.message = ''

ImitationInstance.state.store.page = 'Canvas'

ImitationInstance.state.store.rect = undefined

ImitationInstance.state.store.recting = false


ImitationInstance.state.function.update = () => {
  ImitationInstance.state.update.now = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.updateThrottleLastRIC = throttleLastRIC(ImitationInstance.state.function.update)


export default ImitationInstance