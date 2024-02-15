import React from 'react'

import './View.Page.Library.Imitation'

import Content from './View.Page.Library.Content'
import Tool from './View.Page.Library.Tool'
import SettingDialog from './View.Page.Library.SettingDialog'

import Imitation from './utils.imitation'

function App() {
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

export default Imitation.withBindRender(App, state => [JSON.stringify(state['page.library'])])