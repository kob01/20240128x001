import React from 'react'

import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'

import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CopyAllIcon from '@mui/icons-material/CopyAll'
import LayersIcon from '@mui/icons-material/Layers'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { ButtonSX, DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App(props) {
  const accordionWindowsFind = ImitationNavigation.state.memo.accordionWindowsFind(props.accordionWindowsHash)
  const canvasLayerFind = ImitationPageCanvas.state.memo.canvasLayerFind(accordionWindowsFind.property.canvasLayerHash)

  if (canvasLayerFind === undefined) accordionWindowsFind.hide = true

  if (canvasLayerFind === undefined) return null

  return <Grid container spacing={0}>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      Hash ID: {canvasLayerFind._hash}
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Visibility</div>
      <div>
        <Switch {...SwitchSX()} size='small' checked={canvasLayerFind.visibility} onChange={(e) => { ImitationPageCanvas.state.function.onCanvasLayerVisibility(canvasLayerFind._hash, e.target.checked) }} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Copy Layer</div>
      <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerCopy(canvasLayerFind._hash) }}><CopyAllIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Remove Layer</div>
      <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerRemove(canvasLayerFind._hash) }}><DeleteIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Move Up Layer</div>
      <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerMove(canvasLayerFind._hash, 0) }}><KeyboardArrowUpIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Move Down Layer</div>
      <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerMove(canvasLayerFind._hash, 1) }}><KeyboardArrowDownIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Check Actions</div>
      <IconButton size='small' onClick={() => { ImitationNavigation.state.function.accordionWindowsAppendThrottlePipeTime500('CanvasLayerActions', { canvasLayerHash: canvasLayerFind._hash }) }}><LayersIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)