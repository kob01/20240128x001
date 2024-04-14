import React from 'react'

import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App() {
  return <Grid container spacing={2}>
    <Grid item xs={12}>
      Scale X {ImitationPageCanvas.state.store.view.scaleX}
    </Grid>
    <Grid item xs={12}>
      <Slider value={ImitationPageCanvas.state.store.view.scaleX} onChange={(e, v) => { ImitationPageCanvas.state.function.onViewScaleXChangeThrottleLastRIC(v) }} min={0.02} max={24} step={0.01} />
    </Grid>

    <Grid item xs={12}>
      Scale Y {ImitationPageCanvas.state.store.view.scaleY}
    </Grid>
    <Grid item xs={12}>
      <Slider value={ImitationPageCanvas.state.store.view.scaleY} onChange={(e, v) => { ImitationPageCanvas.state.function.onViewScaleYChangeThrottleLastRIC(v) }} min={0.02} max={24} step={0.01} />
    </Grid>

    <Grid item xs={12}>
      Translate X {ImitationPageCanvas.state.store.view.translateX}
    </Grid>
    <Grid item xs={12}>
      <Slider value={ImitationPageCanvas.state.store.view.translateX} onChange={(e, v) => { ImitationPageCanvas.state.function.onViewTranslateXChangeThrottleLastRIC(v) }} min={Math.min(ImitationPageCanvas.state.store.view.translateX, -1000)} max={Math.max(ImitationPageCanvas.state.store.view.translateX, 1000)} step={1} />
    </Grid>

    <Grid item xs={12}>
      Translate Y {ImitationPageCanvas.state.store.view.translateY}
    </Grid>
    <Grid item xs={12}>
      <Slider value={ImitationPageCanvas.state.store.view.translateY} onChange={(e, v) => { ImitationPageCanvas.state.function.onViewTranslateYChangeThrottleLastRIC(v) }} min={Math.min(ImitationPageCanvas.state.store.view.translateY, -1000)} max={Math.max(ImitationPageCanvas.state.store.view.translateY, 1000)} step={1} />
    </Grid>
  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)