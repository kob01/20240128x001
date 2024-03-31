import React from 'react'

import Button from '@mui/material/Button'

import AllOutIcon from '@mui/icons-material/AllOut'
import SettingsIcon from '@mui/icons-material/Settings'
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone'
import DrawIcon from '@mui/icons-material/Draw'
import SwipeIcon from '@mui/icons-material/Swipe'

import { ImitationPageCanvas } from './Imitation'

function App() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '1s all', flexShrink: 0, margin: 2 }

  const styleIcon = { transitionDuration: '1s', transitionProperty: 'transform' }

  const propertyButton = { variant: 'text', style: { ...styleButton } }

  const styleIconActive = (boolean) => ({ transform: boolean ? 'rotate(45deg)' : undefined })

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

    <Button {...propertyButton} onClick={() => { ImitationPageCanvas.state.store.navigation.basic.open = !ImitationPageCanvas.state.store.navigation.basic.open; ImitationPageCanvas.state.function.update(); }} children={<SettingsIcon style={{ ...styleIconActive(ImitationPageCanvas.state.store.navigation.basic.open), ...styleIcon }} />} />

    <Button {...propertyButton} onClick={() => { ImitationPageCanvas.state.store.navigation.layer.open = !ImitationPageCanvas.state.store.navigation.layer.open; ImitationPageCanvas.state.function.update(); }} children={<SettingsTwoToneIcon style={{ ...styleIconActive(ImitationPageCanvas.state.store.navigation.layer.open), ...styleIcon }} />} />
    
    <Button {...propertyButton} onClick={() => { ImitationPageCanvas.state.function.onControlChange('paint', !ImitationPageCanvas.state.store.control.paint) }} children={<DrawIcon style={{ ...styleIconActive(ImitationPageCanvas.state.store.control.paint), ...styleIcon }} />} />
    
    <Button {...propertyButton} onClick={() => { ImitationPageCanvas.state.function.onControlChange('move', !ImitationPageCanvas.state.store.control.move) }} children={<SwipeIcon style={{ ...styleIconActive(ImitationPageCanvas.state.store.control.move), ...styleIcon }} />} />

  </div>
}

export default App