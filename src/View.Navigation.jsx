import React from 'react'

import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Drawer from '@mui/material/Drawer'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'

import Imitation from './utils.imitation'
import { DrawerSX } from './utils.mui.sx'

const average = (array) => array.reduce((t, i) => t + i, 0) / array.length

const themeBase = 255
const themeUnit = 15

function App() {
  const [open, setOpen] = React.useState(false)

  const valueTheme = React.useMemo(() => {
    const background = average(Imitation.state.theme.palette.background.main.match(/\d+/g).map(i => Number(i)))
    const primary = average(Imitation.state.theme.palette.primary.main.match(/\d+/g).map(i => Number(i)))

    const background_ = background / themeBase * themeUnit
    const primary_ = (themeBase - primary) / themeBase * themeUnit

    const color = average([background_, primary_])

    const color_ = Math.floor(color)

    return color_
  }, [JSON.stringify(Imitation.state.theme)])

  const onChangeTheme = (v) => {
    const background = `rgb(${v * themeBase / themeUnit}, ${v * themeBase / themeUnit}, ${v * themeBase / themeUnit})`
    const primary = `rgb(${themeBase - v * themeBase / themeUnit}, ${themeBase - v * themeBase / themeUnit}, ${themeBase - v * themeBase / themeUnit})`

    Imitation.state.theme.palette.background.main = background
    Imitation.state.theme.palette.primary.main = primary

    Imitation.dispatch()
  }

  return <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AnimationRAF animation={opacityAnimation}>
        {
          ({ style }) => {
            return <Button variant='contained' style={{ padding: 0, width: 120, height: 4, minWidth: 'auto', transition: '1s all', ...style }} onClick={() => setOpen(true)} />
          }
        }
      </AnimationRAF>
    </div>

    <Drawer {...DrawerSX()} anchor='right' open={open} onClose={() => setOpen(false)}>
      <div style={{ padding: 16, width: 240, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
          {
            ['Library', 'Canvas'].map(i => {
              return <Button key={i} variant={i === Imitation.state.router ? 'contained' : 'outlined'} style={{ width: '100%', height: 32, marginBottom: 8 }} onClick={() => { Imitation.state.router = i; Imitation.dispatch() }}>{i}</Button>
            })
          }
        </div>

        <div style={{ width: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
          <Slider value={valueTheme} onChange={(e, v) => onChangeTheme(v)} min={0} max={themeUnit} step={1} />
        </div>
      </div>
    </Drawer>
  </>
}

export default Imitation.withBindRender(App, state => [JSON.stringify(state.theme), state.router])