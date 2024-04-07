import React from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import Message from './View.Global.Message'
import Loading from './View.Global.Loading'
import Page from './View.Page'
import Navigation from './View.Navigation'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

import { debounce } from './utils.common'

function App() {
  const ref = React.useRef()

  const updateDebounceRef = React.useRef(debounce(() => { ImitationGlobal.state.store.recting = false; ImitationGlobal.state.function.update() }, 500))

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(en => {
      ImitationGlobal.state.store.recting = true
      ImitationGlobal.state.store.rect = en[0].target.getBoundingClientRect()
      ImitationGlobal.state.function.update()

      updateDebounceRef.current()
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [])

  return <ThemeProvider theme={createTheme(ImitationGlobal.state.store.theme)}>

    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }} ref={el => ref.current = el}>
      <Loading />
      <Message />
      {
        ImitationGlobal.state.store.rect !== undefined ? <Page /> : null
      }
      {
        ImitationGlobal.state.store.rect !== undefined ? <Navigation /> : null
      }
    </div>

  </ThemeProvider>
}

const dependence = [{ instance: ImitationGlobal, dependence: state => [ImitationGlobal.state.store.rect, ImitationGlobal.state.store.recting, ...Object.values(state.store.theme.palette).map(i => i.main)] }]

export default withBindComponentPure(App, dependence)