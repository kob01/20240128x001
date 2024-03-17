import React from 'react'

import Navigation from './View.Navigation'
import NavigationButton from './View.Navigation.Button'
import Content from './View.Page.Canvas.Content'
import Tool from './View.Page.Canvas.Tool'
import PageNavigation from './View.Page.Canvas.Navigation'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'

import { ImitationPageCanvas, withBindComponentPure } from './Imitation'

function App() {
  React.useEffect(() => ImitationPageCanvas.state.function.onLoad(), [])
  React.useEffect(() => () => ImitationPageCanvas.state.function.onUnload(), [])

  if (ImitationPageCanvas.state.store.load === false) return null

  return <AnimationRAF animation={opacityAnimation}>
    {
      ({ style }) => {
        return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: '1s all', ...style }}>

          <div style={{ width: '100%', height: 0, flexGrow: 1, display: 'flex' }}>
            <div style={{ width: 'fit-content', height: '100%' }}>
              <PageNavigation />
            </div>
            <div style={{ width: 0, height: '100%', flexGrow: 1 }}>
              <Content />
            </div>
            <div style={{ width: 'fit-content', height: '100%' }}>
              <Navigation />
            </div>
          </div>

          <div style={{ width: '100%', height: 4 }}></div>

          <div style={{ width: '100%', height: 'fit-content' }}>
            <Tool />
          </div>

          <div style={{ width: '100%', height: 4 }}></div>

          <NavigationButton />

        </div>
      }
    }
  </AnimationRAF>

}

export default withBindComponentPure(App, [{ instance: ImitationPageCanvas, dependence: state => [state.update.now] }])