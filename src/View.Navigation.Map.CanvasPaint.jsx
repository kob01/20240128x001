import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App(props) {
  const renderWindowsFind = ImitationNavigation.state.memo.renderWindowsFind(props.renderWindowsHash)
  const paintOptionFind = ImitationPageCanvas.state.memo.paintOptionFind(renderWindowsFind.property.paintOptionHash)
  const paintSettingFind = ImitationPageCanvas.state.memo.paintSettingFind(renderWindowsFind.property.paintOptionHash)

  return <Grid container spacing={2}>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <div>Name</div>
      <div>{paintOptionFind.name}</div>
    </Grid>

    <Grid item xs={12}>
      <paintOptionFind.settingComponent value={paintSettingFind.setting} onChange={() => { ImitationPageCanvas.state.store.paint.setting = [...ImitationPageCanvas.state.store.paint.setting]; ImitationPageCanvas.state.function.update(); }} />
    </Grid>

  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)