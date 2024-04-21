import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import { ColorPicker } from './View.Component.ColorPicker'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App(props) {
  const accordionWindowsFind = ImitationNavigation.state.memo.accordionWindowsFind(props.accordionWindowsHash)
  const pencilFind = ImitationPageCanvas.state.memo.pencilFind(accordionWindowsFind.property.pencilHash)

  if (pencilFind === undefined) accordionWindowsFind.hide = true

  if (pencilFind === undefined) return null

  return <Grid container spacing={0}>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Name</div>
      <div>{pencilFind.name}</div>
    </Grid>

    <Grid item xs={12}>
      <pencilFind.settingComponent value={pencilFind.setting} onChange={() => { ImitationPageCanvas.state.function.update(); }} />
    </Grid>

  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)