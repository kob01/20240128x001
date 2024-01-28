import React from 'react'

import Button from '@mui/material/Button'

import Animation from './View.Component.Animation'

import Imitation from './utils.imitation'

function App() {

  return <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} variant='contained' style={{ padding: 0, width: 120, height: 4, minWidth: 'auto', transition: '0.5s all' }} onClick={() => { Imitation.state['page.navigation'].drawer = true; Imitation.dispatch() }} />
    </div>
  </>
}

export default Imitation.withBindRender(App, state => [JSON.stringify(state['page.navigation'])])