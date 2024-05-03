import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'

import WidgetsIcon from '@mui/icons-material/Widgets'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'
import CloseIcon from '@mui/icons-material/Close'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

import NavigationMap from './View.Page.Canvas.Navigation.Map'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'
import { HoverListener } from './View.Component.HoverListener'
import { ClickAwayListenerIfOpen } from './View.Component.ClickAwayListenerIfOpen'

import { useDragControl as useDragControlMouse } from './View.Component.DragControl.Mouse'
import { useDragControl as useDragControlTouch } from './View.Component.DragControl.Touch'

import { ImitationGlobal, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { PopperSX, TextFieldSX, TextFieldSmallSX, DrawerSX, DialogSX, DividerSX, SwitchSX, AccordionSX, PaperSX } from './utils.mui.sx'

import { throttleLastRAF } from './utils.common'

function App() {
  const [expand, setExpand] = React.useState(false)

  return <>

    <div style={{ position: 'absolute', right: 8, top: 8, display: 'flex', zIndex: 1000, transition: '1s all' }}>
      <AnimationRAF animation={opacityAnimation}>
        {
          ({ animationed, style }) => {
            return <HoverListener>
              {
                ({ hover, onMouseEnter, onMouseLeave }) => {
                  var translateY = [(hover ? 2 * -1 : 2), (hover ? 2 : 2 * -1)]

                  if (expand === false) translateY = [translateY[0], translateY[1]]
                  if (expand === true) translateY = [translateY[1], translateY[0]]

                  return <IconButton style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: animationed ? 1 : 0, transition: '1s all' }} onClick={() => setExpand(!expand)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <WidgetsIcon color='primary' />
                    {/* <RadioButtonUncheckedIcon color='primary' style={{ opacity: 0.1 }} />
                    <ChangeHistoryIcon color='primary' style={{ position: 'absolute', transform: `translateY(${translateY[0]}px)`, transition: '1s all' }} />
                    <ChangeHistoryIcon color='primary' style={{ position: 'absolute', transform: `translateY(${translateY[1]}px) rotate(180deg)`, transition: '1s all' }} /> */}
                  </IconButton>
                }
              }
            </HoverListener>
          }
        }
      </AnimationRAF>
    </div>

    <div style={{ position: 'absolute', right: 8, top: 8 + 40, display: 'flex', zIndex: 1000, pointerEvents: expand === false ? 'none' : 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', width: 'fit-content', maxWidth: ImitationPageCanvas.state.store.rect.height - 16 - 40, overflowY: 'auto' }}>
        {
          NavigationMap
            .filter(i => i.Icon)
            .map((i, index) => {
              return <AnimationRAF key={index} animation={opacityAnimation}>
                {
                  ({ animationed, style }) => {
                    const transitionDelay = (Math.random() * 0.5).toFixed(1)

                    return <HoverListener>
                      {
                        ({ hover, onMouseEnter, onMouseLeave }) => {
                          return <ClickAwayListenerIfOpen onClick={({ inContainStart, inContainEnd, setOpen }) => { if (inContainStart === false && inContainEnd === false) setOpen(false) }}>
                            {
                              ({ open, setOpen, pushClickAwayRef }) => {
                                return <Tooltip
                                  PopperProps={{ sx: PopperSX() }}
                                  placement='left'
                                  open={open}
                                  title={
                                    <Paper sx={PaperSX()} style={{ padding: 16, width: 320 }} ref={el => pushClickAwayRef(el)}>
                                      <i.Component pushClickAwayRefs={[pushClickAwayRef]} />
                                    </Paper>
                                  }
                                  children={
                                    <IconButton style={{ transform: `scale(${animationed && expand === true ? 1 : 0})`, transition: '1s all', transitionDelay: `${transitionDelay}s` }} ref={el => pushClickAwayRef(el)} onClick={() => setOpen(true)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                                      <i.Icon color='primary' style={{ transform: `translateY(${hover ? -2 : 0}px)`, transition: '1s all' }} />
                                    </IconButton>
                                  }
                                />
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

  </>
}

const dependence = [
  {
    instance: ImitationPageCanvas, dependence: state => [
      ImitationPageCanvas.state.store.rect,
      ImitationPageCanvas.state.store.recting
    ]
  }
]

export default withBindComponentPure(App, dependence)