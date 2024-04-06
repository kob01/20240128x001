import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'

import NavigationContentGlobal from './View.Navigation.Content.Global'
import NavigationContentCanvas from './View.Navigation.Content.Canvas'
import NavigationContentLibrary from './View.Navigation.Content.Library'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'
import { HoverListener } from './View.Component.HoverListener'

import { ImitationGlobal, ImitationNavigation, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

import { rgba } from './utils.common'

function App() {
  React.useEffect(() => {
    ImitationNavigation.state.store.open = false
    ImitationNavigation.state.function.tooltip()
    ImitationNavigation.state.function.update()
  }, [ImitationGlobal.state.store.page])

  return <>

    {
      ImitationNavigation.state.store.open === true ?
        <AnimationRAF animation={opacityAnimation}>
          {
            ({ style }) => {
              return <HoverListener>
                {
                  ({ hover, onMouseEnter, onMouseLeave }) => {
                    return <Paper {...PaperSX()} style={{ position: 'absolute', zIndex: 10, bottom: 8, left: 0, right: 0, margin: 'auto', width: 'fit-content', maxWidth: 'calc(100% - 16px)', overflowY: 'auto', background: hover ? rgba(ImitationGlobal.state.store.theme.palette.background.main, 1) : rgba(ImitationGlobal.state.store.theme.palette.background.main, 0.2), transition: '1s all', ...style }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                      <Grid container spacing={0} style={{ display: 'flex', flexWrap: 'nowrap', width: 'fit-content', padding: '4px 16px' }}>

                        <NavigationContentGlobal />

                        {
                          ImitationGlobal.state.store.page === 'Library' ? <NavigationContentLibrary /> : null
                        }

                        {
                          ImitationGlobal.state.store.page === 'Canvas' ? <NavigationContentCanvas /> : null
                        }

                      </Grid>
                    </Paper>
                  }
                }
              </HoverListener>
            }
          }
        </AnimationRAF>
        : null
    }

    {
      ImitationNavigation.state.store.open === false ?
        <AnimationRAF animation={opacityAnimation}>
          {
            ({ style }) => {
              return <HoverListener>
                {
                  ({ hover, onMouseEnter, onMouseLeave }) => {
                    return <div style={{ position: 'absolute', zIndex: 10, bottom: 8, left: 0, right: 0, margin: 'auto', width: 'fit-content', maxWidth: 'calc(100% - 16px)', transition: '1s all', ...style }}>
                      <Button color='primary' variant='contained' style={{ opacity: hover ? 1 : 0.2, transition: '1s all' }} onClick={() => { ImitationNavigation.state.store.open = !ImitationNavigation.state.store.open; ImitationNavigation.state.function.update() }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} children={<ChangeHistoryIcon />} />
                    </div>
                  }
                }
              </HoverListener>
            }
          }
        </AnimationRAF>
        : null
    }

  </>
}

const dependence = [
  { instance: ImitationGlobal, dependence: state => [state.store.page] },
  { instance: ImitationNavigation, dependence: state => [state.store.open] }
]

export default withBindComponentPure(App, dependence)