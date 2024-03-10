import React from 'react'

import Library from './View.Page.Library'
import Canvas from './View.Page.Canvas'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

function App() {
  return <div style={{ position: 'absolute', width: '100%', height: '100%', padding: 16, overflow: 'hidden' }}>

    {
      ImitationGlobal.state.store.router === 'Library' ? <Library key='Library' /> : null
    }

    {
      ImitationGlobal.state.store.router === 'Canvas' ? <Canvas key='Canvas' /> : null
    }

  </div>
}

export default withBindComponentPure(App, [{ instance: ImitationGlobal, dependence: state => [state.store.router] }])