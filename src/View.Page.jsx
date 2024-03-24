import React from 'react'

import Navigation from './View.Page.Navigation'
import Library from './View.Page.Library'
import Canvas from './View.Page.Canvas'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

function App() {
  return <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16, overflow: 'hidden' }}>

    <div style={{ width: '100%', height: 0, flexGrow: 1 }}>

      {
        ImitationGlobal.state.store.router === 'Library' ? <Library key='Library' /> : null
      }

      {
        ImitationGlobal.state.store.router === 'Canvas' ? <Canvas key='Canvas' /> : null
      }

    </div>

    <div style={{ width: '100%', height: 4 }}></div>

    <Navigation />

  </div>
}

const dependence = [{ instance: ImitationGlobal, dependence: state => [state.store.router] }]

export default withBindComponentPure(App, dependence)