import React from 'react'

import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'

import MapIcon from '@mui/icons-material/Map'
import SendIcon from '@mui/icons-material/Send'

import { NavigationItem, NavigationAccordion } from './View.Navigation.Component'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

import { ImitationNavigation, ImitationGlobal, withBindComponentPure } from './Imitation'

function Page() {
  return <Grid container spacing={2}>

    <Grid item xs={12}>
      <NavigationAccordion text={'Page'} type={['global', 'page']}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button fullWidth style={{ justifyContent: 'flex-start' }} onClick={() => { ImitationGlobal.state.store.page = 'Library'; ImitationGlobal.state.function.update() }}><MapIcon style={{ marginRight: 8, opacity: ImitationGlobal.state.store.page === 'Library' ? 1 : 0.2, transition: '1s all' }} />Library</Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth style={{ justifyContent: 'flex-start' }} onClick={() => { ImitationGlobal.state.store.page = 'Canvas'; ImitationGlobal.state.function.update() }}><MapIcon style={{ marginRight: 8, opacity: ImitationGlobal.state.store.page === 'Canvas' ? 1 : 0.2, transition: '1s all' }} />Canvas</Button>
          </Grid>
        </Grid>
      </NavigationAccordion>
    </Grid >

  </Grid >
}

function Theme() {
  const themeBase = 255
  const themeUnit = 15

  const average = (array) => array.reduce((t, i) => t + i, 0) / array.length

  const valueTheme = React.useMemo(() => {
    const background = average(ImitationGlobal.state.store.theme.palette.background.main.match(/\d+/g).map(i => Number(i)))
    const primary = average(ImitationGlobal.state.store.theme.palette.primary.main.match(/\d+/g).map(i => Number(i)))

    const backgroundLevel = background / themeBase * themeUnit
    const primaryLevel = (themeBase - primary) / themeBase * themeUnit

    const color = Math.floor(average([backgroundLevel, primaryLevel]))

    return color
  }, [JSON.stringify(ImitationGlobal.state.store.theme)])

  const onChangeTheme = (v) => {
    const background = `rgb(${v * themeBase / themeUnit}, ${v * themeBase / themeUnit}, ${v * themeBase / themeUnit})`
    const primary = `rgb(${themeBase - v * themeBase / themeUnit}, ${themeBase - v * themeBase / themeUnit}, ${themeBase - v * themeBase / themeUnit})`

    ImitationGlobal.state.store.theme.palette.background.main = background
    ImitationGlobal.state.store.theme.palette.primary.main = primary

    ImitationGlobal.dispatch()
  }

  return <Grid container spacing={2}>

    <Grid item xs={12}>
      <NavigationAccordion text={'Theme'} type={['global', 'theme']}>
        <Grid container spacing={2}>
          <Grid item xs={12}>Theme Color</Grid>
          <Grid item xs={12}>
            <Slider value={valueTheme} onChange={(e, v) => onChangeTheme(v)} min={0} max={themeUnit} step={1} />
          </Grid>
        </Grid>
      </NavigationAccordion>
    </Grid>

  </Grid>
}

function App() {
  return <>
    {
      ImitationNavigation.state.store.tooltip.type === 'Global.Theme' ? <Theme /> : null
    }
    {
      ImitationNavigation.state.store.tooltip.type === 'Global.Page' ? <Page /> : null
    }
  </>
}

const dependence = [
  { instance: ImitationNavigation, dependence: state => [state.store.tooltip.type, ...Object.values(state.store.expand.global)] },
  { instance: ImitationGlobal, dependence: state => [state.store.rect, state.store.recting, state.store.page, ...Object.values(state.store.theme.palette).map(i => i.main)] }
]

export default withBindComponentPure(App, dependence)