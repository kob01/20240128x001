import React from 'react'

import Navigation from './View.Navigation'
import NavigationButton from './View.Navigation.Button'
import Content from './View.Page.Library.Content'
import Tool from './View.Page.Library.Tool'
import PageNavigation from './View.Page.Library.Navigation'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'

import { ImitationPageLibrary, withBindComponentPure } from './Imitation'

function App() {
  React.useEffect(() => ImitationPageLibrary.state.function.onLoad(), [])
  React.useEffect(() => () => ImitationPageLibrary.state.function.onUnload(), [])

  if (ImitationPageLibrary.state.store.load === false) return null

  return <AnimationRAF animation={opacityAnimation}>
    {
      ({ style }) => {
        return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: '1s all', ...style }}>

          <div style={{ width: '100%', height: 0, flexGrow: 1, display: 'flex' }}>
            <div style={{ width: 'fit-content', height: '100%' }}>
              <PageNavigation />
            </div>
            <div style={{ width: 0, height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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

export default withBindComponentPure(App, [{ instance: ImitationPageLibrary, dependence: state => [state.update.now] }])