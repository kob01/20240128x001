import React from 'react'

import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import MapIcon from '@mui/icons-material/Map'

import { ImitationGlobal, ImitationPageCanvas, ImitationPageLibrary, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX } from './utils.mui.sx'

const average = (array) => array.reduce((t, i) => t + i, 0) / array.length

const themeBase = 255
const themeUnit = 15

function Content() {
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

  const onChangeMode = (e) => {
    ImitationGlobal.state.store.navigation.mode = e.target.value

    if (e.target.value === 0) {
      ImitationPageCanvas.state.store.navigation.open = true
      ImitationPageLibrary.state.store.navigation.open = true
    }

    if (e.target.value === 1) {
      ImitationPageCanvas.state.store.navigation.open = false
      ImitationPageLibrary.state.store.navigation.open = false
    }

    ImitationGlobal.state.function.update()
    ImitationPageCanvas.state.function.update()
    ImitationPageLibrary.state.function.update()
  }

  return <div style={{ width: 360, height: '100%', padding: 16 }}>
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationGlobal.state.store.navigation.expand[0]} onChange={(e, v) => { ImitationGlobal.state.store.navigation.expand[0] = v; ImitationGlobal.state.function.update() }}>
          <AccordionSummary>View</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>Theme Color</Grid>
              <Grid item xs={12}>
                <Slider value={valueTheme} onChange={(e, v) => onChangeTheme(v)} min={0} max={themeUnit} step={1} />
              </Grid>
              <Grid item xs={12}>Drawer Mode</Grid>
              <Grid item xs={12}>
                <FormControl sx={SelectSX().sx} fullWidth>
                  <Select {...SelectSX()} value={ImitationGlobal.state.store.navigation.mode} onChange={onChangeMode}>
                    <MenuItem value={0}>Static</MenuItem>
                    <MenuItem value={1}>Float</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationGlobal.state.store.navigation.expand[1]} onChange={(e, v) => { ImitationGlobal.state.store.navigation.expand[1] = v; ImitationGlobal.state.function.update() }}>
          <AccordionSummary>Page</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button fullWidth style={{ position: 'relative' }} variant={'Library' === ImitationGlobal.state.store.router ? 'contained' : 'outlined'} onClick={() => { ImitationGlobal.state.store.router = 'Library'; ImitationGlobal.dispatch() }}><MapIcon style={{ position: 'absolute', left: 8, top: 0, bottom: 0, margin: 'auto' }} />Library</Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth style={{ position: 'relative' }} variant={'Canvas' === ImitationGlobal.state.store.router ? 'contained' : 'outlined'} onClick={() => { ImitationGlobal.state.store.router = 'Canvas'; ImitationGlobal.dispatch() }}><MapIcon style={{ position: 'absolute', left: 8, top: 0, bottom: 0, margin: 'auto' }} />Canvas</Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

    </Grid>
  </div>
}

function App() {
  const onChange = () => {
    ImitationGlobal.state.store.navigation.open = !ImitationGlobal.state.store.navigation.open
    ImitationGlobal.state.function.update()
  }

  return <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button variant='contained' style={{ padding: 0, width: 120, height: 4, minWidth: 'auto' }} onClick={() => onChange()} />
    </div>

    <Drawer {...DrawerSX()} anchor='right' open={ImitationGlobal.state.store.navigation.open} onClose={() => onChange()}>
      <Content />
    </Drawer>
  </>
}

const dependence = [{ instance: ImitationGlobal, dependence: state => [state.store.router, state.store.navigation.open, state.store.navigation.mode, ...state.store.navigation.expand] }]

export default withBindComponentPure(App, dependence)