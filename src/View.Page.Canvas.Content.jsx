import React from 'react'

import Paper from '@mui/material/Paper'

import ContentCanvasWrapper from './View.Page.Canvas.ContentCanvasWrapper'

import { ImitationPageCanvas } from './Imitation'

import { PaperSX } from './utils.mui.sx'

import { debounce } from './utils.common'

function App() {
  const ref = React.useRef()

  const updateDebounceRef = React.useRef(debounce(() => { ImitationPageCanvas.state.store.recting = false; ImitationPageCanvas.state.function.update() }, 500))

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(en => {
      ImitationPageCanvas.state.store.recting = true
      ImitationPageCanvas.state.store.rect = en[0].target.getBoundingClientRect()
      ImitationPageCanvas.state.function.update()
      
      updateDebounceRef.current()
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [])

  return <Paper {...PaperSX()} style={{ width: '100%', height: '100%' }}>
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ref={el => ref.current = el}>
      {
        ImitationPageCanvas.state.store.rect !== undefined ? <ContentCanvasWrapper /> : null
      }
    </div>
  </Paper>
}

export default App