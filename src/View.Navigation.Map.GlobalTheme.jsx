import React from 'react'

import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

function App() {
  const themeBase = 255
  const themeUnit = 15

  const average = (array) => array.reduce((t, i) => t + i, 0) / array.length

  const themeValue = React.useMemo(() => {
    const background = average(ImitationGlobal.state.store.theme.palette.background.main.match(/\d+/g).map(i => Number(i)))
    const primary = average(ImitationGlobal.state.store.theme.palette.primary.main.match(/\d+/g).map(i => Number(i)))

    const backgroundLevel = background / themeBase * themeUnit
    const primaryLevel = (themeBase - primary) / themeBase * themeUnit

    const color = Math.floor(average([backgroundLevel, primaryLevel]))

    return color
  }, [...Object.values(ImitationGlobal.state.store.theme.palette).map(i => i.main)])

  const onChangeTheme = (v) => {
    const background = `rgb(${v * themeBase / themeUnit}, ${v * themeBase / themeUnit}, ${v * themeBase / themeUnit})`
    const primary = `rgb(${themeBase - v * themeBase / themeUnit}, ${themeBase - v * themeBase / themeUnit}, ${themeBase - v * themeBase / themeUnit})`

    ImitationGlobal.state.store.theme.palette.background.main = background
    ImitationGlobal.state.store.theme.palette.primary.main = primary

    ImitationGlobal.dispatch()
  }

  return <Grid container spacing={2}>
    <Grid item xs={12}>Theme Color</Grid>
    <Grid item xs={12}>
      <Slider value={themeValue} onChange={(e, v) => onChangeTheme(v)} min={0} max={themeUnit} step={1} />
    </Grid>
  </Grid>
}

const dependence = [
  { instance: ImitationGlobal, dependence: state => [...Object.values(ImitationGlobal.state.store.theme.palette).map(i => i.main)] }
]

export default withBindComponentPure(App, dependence)