import React from 'react'

import ContentWrapper from './View.Page.Canvas.ContentWrapper'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'

import { ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { debounce } from './utils.common'

function App() {
  const ref = React.useRef()

  const updateDebounce = React.useCallback(debounce((rect) => { ImitationPageCanvas.state.store.recting = false; ImitationPageCanvas.state.store.rect = rect; ImitationPageCanvas.state.function.update() }, 500), [])

  React.useEffect(() => {
    if (ImitationPageCanvas.state.store.load === false) return

    const resizeObserver = new ResizeObserver(en => {
      const rect = en[0].target.getBoundingClientRect()

      if (ImitationPageCanvas.state.store.rect === undefined) { ImitationPageCanvas.state.store.rect = rect; ImitationPageCanvas.state.function.update(); }
      if (ImitationPageCanvas.state.store.recting === false) { ImitationPageCanvas.state.store.recting = true; ImitationPageCanvas.state.function.update(); }

      updateDebounce(rect)
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [ImitationPageCanvas.state.store.load])

  React.useEffect(() => ImitationPageCanvas.state.function.onLoad(), [])

  React.useEffect(() => () => ImitationPageCanvas.state.function.onUnload(), [])

  if (ImitationPageCanvas.state.store.load === false) return null

  return <AnimationRAF animation={opacityAnimation}>
    {
      ({ style }) => {
        return <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', transition: '1s all', ...style }} ref={el => ref.current = el}>
          {
            ImitationPageCanvas.state.store.rect !== undefined ? <ContentWrapper /> : null
          }
        </div>
      }
    }
  </AnimationRAF>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)