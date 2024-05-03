import React from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import Message from './View.Global.Message'
import Loading from './View.Global.Loading'
import Setting from './View.Global.Setting'
import Canvas from './View.Page.Canvas'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

import { debounce } from './utils.common'

function App() {
  const ref = React.useRef()

  const updateDebounce = React.useCallback(debounce((rect) => { ImitationGlobal.state.store.recting = false; ImitationGlobal.state.store.rect = rect; ImitationGlobal.state.function.update() }, 500), [])

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(en => {
      const rect = en[0].target.getBoundingClientRect()

      if (ImitationGlobal.state.store.rect === undefined) { ImitationGlobal.state.store.rect = rect; ImitationGlobal.state.function.update(); }
      if (ImitationGlobal.state.store.recting === false) { ImitationGlobal.state.store.recting = true; ImitationGlobal.state.function.update(); }

      updateDebounce(rect)
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [])

  return <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }} ref={el => ref.current = el}>
    <ThemeProvider theme={createTheme(ImitationGlobal.state.store.theme)}>

      {
        ImitationGlobal.state.store.rect ?
          <>
            <Loading />
            <Message />
            <Setting />

            {
              ImitationGlobal.state.store.router[ImitationGlobal.state.store.router.length - 1].path === 'canvas' ? <Canvas /> : null
            }
          </>
          : null
      }

    </ThemeProvider>
  </div>
}

const dependence = [
  {
    instance: ImitationGlobal, dependence: state => [
      ImitationGlobal.state.store.rect,
      ImitationGlobal.state.store.recting,
      JSON.stringify(ImitationGlobal.state.store.router),
      JSON.stringify(ImitationGlobal.state.store.theme.palette),
    ]
  }
]

export default withBindComponentPure(App, dependence)