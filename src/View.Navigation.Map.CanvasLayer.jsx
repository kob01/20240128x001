import React from 'react'

import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Slider from '@mui/material/Slider'

import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CopyAllIcon from '@mui/icons-material/CopyAll'
import LayersIcon from '@mui/icons-material/Layers'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { ButtonSX, DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

import { throttleLastRAF } from './utils.common'

function App(props) {
  const accordionWindowsFind = ImitationNavigation.state.memo.accordionWindowsFind(props.accordionWindowsHash)
  const canvasLayerFind = ImitationPageCanvas.state.memo.canvasLayerFind(accordionWindowsFind.property.canvasLayerHash)
  const canvasLayerRefFind = ImitationPageCanvas.state.memo.canvasLayerRefFind(accordionWindowsFind.property.canvasLayerHash)

  const updateThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationPageCanvas.state.function.update), [])
  const updateCanvasOffscreenRenderThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationPageCanvas.state.function.updateCanvasOffscreenRender), [])

  const onScaleXChange = (value) => {
    canvasLayerFind.scaleX = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onScaleYChange = (value) => {
    canvasLayerFind.scaleY = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onTranslateXChange = (value) => {
    canvasLayerFind.translateX = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onTranslateYChange = (value) => {
    canvasLayerFind.translateY = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

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
      <div>Scale X</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{ImitationPageCanvas.state.store.view.scaleX.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerFind.scaleX} onChange={(e, v) => { onScaleXChange(v) }} min={0.02} max={24} step={0.01} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Scale Y</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerFind.scaleY.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerFind.scaleY} onChange={(e, v) => { onScaleYChange(v) }} min={0.02} max={24} step={0.01} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Translate X</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerFind.translateX.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerFind.translateX} onChange={(e, v) => { onTranslateXChange(v) }} min={Math.min(canvasLayerFind.translateX, -1000)} max={Math.max(canvasLayerFind.translateX, 1000)} step={1} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Translate Y</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerFind.translateY.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerFind.translateY} onChange={(e, v) => { onTranslateYChange(v) }} min={Math.min(canvasLayerFind.translateY, -1000)} max={Math.max(canvasLayerFind.translateY, 1000)} step={1} />
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
      <div>Check Operations</div>
      <IconButton size='small' onClick={() => { ImitationNavigation.state.function.accordionWindowsAppendThrottlePipeTime500('CanvasOperations', { canvasLayerHash: canvasLayerFind._hash }) }}><LayersIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)