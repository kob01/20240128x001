import React from 'react'

import Button from '@mui/material/Button'

import AllOutIcon from '@mui/icons-material/AllOut'
import SettingsIcon from '@mui/icons-material/Settings'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'

import { ImitationPageLibrary } from './Imitation'

function App() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '1s all', flexShrink: 0, margin: 2 }

  const styleButtonActive = (boolean) => ({ transform: boolean ? 'rotate(45deg)' : undefined })

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <AnimationRAF animation={opacityAnimation}>
      {
        ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => { ImitationPageLibrary.state.store.setting.open = !ImitationPageLibrary.state.store.setting.open; ImitationPageLibrary.state.function.update(); }} children={<SettingsIcon />} />
      }
    </AnimationRAF>

    <AnimationRAF animation={opacityAnimation}>
      {
        ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => { ImitationPageLibrary.state.store.view.panorama = !ImitationPageLibrary.state.store.view.panorama; ImitationPageLibrary.state.function.update(); }} children={<AllOutIcon style={{ ...styleButtonActive(ImitationPageLibrary.state.store.view.panorama), transitionDuration: '1s', transitionProperty: 'transform' }} />} />
      }
    </AnimationRAF>
  </div>
}

export default App