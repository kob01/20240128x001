import React from 'react'

import './View.Page.Canvas.Imitation'

import Content from './View.Page.Canvas.Content'
import Tool from './View.Page.Canvas.Tool'
import SettingDialog from './View.Page.Canvas.SettingDialog'

import Imitation from './utils.imitation'

function App() {
  React.useEffect(() => Imitation.state['page.canvas.function'].onLoad(), [])

  if (Imitation.state['page.canvas'].load === false) return null

  return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

    <div style={{ width: '100%', height: 0, flexGrow: 1 }}>
      <Content />
    </div>

    <div style={{ width: '100%', height: 16 }}></div>

    <div style={{ width: '100%', height: 'fit-content' }}>
      <Tool />
    </div>

    <div style={{ width: '100%', height: 4 }}></div>

    <SettingDialog />

  </div>
}

export default Imitation.withBindRender(App, state => [JSON.stringify(state['page.canvas'])])