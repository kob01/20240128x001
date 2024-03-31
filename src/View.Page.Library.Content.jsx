import React from 'react'

import Paper from '@mui/material/Paper'

import ContentPagination from './View.Page.Library.ContentPagination'
import ContentRender from './View.Page.Library.ContentRender'

import { ImitationPageLibrary } from './Imitation'

import { PaperSX } from './utils.mui.sx'

import { debounce } from './utils.common'

function App() {
  const ref = React.useRef()

  const updateDebounceRef = React.useRef(debounce(() => { ImitationPageLibrary.state.store.recting = false; ImitationPageLibrary.state.function.update() }, 500))

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(en => {
      ImitationPageLibrary.state.store.recting = true
      ImitationPageLibrary.state.store.rect = en[0].target.getBoundingClientRect()
      ImitationPageLibrary.state.function.update()

      updateDebounceRef.current()
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [])

  return <Paper {...PaperSX()} style={{ width: '100%', height: '100%' }}>

    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 16 }}>

      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} ref={el => ref.current = el}>
        {
          ImitationPageLibrary.state.store.rect !== undefined ? <ContentRender /> : null
        }
      </div>

      <div style={{ width: '100%', height: 16 }}></div>

      <ContentPagination />

    </div>

  </Paper>
}


export default App