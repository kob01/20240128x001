import React from 'react'

import Content from './View.Page.Library.Content'
import Tool from './View.Page.Library.Tool'
import NavigationBasic from './View.Page.Library.Navigation.Basic'
import NavigationContent from './View.Page.Library.Navigation.Content'

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
              <NavigationBasic />
            </div>
            <div style={{ width: 0, height: '100%', flexGrow: 1 }}>
              <Content />
            </div>
            <div style={{ width: 'fit-content', height: '100%' }}>
              <NavigationContent />
            </div>
          </div>

          <div style={{ width: '100%', height: 4 }}></div>

          <div style={{ width: '100%', height: 'fit-content' }}>
            <Tool />
          </div>

        </div>
      }
    }
  </AnimationRAF>
}

const dependence = [{ instance: ImitationPageLibrary, dependence: state => [state.update.now] }]

export default withBindComponentPure(App, dependence)