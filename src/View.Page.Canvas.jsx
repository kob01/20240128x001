import React from 'react'

import Content from './View.Page.Canvas.Content'
import Navigation from './View.Page.Canvas.Navigation'

import { ImitationGlobal, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { debounce } from './utils.common'

import { apiCanvas } from './utils.api'

function App() {
  const ref = React.useRef()

  const updateDebounce = React.useCallback(debounce((rect) => { ImitationPageCanvas.state.store.recting = false; ImitationPageCanvas.state.store.rect = rect; ImitationPageCanvas.state.function.update() }, 500), [])

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(en => {
      const rect = en[0].target.getBoundingClientRect()

      if (ImitationPageCanvas.state.store.rect === undefined) { ImitationPageCanvas.state.store.rect = rect; ImitationPageCanvas.state.function.update(); }
      if (ImitationPageCanvas.state.store.recting === false) { ImitationPageCanvas.state.store.recting = true; ImitationPageCanvas.state.function.update(); }

      updateDebounce(rect)
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [])

  React.useEffect(async () => {
    ImitationGlobal.state.function.loadingCallback(apiCanvas().then(res => ImitationPageCanvas.state.function.onLoad(res)))
    return () => ImitationPageCanvas.state.function.onUnload()
  }, [])

  return <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }} ref={el => ref.current = el}>
    {
      ImitationPageCanvas.state.store.rect !== undefined ? <Content /> : null
    }

    {
      ImitationPageCanvas.state.store.rect !== undefined ? <Navigation /> : null
    }
  </div>
}

const dependence = [
  {
    instance: ImitationPageCanvas, dependence: state => [
      ImitationPageCanvas.state.store.recting,
      ImitationPageCanvas.state.store.rect,
    ]
  }
]

export default withBindComponentPure(App, dependence)