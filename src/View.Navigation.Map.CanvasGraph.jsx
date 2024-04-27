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
  const canvasLayerGraphFind = ImitationPageCanvas.state.memo.canvasLayerGraphFind(accordionWindowsFind.property.canvasLayerHash, accordionWindowsFind.property.canvasGraphHash)
  const pencilFind = ImitationPageCanvas.state.memo.pencilFind(canvasLayerGraphFind.pencilHash)

  if (canvasLayerFind === undefined || canvasLayerGraphFind === undefined) accordionWindowsFind.hide = true

  if (canvasLayerFind === undefined || canvasLayerGraphFind === undefined) return null

  return <Grid container spacing={0}>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      Layer Hash ID: {canvasLayerFind._hash}
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      Graph Hash ID: {canvasLayerGraphFind._hash}
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Visibility</div>
      <div>
        <Switch {...SwitchSX()} size='small' checked={canvasLayerGraphFind.visibility} onChange={(e) => { ImitationPageCanvas.state.function.onCanvasGraphVisibility(canvasLayerFind._hash, canvasLayerGraphFind._hash, e.target.checked) }} />
      </div>
    </Grid>

    <Grid item xs={12}>
      <pencilFind.settingComponent value={canvasLayerGraphFind.setting} onChange={() => { canvasLayerRefFind.offscreenUpdate = true; ImitationPageCanvas.state.function.updateCanvasOffscreenRender(); ImitationPageCanvas.state.function.update(); }} inGraph={true} />
    </Grid>

  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)