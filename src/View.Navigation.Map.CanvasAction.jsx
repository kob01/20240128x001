import React from 'react'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'

import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App() {
  return <Grid container spacing={0} style={{ fontSize: 12 }}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Save</div>
      <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onSave(0) }}><SaveIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Save</div>
      <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onSave(1) }}><SaveIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Clear Canvas</div>
      <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onClear() }}><SaveIcon color='primary' fontSize='small' /></IconButton>
    </Grid>
  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)