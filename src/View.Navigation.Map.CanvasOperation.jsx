import React from 'react'

import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Grid from '@mui/material/Grid'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { ButtonSX, DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App(props) {
  const accordionWindowsFind = ImitationNavigation.state.memo.accordionWindowsFind(props.accordionWindowsHash)
  const canvasLayerFind = ImitationPageCanvas.state.memo.canvasLayerFind(accordionWindowsFind.property.canvasLayerHash)
  const canvasLayerRefFind = ImitationPageCanvas.state.memo.canvasLayerRefFind(accordionWindowsFind.property.canvasLayerHash)
  const canvasLayerOperationFind = ImitationPageCanvas.state.memo.canvasLayerOperationFind(accordionWindowsFind.property.canvasLayerHash, accordionWindowsFind.property.canvasOperationHash)
  const pencilFind = ImitationPageCanvas.state.memo.pencilFind(canvasLayerOperationFind.pencilHash)

  if (canvasLayerFind === undefined || canvasLayerOperationFind === undefined) accordionWindowsFind.hide = true

  if (canvasLayerFind === undefined || canvasLayerOperationFind === undefined) return null

  return <Grid container spacing={0}>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      Layer Hash ID: {canvasLayerFind._hash}
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      Operation Hash ID: {canvasLayerOperationFind._hash}
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Visibility</div>
      <div>
        <Switch {...SwitchSX()} size='small' checked={canvasLayerOperationFind.visibility} onChange={(e) => { ImitationPageCanvas.state.function.onCanvasOperationVisibility(canvasLayerFind._hash, canvasLayerOperationFind._hash, e.target.checked) }} />
      </div>
    </Grid>

    <Grid item xs={12}>
      <pencilFind.settingComponent value={canvasLayerOperationFind.setting} onChange={() => { canvasLayerRefFind.offscreenUpdate = true; ImitationPageCanvas.state.function.updateCanvasOffscreenRender(); ImitationPageCanvas.state.function.update(); }} inOperation={true} />
    </Grid>

  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)