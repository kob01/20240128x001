import React from 'react'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'

import SaveIcon from '@mui/icons-material/Save'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App() {
  return <Grid container spacing={0}>
    <Grid item xs={12}>
      <Button fullWidth style={{ justifyContent: 'flex-start', alignItems: 'center' }} component='div' onClick={() => { ImitationPageCanvas.state.function.onSave(0) }}>
        <IconButton size='small' style={{ opacity: ImitationGlobal.state.store.page === 'Library' ? 1 : 0.2, transition: '1s all' }}>
          <SaveIcon color='primary' fontSize='small' />
        </IconButton>
        <div style={{ margin: '0 4px' }}>Save Source</div>
      </Button>
    </Grid>
    <Grid item xs={12}>
      <Button fullWidth style={{ justifyContent: 'flex-start', alignItems: 'center' }} component='div' onClick={() => { ImitationPageCanvas.state.function.onSave(1) }}>
        <IconButton size='small' style={{ opacity: ImitationGlobal.state.store.page === 'Library' ? 1 : 0.2, transition: '1s all' }}>
          <SaveIcon color='primary' fontSize='small' />
        </IconButton>
        <div style={{ margin: '0 4px' }}>Save Canvas</div>
      </Button>
    </Grid>
    <Grid item xs={12}>
      <Button fullWidth style={{ justifyContent: 'flex-start', alignItems: 'center' }} component='div' onClick={() => { ImitationPageCanvas.state.function.onClear() }}>
        <IconButton size='small' style={{ opacity: ImitationGlobal.state.store.page === 'Library' ? 1 : 0.2, transition: '1s all' }}>
          <SaveIcon color='primary' fontSize='small' />
        </IconButton>
        <div style={{ margin: '0 4px' }}>Clear Canvas</div>
      </Button>
    </Grid>
  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)