import React from 'react'

import Navigation from './View.Navigation'
import Library from './View.Page.Library'
import Canvas from './View.Page.Canvas'

import Imitation from './utils.imitation'

function App() {
  return <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16, overflow: 'hidden' }}>

    <div style={{ width: '100%', height: 0, flexGrow: 1 }}>

      {
        Imitation.state.router === 'Library' ? <Library key='Library'/> : null
      }

      {
        Imitation.state.router === 'Canvas' ? <Canvas key='Canvas'/> : null
      }

    </div>

    <Navigation />

  </div>
}

export default Imitation.withBindRender(App, state => [state.router])