import React from 'react'

import Button from '@mui/material/Button'

import SettingsIcon from '@mui/icons-material/Settings'
import AllOutIcon from '@mui/icons-material/AllOut'
import MapIcon from '@mui/icons-material/Map'
import Reviews from '@mui/icons-material/Reviews'
import SaveIcon from '@mui/icons-material/Save'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'

import { ImitationPageCanvas } from './Imitation'

function ToolAction() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '1s all', flexShrink: 0, margin: 2 }

  const styleButtonActive = (boolean) => ({ transform: boolean ? 'rotate(45deg)' : undefined })

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button variant='text' style={{ ...styleButton }} onClick={() => { ImitationPageCanvas.state.store.navigation.open = !ImitationPageCanvas.state.store.navigation.open; ImitationPageCanvas.state.function.update(); }} children={<SettingsIcon />} />
    </div>

  </div>
}

function App() {
  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap' }}>
    <ToolAction />
  </div>
}

export default App