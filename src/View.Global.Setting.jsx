import React from 'react'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import Slider from '@mui/material/Slider'
import Divider from '@mui/material/Divider'

import MapIcon from '@mui/icons-material/Map'
import SendIcon from '@mui/icons-material/Send'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import SettingsIcon from '@mui/icons-material/Settings'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'
import { ClickAwayListenerIfOpen } from './View.Component.ClickAwayListenerIfOpen'
import { HoverListener } from './View.Component.HoverListener'
import { ResizeObserverListener } from './View.Component.ResizeObserverListener'
import { ColorPicker } from './View.Component.ColorPicker'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

import { PopperSX, TextFieldSX, TextFieldSmallSX, DrawerSX, DialogSX, DividerSX, SwitchSX, AccordionSX, PaperSX } from './utils.mui.sx'

import { hash, throttleLastRAF, throttleLastRIC } from './utils.common'

function Page() {

  return <Grid container spacing={0}>
    <Grid item xs={12} style={{ height: 32 }}>
      <Button fullWidth component='div' style={{ justifyContent: 'space-between', alignItems: 'center', padding: '5.5px 8px' }} onClick={(e) => { ImitationGlobal.state.store.page = 'Library'; ImitationGlobal.state.function.update() }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MapIcon color='primary' fontSize='small' style={{ opacity: ImitationGlobal.state.store.page === 'Library' ? 1 : 0.2, transition: '1s all' }} />
          <div style={{ margin: '0 8px', fontSize: 12 }}>Library</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SendIcon color='primary' fontSize='small' />
        </div>
      </Button>
    </Grid>
    <Grid item xs={12} style={{ height: 32 }}>
      <Button fullWidth component='div' style={{ justifyContent: 'space-between', alignItems: 'center', padding: '5.5px 8px' }} onClick={(e) => { ImitationGlobal.state.store.page = 'Canvas'; ImitationGlobal.state.function.update() }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MapIcon color='primary' fontSize='small' style={{ opacity: ImitationGlobal.state.store.page === 'Canvas' ? 1 : 0.2, transition: '1s all' }} />
          <div style={{ margin: '0 8px', fontSize: 12 }}>Canvas</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SendIcon color='primary' fontSize='small' />
        </div>
      </Button>
    </Grid>
  </Grid>
}

function Theme(props) {
  const colors = [
    'rgba(255, 0, 0, 1)',
    'rgba(0, 255, 0, 1)',
    'rgba(0, 0, 255, 1)',
  ]

  const updateThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationGlobal.state.function.update), [])

  return <Grid container spacing={0} style={{ fontSize: 12 }}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>
        Theme Color Background
      </div>
      <div>
        <ClickAwayListenerIfOpen onClick={({ inContainStart, inContainEnd, setOpen }) => { if (inContainStart === false && inContainEnd === false) setOpen(false) }}>
          {
            ({ open, setOpen, pushIgnoreTarget }) => {
              return <ResizeObserverListener>
                {
                  ({ pushResizeTarget }) => {
                    return <Tooltip
                      PopperProps={{ sx: PopperSX() }}
                      open={open}
                      title={
                        <div style={{ padding: 8, width: 320 }} ref={el => [...props.pushIgnoreTargets, pushIgnoreTarget, pushResizeTarget].forEach(i => i(el))}>
                          <Paper sx={PaperSX()} style={{ padding: 16 }}>
                            <ColorPicker value={ImitationGlobal.state.store.theme.palette.background.main} onChange={v => { ImitationGlobal.state.store.theme.palette.background.main = v; updateThrottleLastRAF() }} colors={colors} />
                          </Paper>
                        </div>
                      }
                      children={
                        <Button variant='contained' style={{ width: 42, height: 24, minWidth: 'initial', background: ImitationGlobal.state.store.theme.palette.background.main }} onClick={() => setOpen(!open)} ref={el => [...props.pushIgnoreTargets, pushIgnoreTarget].forEach(i => i(el))}></Button>
                      }
                    />
                  }
                }
              </ResizeObserverListener>
            }
          }
        </ClickAwayListenerIfOpen>
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>
        Theme Color Primary
      </div>
      <div>
        <ClickAwayListenerIfOpen onClick={({ inContainStart, inContainEnd, setOpen }) => { if (inContainStart === false && inContainEnd === false) setOpen(false) }}>
          {
            ({ open, setOpen, pushIgnoreTarget }) => {
              return <ResizeObserverListener>
                {
                  ({ pushResizeTarget }) => {
                    return <Tooltip
                      PopperProps={{ sx: PopperSX() }}
                      open={open}
                      title={
                        <div style={{ padding: 8, width: 320 }} ref={el => [...props.pushIgnoreTargets, pushIgnoreTarget, pushResizeTarget].forEach(i => i(el))}>
                          <Paper sx={PaperSX()} style={{ padding: 16 }}>
                            <ColorPicker value={ImitationGlobal.state.store.theme.palette.primary.main} onChange={v => { ImitationGlobal.state.store.theme.palette.primary.main = v; updateThrottleLastRAF() }} colors={colors} />
                          </Paper>
                        </div>
                      }
                      children={
                        <Button variant='contained' style={{ width: 42, height: 24, minWidth: 'initial', background: ImitationGlobal.state.store.theme.palette.primary.main }} onClick={() => setOpen(!open)} ref={el => [...props.pushIgnoreTargets, pushIgnoreTarget].forEach(i => i(el))}></Button>
                      }
                    />
                  }
                }
              </ResizeObserverListener>
            }
          }
        </ClickAwayListenerIfOpen>
      </div>
    </Grid>
  </Grid >
}

const ThemeComponent = withBindComponentPure(
  Theme,
  [
    {
      instance: ImitationGlobal, dependence: state => []
    }
  ]
)

function App() {
  return <div style={{ position: 'absolute', left: 8, top: 8, display: 'flex', zIndex: 1000, transition: '1s all' }}>
    <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', width: 'fit-content', overflowX: 'auto' }}>
      {
        [
          { Component: ThemeComponent, Icon: SettingsIcon },
        ]
          .map((i, index) => {
            return <AnimationRAF key={index} animation={opacityAnimation}>
              {
                ({ animationed, style }) => {
                  return <HoverListener>
                    {
                      ({ hover, onMouseEnter, onMouseLeave }) => {
                        return <ClickAwayListenerIfOpen onClick={({ inContainStart, inContainEnd, setOpen }) => { if (inContainStart === false && inContainEnd === false) setOpen(false) }}>
                          {
                            ({ open, setOpen, pushIgnoreTarget }) => {
                              return <ResizeObserverListener>
                                {
                                  ({ pushResizeTarget }) => {
                                    return <Tooltip
                                      PopperProps={{ sx: PopperSX() }}
                                      placement='right'
                                      open={open}
                                      title={
                                        <div style={{ padding: 8, width: 320 }} ref={el => [pushIgnoreTarget, pushResizeTarget].forEach(i => i(el))} >
                                          <Paper sx={PaperSX()} style={{ padding: 16 }}>
                                            <i.Component pushIgnoreTargets={[pushIgnoreTarget]} />
                                          </Paper>
                                        </div>
                                      }
                                      children={
                                        <IconButton style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: animationed ? 1 : 0, transition: '1s all' }} ref={el => pushIgnoreTarget(el)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={() => setOpen(!open)}>
                                          <i.Icon color='primary' style={{ transform: `translateY(${hover ? -2 : 0}px)`, transition: '1s all' }} />
                                        </IconButton>
                                      }
                                    />
                                  }
                                }
                              </ResizeObserverListener>
                            }
                          }
                        </ClickAwayListenerIfOpen>
                      }
                    }
                  </HoverListener>
                }
              }
            </AnimationRAF>
          })
      }
    </div>
  </div>
}

const dependence = [{
  instance: ImitationGlobal, dependence: state => []
}]

export default withBindComponentPure(App, dependence)