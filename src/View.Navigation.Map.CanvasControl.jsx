import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'

import SaveIcon from '@mui/icons-material/Save'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App() {
  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Enable Paint</div>
      <div>
        <Switch {...SwitchSX()} checked={ImitationPageCanvas.state.store.control.paint} onChange={(e) => { ImitationPageCanvas.state.store.control.paint = e.target.checked; ImitationPageCanvas.state.function.update() }} />
      </div>
    </Grid>
  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)