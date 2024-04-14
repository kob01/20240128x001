import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'

import NavigationMap from './View.Navigation.Map'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'
import { HoverListener } from './View.Component.HoverListener'

import { ImitationGlobal, ImitationNavigation, withBindComponentPure } from './Imitation'

import { rgba } from './utils.common'

function App() {
  return <div style={{ position: 'absolute', zIndex: 1000, width: 'fit-content', maxWidth: ImitationGlobal.state.store.rect.width - 16, height: 'fit-content', left: 0, right: 0, bottom: 8, margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

    {
      ImitationNavigation.state.store.mode === 0 ?
        <AnimationRAF animation={opacityAnimation}>
          {
            ({ style }) => {
              return <HoverListener>
                {
                  ({ hover, onMouseEnter, onMouseLeave }) => {
                    return <Button color='primary' variant='contained' style={{ opacity: Math.min(style.opacity, hover ? 1 : 0.2), transition: '1s all' }} onClick={() => { ImitationNavigation.state.store.mode = 1; ImitationNavigation.state.store.open = false; ImitationNavigation.state.function.update(); }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} children={<ChangeHistoryIcon />} />
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
              return <div style={{ width: 'fit-content', maxWidth: '100%', overflowY: 'auto', borderRadius: 8, background: rgba(ImitationGlobal.state.store.theme.palette.background.main, 0.5), transition: '1s all', ...style }}>
                <Grid container spacing={0} style={{ display: 'flex', flexWrap: 'nowrap', width: 'fit-content', padding: '4px 12px' }}>
                  {
                    NavigationMap
                      .filter(i => {
                        return i.Icon
                      })
                      .filter(i => {
                        return i.page === '*' || i.page === ImitationGlobal.state.store.page || i.page.includes(ImitationGlobal.state.store.page)
                      })
                      .map(i => {
                        return <Button key={i._hash} onClick={() => { ImitationNavigation.state.function.renderWindowsAppend(i._hash) }} children={<i.Icon />} />
                      })
                  }
                </Grid>
              </div>
            }
          }
        </AnimationRAF>
        : null
    }

  </div>
}

const dependence = [
  { instance: ImitationGlobal, dependence: state => [ImitationGlobal.state.store.rect, ImitationGlobal.state.store.recting, ImitationGlobal.state.store.page] }
]

export default withBindComponentPure(App, dependence)