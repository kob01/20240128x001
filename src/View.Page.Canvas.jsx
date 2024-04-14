import React from 'react'

import ContentWrapper from './View.Page.Canvas.ContentWrapper'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'

import { ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { debounce } from './utils.common'

function App() {
  const ref = React.useRef()

  const updateDebounceRef = React.useRef(debounce(() => { ImitationPageCanvas.state.store.recting = false; ImitationPageCanvas.state.function.update() }, 500))

  React.useEffect(() => {
    if (ImitationPageCanvas.state.store.load === false) return

    const resizeObserver = new ResizeObserver(en => {
      ImitationPageCanvas.state.store.recting = true
      ImitationPageCanvas.state.store.rect = en[0].target.getBoundingClientRect()
      ImitationPageCanvas.state.function.update()

      updateDebounceRef.current()
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