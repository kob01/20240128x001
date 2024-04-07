import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'
import CloseIcon from '@mui/icons-material/Close'

import NavigationContentGlobal from './View.Navigation.Content.Global'
import NavigationContentLibrary from './View.Navigation.Content.Library'
import NavigationContentCanvas from './View.Navigation.Content.Canvas'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'
import { ClickAwayListener } from './View.Component.ClickAwayListener'
import { HoverListener } from './View.Component.HoverListener'

import { ImitationGlobal, ImitationNavigation, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX, TooltipSXNavigation } from './utils.mui.sx'

import { rgba } from './utils.common'

function App() {

  const hoverAnimationOpacity = (hover, animation) => Math.min(animation.opacity, hover ? 1 : 0.2)

  const onMode1 = () => {
    ImitationNavigation.state.store.mode = 1
    ImitationNavigation.state.store.tooltip.open = false
    ImitationNavigation.state.function.update()
  }

  // React.useEffect(() => {
  //   ImitationNavigation.state.store.open = false
  //   ImitationNavigation.state.function.tooltip()
  //   ImitationNavigation.state.function.update()
  // }, [ImitationGlobal.state.store.page])

  return <ClickAwayListener>
    {
      ({ open, setOpen, pushClickAwayRef }) => {
        return <Tooltip
          {...TooltipSX()}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          open={ImitationNavigation.state.store.tooltip.open}
          onClose={onMode1}
          title={
            <Paper {...PaperSX()} style={{ width: 480, maxWidth: ImitationGlobal.state.store.rect.width - 36, height: 'fit-content', maxHeight: ImitationGlobal.state.store.rect.height - 180, padding: 16, overflowY: 'auto', background: 'none' }} ref={el => pushClickAwayRef('paper', el)}>
              <NavigationContentGlobal />
              <NavigationContentLibrary />
              <NavigationContentCanvas />
            </Paper>
          }
          children={
            <div style={{ position: 'absolute', zIndex: 10, width: 0, eight: 0, left: 0, right: 0, bottom: 48, margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ position: 'absolute', width: 'fit-content', maxWidth: ImitationGlobal.state.store.rect.width - 16, height: 'fit-content', top: 0 }}>

                {
                  ImitationNavigation.state.store.mode === 0 ?
                    <AnimationRAF animation={opacityAnimation}>
                      {
                        ({ style }) => {
                          return <HoverListener>
                            {
                              ({ hover, onMouseEnter, onMouseLeave }) => {
                                return <Button color='primary' variant='contained' style={{ opacity: Math.min(style.opacity, hover ? 1 : 0.2), transition: '1s all' }} onClick={onMode1} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} children={<ChangeHistoryIcon />} ref={el => pushClickAwayRef('Guide', el)} />
                              }
                            }
                          </HoverListener>
                        }
                      }
                    </AnimationRAF>
                    : null
                }

                {
                  ImitationNavigation.state.store.mode === 1 ?
                    <AnimationRAF animation={opacityAnimation}>
                      {
                        ({ style }) => {
                          return <HoverListener>
                            {
                              ({ hover, onMouseEnter, onMouseLeave }) => {
                                return <div style={{ width: 'fit-content', maxWidth: '100%', overflowY: 'auto', background: rgba(ImitationGlobal.state.store.theme.palette.background.main, hover ? 1 : 0.2), borderRadius: 8, transition: '1s all', ...style }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={el => pushClickAwayRef('Action', el)}>
                                  <Grid container spacing={0} style={{ display: 'flex', flexWrap: 'nowrap', width: 'fit-content', padding: '4px 16px' }}>

                                    <Button onClick={() => { ImitationNavigation.state.store.mode = 2; ImitationNavigation.state.store.tooltip.open = true; ImitationNavigation.state.store.tooltip.type = 'Global.Theme'; ImitationNavigation.state.function.update(); }} children='Theme' />
                                    <Button onClick={() => { ImitationNavigation.state.store.mode = 2; ImitationNavigation.state.store.tooltip.open = true; ImitationNavigation.state.store.tooltip.type = 'Global.Page'; ImitationNavigation.state.function.update(); }} children='Page' />

                                    {
                                      ImitationGlobal.state.store.page === 'Library' ?
                                        <>
                                          <Button onClick={() => { ImitationNavigation.state.store.mode = 2; ImitationNavigation.state.store.tooltip.open = true; ImitationNavigation.state.store.tooltip.type = 'Library.View'; ImitationNavigation.state.function.update(); }} children='View' />
                                          <Button onClick={() => { ImitationNavigation.state.store.mode = 2; ImitationNavigation.state.store.tooltip.open = true; ImitationNavigation.state.store.tooltip.type = 'Library.Information'; ImitationNavigation.state.function.update(); }} children='Information' />
                                          <Button onClick={() => { ImitationNavigation.state.store.mode = 2; ImitationNavigation.state.store.tooltip.open = true; ImitationNavigation.state.store.tooltip.type = 'Library.Pagination'; ImitationNavigation.state.function.update(); }} children='Pagination' />
                                        </>
                                        : null
                                    }

                                    {
                                      ImitationGlobal.state.store.page === 'Canvas' ?
                                        <>
                                          <Button onClick={() => { ImitationNavigation.state.store.mode = 2; ImitationNavigation.state.store.tooltip.open = true; ImitationNavigation.state.store.tooltip.type = 'Canvas.View'; ImitationNavigation.state.function.update(); }} children='View' />
                                          <Button onClick={() => { ImitationNavigation.state.store.mode = 2; ImitationNavigation.state.store.tooltip.open = true; ImitationNavigation.state.store.tooltip.type = 'Canvas.Basic'; ImitationNavigation.state.function.update(); }} children='Basic' />
                                          <Button onClick={() => { ImitationNavigation.state.store.mode = 2; ImitationNavigation.state.store.tooltip.open = true; ImitationNavigation.state.store.tooltip.type = 'Canvas.Paint'; ImitationNavigation.state.function.update(); }} children='Paint' />
                                          <Button onClick={() => { ImitationNavigation.state.store.mode = 2; ImitationNavigation.state.store.tooltip.open = true; ImitationNavigation.state.store.tooltip.type = 'Canvas.Layer'; ImitationNavigation.state.function.update(); }} children='Layer' />
                                        </>
                                        : null
                                    }

                                  </Grid>
                                </div>
                              }
                            }
                          </HoverListener>
                        }
                      }
                    </AnimationRAF>
                    : null
                }

                {
                  ImitationNavigation.state.store.mode === 2 ?
                    <AnimationRAF animation={opacityAnimation}>
                      {
                        ({ style }) => {
                          return <HoverListener>
                            {
                              ({ hover, onMouseEnter, onMouseLeave }) => {
                                return <Button color='primary' variant='contained' style={{ opacity: Math.min(style.opacity, hover ? 1 : 0.2), transition: '1s all' }} onClick={onMode1} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} children={<CloseIcon />} ref={el => pushClickAwayRef('Close', el)} />
                              }
                            }
                          </HoverListener>
                        }
                      }
                    </AnimationRAF>
                    : null
                }

              </div>
            </div>
          }
        />
      }
    }
  </ClickAwayListener>
}

const dependence = [
  { instance: ImitationGlobal, dependence: state => [state.store.page] },
  { instance: ImitationNavigation, dependence: state => [state.store.mode, state.store.tooltip.open, state.store.tooltip.type] }
]

export default withBindComponentPure(App, dependence)