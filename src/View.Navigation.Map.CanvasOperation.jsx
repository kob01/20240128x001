import React from 'react'

import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { ButtonSX, DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

import { throttleLastRAF } from './utils.common'

function App(props) {
  const accordionWindowsFind = ImitationNavigation.state.memo.accordionWindowsFind(props.accordionWindowsHash)
  const canvasLayerFind = ImitationPageCanvas.state.memo.canvasLayerFind(accordionWindowsFind.property.canvasLayerHash)
  const canvasLayerRefFind = ImitationPageCanvas.state.memo.canvasLayerRefFind(accordionWindowsFind.property.canvasLayerHash)
  const canvasLayerOperationFind = ImitationPageCanvas.state.memo.canvasLayerOperationFind(accordionWindowsFind.property.canvasLayerHash, accordionWindowsFind.property.canvasOperationHash)
  const pencilFind = ImitationPageCanvas.state.memo.pencilFind(canvasLayerOperationFind.pencilHash)
  
  const updateThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationPageCanvas.state.function.update), [])
  const updateCanvasOffscreenRenderThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationPageCanvas.state.function.updateCanvasOffscreenRender), [])

  const onScaleXChange = (value) => {
    canvasLayerOperationFind.transform.scaleX = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onScaleYChange = (value) => {
    canvasLayerOperationFind.transform.scaleY = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onTranslateXChange = (value) => {
    canvasLayerOperationFind.transform.translateX = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onTranslateYChange = (value) => {
    canvasLayerOperationFind.transform.translateY = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

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

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Scale X</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerOperationFind.transform.scaleX.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerOperationFind.transform.scaleX} onChange={(e, v) => { onScaleXChange(v) }} min={0.02} max={24} step={0.01} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Scale Y</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerOperationFind.transform.scaleY.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerOperationFind.transform.scaleY} onChange={(e, v) => { onScaleYChange(v) }} min={0.02} max={24} step={0.01} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Translate X</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerOperationFind.transform.translateX.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerOperationFind.transform.translateX} onChange={(e, v) => { onTranslateXChange(v) }} min={Math.min(canvasLayerOperationFind.transform.translateX, -1000)} max={Math.max(canvasLayerOperationFind.transform.translateX, 1000)} step={1} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Translate Y</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerOperationFind.transform.translateY.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerOperationFind.transform.translateY} onChange={(e, v) => { onTranslateYChange(v) }} min={Math.min(canvasLayerOperationFind.transform.translateY, -1000)} max={Math.max(canvasLayerOperationFind.transform.translateY, 1000)} step={1} />
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