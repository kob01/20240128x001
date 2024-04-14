import React from 'react'

import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Slider from '@mui/material/Slider'

import { CirclePicker, HuePicker, AlphaPicker } from 'react-color'

import { ClickAwayListener } from './View.Component.ClickAwayListener'
import { ColorPicker } from './View.Component.ColorPicker'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

import { rgbaSpilt } from './utils.common'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App() {
  const backgroundRgbaSpilt = rgbaSpilt(ImitationGlobal.state.store.theme.palette.background.main)
  const primaryRgbaSpilt = rgbaSpilt(ImitationGlobal.state.store.theme.palette.primary.main)

  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        Theme Color Background
      </div>
      <div>
        <ClickAwayListener>
          {
            ({ open, setOpen, pushClickAwayRef }) => {
              return <Tooltip
                {...TooltipSX()}
                open={open}
                title={
                  <Paper {...PaperSX()} style={{ padding: 16, width: 320 }} ref={el => pushClickAwayRef('Paper', el)}>
                    <ColorPicker value={ImitationGlobal.state.store.theme.palette.background.main} onChange={v => { ImitationGlobal.state.store.theme.palette.background.main = v; ImitationGlobal.state.function.updateThrottleLastRIC() }} colors={['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)']} />
                  </Paper>
                }
                children={
                  <Button variant='contained' style={{ background: ImitationGlobal.state.store.theme.palette.background.main, color: ImitationGlobal.state.store.theme.palette.primary.main }} onClick={() => setOpen(true)} ref={el => pushClickAwayRef('Button', el)}>Pick</Button>
                }
              />
            }
          }
        </ClickAwayListener>
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        Theme Color Primary
      </div>
      <div>
        <ClickAwayListener>
          {
            ({ open, setOpen, pushClickAwayRef }) => {
              return <Tooltip
                {...TooltipSX()}
                open={open}
                title={
                  <Paper {...PaperSX()} style={{ padding: 16, width: 320 }} ref={el => pushClickAwayRef('Paper', el)}>
                    <ColorPicker value={ImitationGlobal.state.store.theme.palette.primary.main} onChange={v => { ImitationGlobal.state.store.theme.palette.primary.main = v; ImitationGlobal.state.function.updateThrottleLastRIC() }} colors={['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)']} />
                  </Paper>
                }
                children={
                  <Button variant='contained' style={{ background: ImitationGlobal.state.store.theme.palette.background.main, color: ImitationGlobal.state.store.theme.palette.primary.main }} onClick={() => setOpen(true)} ref={el => pushClickAwayRef('Button', el)}>Pick</Button>
                }
              />
            }
          }
        </ClickAwayListener>
      </div>
    </Grid>
  </Grid>
}

const dependence = [
  { instance: ImitationGlobal, dependence: state => [...Object.values(ImitationGlobal.state.store.theme.palette).map(i => i.main)] }
]

export default withBindComponentPure(App, dependence)