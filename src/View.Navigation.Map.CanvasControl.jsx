import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'

import SaveIcon from '@mui/icons-material/Save'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App() {
  return <Grid container spacing={0}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Enable Draw</div>
      <div>
        <Switch {...SwitchSX()} size='small' checked={ImitationPageCanvas.state.store.control.draw} onChange={(e) => { ImitationPageCanvas.state.store.control.draw = e.target.checked; ImitationPageCanvas.state.function.update() }} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Enable Move</div>
      <div>
        <Switch {...SwitchSX()} size='small' checked={ImitationPageCanvas.state.store.control.move} onChange={(e) => { ImitationPageCanvas.state.store.control.move = e.target.checked; ImitationPageCanvas.state.function.update() }} />
      </div>
    </Grid>
  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)