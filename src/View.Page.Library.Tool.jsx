import React from 'react'

import Button from '@mui/material/Button'

import AllOutIcon from '@mui/icons-material/AllOut'
import SettingsIcon from '@mui/icons-material/Settings'
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone'

import { ImitationPageLibrary } from './Imitation'

function App() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '1s all', flexShrink: 0, margin: 2 }

  const styleIcon = { transitionDuration: '1s', transitionProperty: 'transform' }

  const propertyButton = { variant: 'text', style: { ...styleButton } }

  const styleIconActive = (boolean) => ({ transform: boolean ? 'rotate(45deg)' : undefined })

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

    <Button {...propertyButton} onClick={() => { ImitationPageLibrary.state.store.navigation.basic.open = !ImitationPageLibrary.state.store.navigation.basic.open; ImitationPageLibrary.state.function.update(); }} children={<SettingsIcon style={{ ...styleIconActive(ImitationPageLibrary.state.store.navigation.basic.open), ...styleIcon }} />} />

    <Button {...propertyButton} onClick={() => { ImitationPageLibrary.state.store.navigation.content.open = !ImitationPageLibrary.state.store.navigation.content.open; ImitationPageLibrary.state.function.update(); }} children={<SettingsTwoToneIcon style={{ ...styleIconActive(ImitationPageLibrary.state.store.navigation.content.open), ...styleIcon }} />} />

    <Button {...propertyButton} onClick={() => { ImitationPageLibrary.state.store.view.panorama = !ImitationPageLibrary.state.store.view.panorama; ImitationPageLibrary.state.function.update(); }} children={<AllOutIcon style={{ ...styleIconActive(ImitationPageLibrary.state.store.view.panorama), ...styleIcon }} />} />

  </div>
}

export default App