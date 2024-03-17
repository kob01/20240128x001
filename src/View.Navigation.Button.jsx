import React from 'react'

import Button from '@mui/material/Button'

import { ImitationGlobal } from './Imitation'

function App() {
  const onChange = () => {
    ImitationGlobal.state.store.navigation.open = !ImitationGlobal.state.store.navigation.open
    ImitationGlobal.state.function.update()
  }

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Button variant='contained' style={{ padding: 0, width: 120, height: 4, minWidth: 'auto' }} onClick={() => onChange()} />
  </div>
}

export default App