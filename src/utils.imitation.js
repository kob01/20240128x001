import Imitation from 'imitation-imm/src/index'

import { source } from './utils.source'

const ImitationINS = new Imitation()

ImitationINS.state = {
  theme: {
    palette: {
      background: {
        main: 'rgb(0, 0, 0)'
      },
      primary: {
        main: 'rgb(255, 255, 255)'
      },
      secondary: {
        main: 'rgb(156, 39, 176)'
      },
      success: {
        main: 'rgb(46, 125, 50)'
      }
    }
  },

  loading: 0,

  message: '',

  version: '1.0.0',

  source: source,

  router: new URLSearchParams(new URL(window.location.href).search).get('router') || 'Library',
}

export default ImitationINS