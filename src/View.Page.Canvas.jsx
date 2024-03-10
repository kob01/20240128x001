import React from 'react'

import Navigation from './View.Navigation'
import NavigationButton from './View.Navigation.Button'
import Content from './View.Page.Canvas.Content'
import Tool from './View.Page.Canvas.Tool'
import Setting from './View.Page.Canvas.Setting'

import { ImitationPageCanvas, withBindComponentPure } from './Imitation'

function App() {
  React.useEffect(() => ImitationPageCanvas.state.function.onLoad(), [])
  React.useEffect(() => () => ImitationPageCanvas.state.function.onUnload(), [])

  if (ImitationPageCanvas.state.store.load === false) return null

  return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

    <div style={{ width: '100%', height: 0, flexGrow: 1, display: 'flex' }}>
      <div style={{ width: 'fit-content', height: '100%' }}>
        <Setting />
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

export default withBindComponentPure(App, [{ instance: ImitationPageCanvas, dependence: state => [state.update.now] }])