import React from 'react'

import Button from '@mui/material/Button'

import SettingsIcon from '@mui/icons-material/Settings'
import AllOutIcon from '@mui/icons-material/AllOut'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'

import Imitation from './utils.imitation'

import './View.Page.Canvas.Imitation'

function ToolAction() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '1s all', flexShrink: 0, margin: 2 }

  const styleButtonActive = (boolean) => ({ transform: boolean ? 'rotate(45deg)' : undefined })

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AnimationRAF animation={opacityAnimation}>
        {
          ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => { Imitation.state['page.canvas'].setting.dialog = true; Imitation.dispatch(); }} children={<SettingsIcon />} />
        }
      </AnimationRAF>

      <AnimationRAF animation={opacityAnimation}>
        {
          ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => { Imitation.state['page.canvas'].fullview = !Imitation.state['page.canvas'].fullview; Imitation.dispatch(); }} children={<AllOutIcon style={{ ...styleButtonActive(Imitation.state['page.canvas'].fullview), transitionDuration: '1s', transitionProperty: 'transform' }} />} />
        }
      </AnimationRAF>
    </div>

  </div>
}

function ToolPagination() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '1s all', flexShrink: 0, margin: 2 }

  const canvasArray = Imitation.state['page.canvas'].canvas
  const canvasLength = Imitation.state['page.canvas'].canvas.length

  const canvasFind = Imitation.state['page.canvas.memo'].canvasFind(Imitation.state['page.canvas'].control.hash)
  const canvasFindIndex = Imitation.state['page.canvas.memo'].canvasFindIndex(Imitation.state['page.canvas'].control.hash)

  const canvasArrayMap = canvasArray.map((i, index) => ({ ...i, index: index }))
  const canvasArraySort = [...canvasArrayMap.slice(canvasFindIndex + 1, canvasLength), ...canvasArrayMap.slice(0, canvasFindIndex)]

  const max = 4
  const previous = canvasArraySort.slice(-max)
  const next = canvasArraySort.slice(0, max)

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {
      previous.map((i, index) => {
        return <AnimationRAF animation={opacityAnimation} key={'previous' + index}>
          {
            ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => Imitation.state['page.canvas.function'].onSwitch({ hash: i._hash, direction: 0 })}>{String(Number(i.index) + 1).padStart(2, '0')}</Button>
          }
        </AnimationRAF>
      })
    }

    <AnimationRAF animation={opacityAnimation}>
      {
        ({ style }) => <Button variant='contained' style={{ ...styleButton, ...style, transition: '1s all' }} color='primary' onClick={() => Imitation.state['page.canvas.function'].onSwitch({ hash: canvasFind._hash, direction: 2 })}>{String(Number(canvasFindIndex) + 1).padStart(2, '0')}</Button>
      }
    </AnimationRAF>

    {
      next.map((i, index) => {
        return <AnimationRAF animation={opacityAnimation} key={'next' + index}>
          {
            ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => Imitation.state['page.canvas.function'].onSwitch({ hash: i._hash, direction: 1 })}>{String(Number(i.index) + 1).padStart(2, '0')}</Button>
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