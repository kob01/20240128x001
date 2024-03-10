import React from 'react'

import Button from '@mui/material/Button'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'

import { ImitationGlobal } from './Imitation'

function App() {
  const onChange = () => {
    ImitationGlobal.state.store.navigation.open = !ImitationGlobal.state.store.navigation.open
    ImitationGlobal.state.function.update()
  }

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <AnimationRAF animation={opacityAnimation}>
      {
        ({ style }) => {
          return <Button variant='contained' style={{ padding: 0, width: 120, height: 4, minWidth: 'auto', transition: '1s all', ...style }} onClick={() => onChange()} />
        }
      }
    </AnimationRAF>
  </div>
}

export default App