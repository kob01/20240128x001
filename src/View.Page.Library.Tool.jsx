import React from 'react'

import Button from '@mui/material/Button'

import AllOutIcon from '@mui/icons-material/AllOut'
import SettingsIcon from '@mui/icons-material/Settings'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'

import Imitation from './utils.imitation'

function ToolAction() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '1s all', flexShrink: 0, margin: 2 }

  const styleButtonActive = (boolean) => ({ transform: boolean ? 'rotate(45deg)' : undefined })

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <AnimationRAF animation={opacityAnimation}>
      {
        ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => { Imitation.state['page.library'].setting.dialog = true; Imitation.dispatch(); }} children={<SettingsIcon />} />
      }
    </AnimationRAF>

    <AnimationRAF animation={opacityAnimation}>
      {
        ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => { Imitation.state['page.library'].fullview = !Imitation.state['page.library'].fullview; Imitation.dispatch(); }} children={<AllOutIcon style={{ ...styleButtonActive(Imitation.state['page.library'].fullview), transitionDuration: '1s', transitionProperty: 'transform' }} />} />
      }
    </AnimationRAF>
  </div>
}

function ToolPagination() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '1s all', flexShrink: 0, margin: 2 }

  const sourceArray = Imitation.state['page.library'].source
  const sourceLength = Imitation.state['page.library'].source.length

  const sourceFindFirst = Imitation.state['page.library.memo'].sourceFind(Imitation.state['page.library'].render[0].hash)
  const sourceFindIndexFirst = Imitation.state['page.library.memo'].sourceFindIndex(Imitation.state['page.library'].render[0].hash)

  const sourceArrayMap = sourceArray.map((i, index) => ({ ...i, index: index }))
  const sourceArraySort = [...sourceArrayMap.slice(sourceFindIndexFirst + 1, sourceLength), ...sourceArrayMap.slice(0, sourceFindIndexFirst)]

  const max = 4
  const previous = sourceArraySort.slice(-max)
  const next = sourceArraySort.slice(0, max)

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {
      previous.map((i, index) => {
        return <AnimationRAF animation={opacityAnimation} key={'previous' + index}>
          {
            ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => Imitation.state['page.library.function'].onSwitch({ hash: i._hash, direction: 0 })}>{String(Number(i.index) + 1).padStart(2, '0')}</Button>
          }
        </AnimationRAF>
      })
    }

    <AnimationRAF animation={opacityAnimation}>
      {
        ({ style }) => <Button variant='contained' style={{ ...styleButton, ...style, transition: '1s all' }} color='primary' onClick={() => Imitation.state['page.library.function'].onSwitch({ hash: sourceFindFirst._hash, direction: 2 })}>{String(Number(sourceFindIndexFirst) + 1).padStart(2, '0')}</Button>
      }
    </AnimationRAF>

    {
      next.map((i, index) => {
        return <AnimationRAF animation={opacityAnimation} key={'next' + index}>
          {
            ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => Imitation.state['page.library.function'].onSwitch({ hash: i._hash, direction: 1 })}>{String(Number(i.index) + 1).padStart(2, '0')}</Button>
          }
        </AnimationRAF>
      })
    }
  </div>

}

function App() {
  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap' }}>
    <ToolPagination />
    <ToolAction />
  </div>
}

export default App