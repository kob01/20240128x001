import React from 'react'

import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { ClickAwayListenerIfOpen } from './View.Component.ClickAwayListenerIfOpen'
import { ColorPicker } from './View.Component.ColorPicker'

import { TextFieldSXSmall, TooltipSX, PaperSX } from './utils.mui.sx'

import { hash } from './utils.common'

const _hash = '51KV6F3DJ4BWEVYS'

const type = 'Line'

const name = 'Line-V1'

function settingComponent(props) {
  const { value, onChange, inDraw, inOperation } = props

  const [pathIndex, setPathIndex] = React.useState(0)

  return <Grid container spacing={0}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>
        Color
      </div>
      <div>
        <ClickAwayListenerIfOpen onClick={({ inContainStart, inContainEnd, setOpen }) => { if (inContainStart === false && inContainEnd === false) setOpen(false) }}>
          {
            ({ open, setOpen, pushClickAwayRef }) => {
              return <Tooltip
                {...TooltipSX()}
                open={open}
                title={
                  <Paper {...PaperSX()} style={{ padding: 16, width: 320 }} ref={el => pushClickAwayRef('Paper', el)}>
                    <ColorPicker value={value.color} onChange={v => { value.color = v; onChange(); }} colors={['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)']} />
                  </Paper>
                }
                children={
                  <Button variant='contained' style={{ width: 42, height: 24, minWidth: 'initial', background: value.color }} onClick={() => setOpen(true)} ref={el => pushClickAwayRef('Button', el)}></Button>
                }
              />
            }
          }
        </ClickAwayListenerIfOpen>
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Alpha</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{value.alpha.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={value.alpha} onChange={(e, v) => { value.alpha = v; onChange(); }} min={0} max={1} step={0.1} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Width</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{value.width.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={value.width} onChange={(e, v) => { value.width = v; onChange(); }} min={1} max={10} step={1} />
      </div>
    </Grid>

    {
      inOperation ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
            <div>Path Index</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ marginRight: 12 }}>{pathIndex + 1}</div>
              <Slider size='small' style={{ width: 120 }} value={pathIndex + 1} onChange={(e, v) => { setPathIndex(v - 1); }} min={1} max={value.path.length} step={1} />
            </div>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
            <div>Path X</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField {...TextFieldSXSmall()} size='small' style={{ width: 120 }} value={value.path[pathIndex].x} onChange={(e) => { value.path[pathIndex].x = e.target.value; onChange(); }} />
            </div>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
            <div>Path Y</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField {...TextFieldSXSmall()} size='small' style={{ width: 120 }} value={value.path[pathIndex].y} onChange={(e) => { value.path[pathIndex].y = e.target.value; onChange(); }} />
            </div>
          </Grid>
        </>
        : null
    }
  </Grid>
}

const settingDefault = { color: 'rgba(0, 0, 0, 1)', alpha: 1, width: 1, path: [] }

const pencilRender = (canvas, context, layer, operation) => {  
  context.save()

  context.globalAlpha = operation.setting.alpha
  context.strokeStyle = operation.setting.color
  context.lineWidth = operation.setting.width

  context.beginPath()

  operation.setting.path.forEach((i, index) => {
    if (index === 0) context.moveTo(i.x, i.y)
    if (index !== 0) context.lineTo(i.x, i.y)
  })

  context.stroke()

  context.restore()
}

const pencilAction = () => {
  const ref = {}

  return (status, relativeX, relativeY, canvas, context, layer, operations, operation) => {
    
    if (status === 'afterStart') {
      operation.setting.path.push({ x: Math.round(relativeX), y: Math.round(relativeY) })
    }

    if (status === 'afterMove') {
      if (Math.round(relativeX) !== operation.setting.path[operation.setting.path.length - 1].x || Math.round(relativeY) !== operation.setting.path[operation.setting.path.length - 1].y) {
        operation.setting.path.push({ x: Math.round(relativeX), y: Math.round(relativeY) })
        while (
          operation.setting.path[operation.setting.path.length - 1] !== undefined &&
          operation.setting.path[operation.setting.path.length - 2] !== undefined &&
          operation.setting.path[operation.setting.path.length - 3] !== undefined &&
          (
            (operation.setting.path[operation.setting.path.length - 1].x === operation.setting.path[operation.setting.path.length - 2].x && operation.setting.path[operation.setting.path.length - 2].x === operation.setting.path[operation.setting.path.length - 3].x) ||
            (operation.setting.path[operation.setting.path.length - 1].y === operation.setting.path[operation.setting.path.length - 2].y && operation.setting.path[operation.setting.path.length - 2].y === operation.setting.path[operation.setting.path.length - 3].y)
          ) &&
          (
            (operation.setting.path[operation.setting.path.length - 1].x - operation.setting.path[operation.setting.path.length - 2].x === operation.setting.path[operation.setting.path.length - 2].x - operation.setting.path[operation.setting.path.length - 3].x) &&
            (operation.setting.path[operation.setting.path.length - 1].y - operation.setting.path[operation.setting.path.length - 2].y === operation.setting.path[operation.setting.path.length - 2].y - operation.setting.path[operation.setting.path.length - 3].y)
          )
        ) {
          operation.setting.path = operation.setting.path.filter((i) => i !== operation.setting.path[operation.setting.path.length - 2])
        }
      }
    }

  }
}

const r = { _hash: _hash, type: type, name: name, pencilRender: pencilRender, pencilAction: pencilAction, settingComponent: settingComponent, settingDefault: settingDefault }

export default r