import React from 'react'

import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Drawer from '@mui/material/Drawer'

import { DrawerSX } from './utils.mui.sx'

import Imitation from './utils.imitation'

const average = (array) => array.reduce((t, i) => t + i, 0) / array.length

const themeBase = 255
const themeUnit = 15

function App() {

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
    <Drawer {...DrawerSX()} anchor='right' open={Imitation.state['page.navigation'].drawer} onClose={() => { Imitation.state['page.navigation'].drawer = false; Imitation.dispatch() }}>
      <div style={{ padding: 16, width: 240, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
          <Button variant='outlined' style={{ width: '100%', height: 32, marginBottom: 8 }}>CHECK</Button>
          <Button variant='outlined' style={{ width: '100%', height: 32, marginBottom: 8 }}>BATTLE & PVE</Button>
          <Button variant='outlined' style={{ width: '100%', height: 32, marginBottom: 8 }}>SETTINGS</Button>
          <Button variant='outlined' style={{ width: '100%', height: 32 }}>PAINT</Button>
        </div>

        <div style={{ width: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
          <Slider value={valueTheme} onChange={(e, v) => onChangeTheme(v)} min={0} max={themeUnit} step={1} />
        </div>
      </div>
    </Drawer>
  </>
}

export default Imitation.withBindRender(App, state => [JSON.stringify(state.theme), JSON.stringify(state['page.navigation'])])