import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

import NavigationMap from './View.Navigation.Map'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'
import { HoverListener } from './View.Component.HoverListener'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

function App() {
  const timeRef = React.useRef()

  const initTime = () => {
    clearTimeout(timeRef.current)

    timeRef.current = setTimeout(() => { ImitationNavigation.state.store.mode = 0; ImitationNavigation.state.function.update(); }, 5000)
  }

  return <div style={{ position: 'absolute', zIndex: 1000, width: 0, height: 0, left: 0, right: 0, bottom: 8, margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

    <div style={{ position: 'absolute', bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: ImitationNavigation.state.store.mode === 0 ? 1 : 0, zIndex: ImitationNavigation.state.store.mode === 0 ? 1 : 0, pointerEvents: ImitationNavigation.state.store.mode === 0 ? 'auto' : 'none', transition: '1s all' }}>
      <AnimationRAF animation={opacityAnimation}>
        {
          ({ animationed, style }) => {
            return <HoverListener>
              {
                ({ hover, onMouseEnter, onMouseLeave }) => {
                  const translateY = [
                    ImitationNavigation.state.store.mode === 0 ?
                      hover || !animationed ? 2 : 2 * -1 :
                      2,
                    ImitationNavigation.state.store.mode === 0 ?
                      hover || !animationed ? 2 * -1 : 2 :
                      -2
                  ]
                  return <Button style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: animationed ? 1 : 0, transition: '1s all' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={() => { initTime(timeRef.current); ImitationNavigation.state.store.mode = 1; ImitationNavigation.state.function.update(); }}>
                    <RadioButtonUncheckedIcon style={{ opacity: 0.1 }} />
                    <ChangeHistoryIcon style={{ position: 'absolute', transform: `translateY(${translateY[0]}px)`, transition: '1s all' }} />
                    <ChangeHistoryIcon style={{ position: 'absolute', transform: `translateY(${translateY[1]}px) rotate(180deg)`, transition: '1s all' }} />
                  </Button>
                }
              }
            </HoverListener>
          }
        }
      </AnimationRAF>
    </div>

    <div style={{ position: 'absolute', bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: ImitationNavigation.state.store.mode === 1 ? 1 : 0, zIndex: ImitationNavigation.state.store.mode === 1 ? 1 : 0, pointerEvents: ImitationNavigation.state.store.mode === 1 ? 'auto' : 'none', transition: '1s all' }}>
      <div style={{ display: 'flex', flexWrap: 'nowrap', width: 'fit-content', maxWidth: ImitationGlobal.state.store.rect.width, padding: '0 8px', borderRadius: 8, overflowX: 'auto' }}>
        <AnimationRAF animation={opacityAnimation}>
          {
            ({ animationed, style }) => {
              const transitionDelay = (Math.random() * 0.5).toFixed(1)

              return <HoverListener>
                {
                  ({ hover, onMouseEnter, onMouseLeave }) => {
                    return <Button style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: `scale(${animationed && ImitationNavigation.state.store.mode === 1 ? 1 : 0})`, transition: '1s all', transitionDelay: `${transitionDelay}` }} onClick={() => { clearTimeout(timeRef.current); ImitationNavigation.state.store.mode = 0; ImitationNavigation.state.function.update(); }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                      <RadioButtonUncheckedIcon style={{ opacity: 0.1 }} />
                      <ChangeHistoryIcon style={{ position: 'absolute', transform: `translateY(${hover ? 2 * -1 : 2}px)`, transition: '1s all' }} />
                      <ChangeHistoryIcon style={{ position: 'absolute', transform: `translateY(${hover ? 2 : 2 * -1}px) rotate(180deg)`, transition: '1s all' }} />
                    </Button>
                  }
                }
              </HoverListener>
            }
          }
        </AnimationRAF>

        {
          NavigationMap
            .filter(i => {
              return i.Icon
            })
            .filter(i => {
              return i.page === '*' || i.page === ImitationGlobal.state.store.page || i.page.includes(ImitationGlobal.state.store.page)
            })
            .map(i => {
              return <AnimationRAF key={i._hash} animation={opacityAnimation}>
                {
                  ({ animationed, style }) => {
                    const transitionDelay = (Math.random() * 0.5).toFixed(1)
                    const disabled = i.page === 'Canvas' && ImitationPageCanvas.state.store.load === false
                    
                    return <HoverListener>
                      {
                        ({ hover, onMouseEnter, onMouseLeave }) => {
                          return <Button style={{ transform: `scale(${animationed && ImitationNavigation.state.store.mode === 1 ? 1 : 0})`, transition: '1s all', transitionDelay: `${transitionDelay}s` }} onClick={() => { clearTimeout(timeRef.current); ImitationNavigation.state.function.accordionWindowsAppend(i._hash) }} disabled={disabled} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                            <i.Icon style={{ transform: `translateY(${hover ? -2 : 0}px)`, transition: '1s all' }} />
                          </Button>
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

  </div>
}

const dependence = [
  { instance: ImitationGlobal, dependence: state => [ImitationGlobal.state.store.rect, ImitationGlobal.state.store.recting, ImitationGlobal.state.store.page] },
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)