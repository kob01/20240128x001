import React from 'react'

import Navigation from './View.Navigation'
import Library from './View.Page.Library'

import Imitation from './utils.imitation'

function App() {
  return <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16 }}>

    <div style={{ width: '100%', height: 0, flexGrow: 1 }}>

      {
        Imitation.state.router === 'Library' ? <Library /> : null
      }

    </div>

    <div style={{ width: '100%', height: 16 }}></div>

    <Navigation />

  </div>
}

export default Imitation.withBindRender(App, state => [])