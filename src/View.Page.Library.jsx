import React from 'react'

import Navigation from './View.Navigation'
import NavigationButton from './View.Navigation.Button'
import Content from './View.Page.Library.Content'
import Tool from './View.Page.Library.Tool'
import Setting from './View.Page.Library.Setting'

import { ImitationPageLibrary, withBindComponentPure } from './Imitation'

function App() {
  React.useEffect(() => ImitationPageLibrary.state.function.onLoad(), [])
  React.useEffect(() => () => ImitationPageLibrary.state.function.onUnload(), [])

  if (ImitationPageLibrary.state.store.load === false) return null

  return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

    <div style={{ width: '100%', height: 0, flexGrow: 1, display: 'flex' }}>
      <div style={{ width: 'fit-content', height: '100%' }}>
        <Setting />
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

export default withBindComponentPure(App, [{ instance: ImitationPageLibrary, dependence: state => [state.update.now] }])