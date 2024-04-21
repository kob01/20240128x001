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

  const updateDebounce = React.useCallback(debounce((rect) => { ImitationGlobal.state.store.recting = false; ImitationGlobal.state.store.rect = rect; ImitationGlobal.state.function.update() }, 500), [])

  React.useEffect(() => {
    if (ImitationGlobal.state.store.load === false) return

    const resizeObserver = new ResizeObserver(en => {
      const rect = en[0].target.getBoundingClientRect()

      if (ImitationGlobal.state.store.rect === undefined) { ImitationGlobal.state.store.rect = rect; ImitationGlobal.state.function.update(); }
      if (ImitationGlobal.state.store.recting === false) { ImitationGlobal.state.store.recting = true; ImitationGlobal.state.function.update(); }

      updateDebounce(en[0].target.getBoundingClientRect())
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [ImitationGlobal.state.store.load])

  React.useEffect(() => ImitationGlobal.state.function.onLoad(), [])

  React.useEffect(() => () => ImitationGlobal.state.function.onUnload(), [])

  return <ThemeProvider theme={createTheme(ImitationGlobal.state.store.theme)}>

    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }} ref={el => ref.current = el}>
      <Loading />
      <Message />
      {
        ImitationGlobal.state.store.load === true && ImitationGlobal.state.store.rect !== undefined ? <Page /> : null
      }
      {
        ImitationGlobal.state.store.load === true && ImitationGlobal.state.store.rect !== undefined ? <Navigation /> : null
      }
    </div>

  </ThemeProvider>
}

const dependence = [
  { instance: ImitationGlobal, dependence: state => [ImitationGlobal.state.store.rect, ImitationGlobal.state.store.recting, ImitationGlobal.state.store.load, ...Object.values(state.store.theme.palette).map(i => i.main)] }
]

export default withBindComponentPure(App, dependence)