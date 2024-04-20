import React from 'react'

import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

import { throttleLastRAF } from './utils.common'

function App() {
  const updateThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationPageCanvas.state.function.update), [])
  const updateCanvasOffscreenRenderThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationPageCanvas.state.function.updateCanvasOffscreenRender), [])

  const onViewScaleXChange = (value) => {
    ImitationPageCanvas.state.store.view.scaleX = value
    ImitationPageCanvas.state.store.ref.layer.forEach(i => i.offscreenUpdate = true)
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onViewScaleYChange = (value) => {
    ImitationPageCanvas.state.store.view.scaleY = value
    ImitationPageCanvas.state.store.ref.layer.forEach(i => i.offscreenUpdate = true)
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onViewTranslateXChange = (value) => {
    ImitationPageCanvas.state.store.view.translateX = value
    ImitationPageCanvas.state.store.ref.layer.forEach(i => i.offscreenUpdate = true)
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onViewTranslateYChange = (value) => {
    ImitationPageCanvas.state.store.view.translateY = value
    ImitationPageCanvas.state.store.ref.layer.forEach(i => i.offscreenUpdate = true)
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  return <Grid container spacing={0}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Scale X</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{ImitationPageCanvas.state.store.view.scaleX.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={ImitationPageCanvas.state.store.view.scaleX} onChange={(e, v) => { onViewScaleXChange(v) }} min={0.02} max={24} step={0.01} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Scale Y</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{ImitationPageCanvas.state.store.view.scaleY.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={ImitationPageCanvas.state.store.view.scaleY} onChange={(e, v) => { onViewScaleYChange(v) }} min={0.02} max={24} step={0.01} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Translate X</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{ImitationPageCanvas.state.store.view.translateX.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={ImitationPageCanvas.state.store.view.translateX} onChange={(e, v) => { onViewTranslateXChange(v) }} min={Math.min(ImitationPageCanvas.state.store.view.translateX, -1000)} max={Math.max(ImitationPageCanvas.state.store.view.translateX, 1000)} step={1} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Translate Y</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{ImitationPageCanvas.state.store.view.translateY.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={ImitationPageCanvas.state.store.view.translateY} onChange={(e, v) => { onViewTranslateYChange(v) }} min={Math.min(ImitationPageCanvas.state.store.view.translateY, -1000)} max={Math.max(ImitationPageCanvas.state.store.view.translateY, 1000)} step={1} />
      </div>
    </Grid>
  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)