import React from 'react'

import Content from './View.Page.Library.Content'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'

import { ImitationPageLibrary, withBindComponentPure } from './Imitation'

import { debounce } from './utils.common'

function App() {
  const ref = React.useRef()

  const updateDebounceRef = React.useRef(debounce(() => { ImitationPageLibrary.state.store.recting = false; ImitationPageLibrary.state.function.update() }, 500))

  React.useEffect(() => {
    if (ImitationPageLibrary.state.store.load === false) return

    const resizeObserver = new ResizeObserver(en => {
      ImitationPageLibrary.state.store.recting = true
      ImitationPageLibrary.state.store.rect = en[0].target.getBoundingClientRect()
      ImitationPageLibrary.state.function.update()

      updateDebounceRef.current()
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [ImitationPageLibrary.state.store.load])

  React.useEffect(() => ImitationPageLibrary.state.function.onLoad(), [])

  React.useEffect(() => () => ImitationPageLibrary.state.function.onUnload(), [])

  if (ImitationPageLibrary.state.store.load === false) return null

  return <AnimationRAF animation={opacityAnimation}>
    {
      ({ style }) => {
        return <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', transition: '1s all', ...style }} ref={el => ref.current = el}>
          {
            ImitationPageLibrary.state.store.rect !== undefined ? <Content /> : null
          }
        </div>
      }
    }
  </AnimationRAF>
}

const dependence = [{ instance: ImitationPageLibrary, dependence: state => [state.update.now] }]

export default withBindComponentPure(App, dependence)