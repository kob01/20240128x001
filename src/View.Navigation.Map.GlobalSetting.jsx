import React from 'react'

import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'

import SaveIcon from '@mui/icons-material/Save'
import CopyAllIcon from '@mui/icons-material/CopyAll'
import ClearAllIcon from '@mui/icons-material/ClearAll'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

import { localStorageCache } from  './const'

function App() {
  const navigationAccordionWindow = () => JSON.stringify(ImitationNavigation.state.store.accordionWindow.map(i => ({ ...i, load: false })))
  const canvasSource = () => JSON.stringify(ImitationPageCanvas.state.store.source)
  const canvasActive = () => JSON.stringify(ImitationPageCanvas.state.store.active)

  const saveLocalStorage = () => {
    const cache = {
      localStorageNavigationAccordionWindow: JSON.parse(navigationAccordionWindow()),
      localStorageCanvasSource: JSON.parse(canvasSource()),
      localStorageCanvasActive: JSON.parse(canvasActive())
    }

    window.localStorage.setItem(localStorageCache, JSON.stringify(cache))
  }

  const clearLocalStorage = () => {
    window.localStorage.removeItem(localStorageCache)
  }

  return <Grid container spacing={0} style={{ fontSize: 12 }}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Save All Storage</div>
      <IconButton size='small' onClick={() => { saveLocalStorage() }}><SaveIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Clear All Storage</div>
      <IconButton size='small' onClick={() => { clearLocalStorage() }}><ClearAllIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Copy Navigation Accordion Window</div>
      <IconButton size='small' onClick={() => { navigator.clipboard.writeText(navigationAccordionWindow()) }}><CopyAllIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Copy Canvas Source</div>
      <IconButton size='small' onClick={() => { navigator.clipboard.writeText(canvasSource()) }}><CopyAllIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Copy Canvas Active</div>
      <IconButton size='small' onClick={() => { navigator.clipboard.writeText(canvasActive()) }}><CopyAllIcon color='primary' fontSize='small' /></IconButton>
    </Grid>
  </Grid>
}

const dependence = []

export default withBindComponentPure(App, dependence)