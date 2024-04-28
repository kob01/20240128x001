import React from 'react'

import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'

import { ClickAwayListenerIfOpen } from './View.Component.ClickAwayListenerIfOpen'
import { ColorPicker } from './View.Component.ColorPicker'

import { TextFieldSXSmall, TooltipSX, PaperSX, SwitchSX } from './utils.mui.sx'

import { hash } from './utils.common'

const _hash = 'YY7BA1LAVJVWOLIA'

const type = 'Square'

const name = 'Square-V1'

function settingComponent(props) {
  const { value, onChange, inDraw, inOperation } = props

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

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Mode Stroke</div>
      <div>
        <Switch {...SwitchSX()} size='small' checked={value.stroke} onChange={(e) => { value.stroke = e.target.checked; value.fill = !value.stroke; onChange(); }} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Mode Fill</div>
      <div>
        <Switch {...SwitchSX()} size='small' checked={value.fill} onChange={(e) => { value.fill = e.target.checked; value.stroke = !value.fill; onChange(); }} />
      </div>
    </Grid>

    {
      inOperation ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
            <div>Path Center X</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField {...TextFieldSXSmall()} size='small' style={{ width: 120 }} value={value.path[0].x} onChange={(e) => { value.path[0].x = e.target.value; onChange(); }} />
            </div>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
            <div>Path Center Y</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField {...TextFieldSXSmall()} size='small' style={{ width: 120 }} value={value.path[0].y} onChange={(e) => { value.path[0].y = e.target.value; onChange(); }} />
            </div>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
            <div>Path Radius X</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField {...TextFieldSXSmall()} size='small' style={{ width: 120 }} value={value.path[1].x} onChange={(e) => { value.path[1].x = e.target.value; onChange(); }} />
            </div>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
            <div>Path Radius Y</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField {...TextFieldSXSmall()} size='small' style={{ width: 120 }} value={value.path[1].y} onChange={(e) => { value.path[1].y = e.target.value; onChange(); }} />
            </div>
          </Grid>
        </>
        : null
    }
  </Grid>
}

const settingDefault = { color: 'rgba(0, 0, 0, 1)', alpha: 1, width: 1, stroke: true, fill: false, path: [] }

const pencilRender = (canvas, context, layer, operation) => {
  const r =
    Math.pow(
      Math.pow(Math.abs(operation.setting.path[1].x - operation.setting.path[0].x), 2) +
      Math.pow(Math.abs(operation.setting.path[1].y - operation.setting.path[0].y), 2),
      1 / 2
    )

  context.save()

  context.globalAlpha = operation.setting.alpha
  context.strokeStyle = operation.setting.color
  context.fillStyle = operation.setting.color
  context.lineWidth = operation.setting.width

  context.beginPath()

  context.rect(operation.setting.path[0].x - r, operation.setting.path[0].y - r, r * 2, r * 2)

  if (operation.setting.stroke) context.stroke()
  if (operation.setting.fill) context.fill()

  context.restore()
}

const pencilDraw = () => {
  const ref = { operation: undefined }

  return (canvas, context, setting, layer, operation, status, x, y) => {

    if (status === 'afterStart') {
      ref.operation = { _hash: hash(), pencilHash: _hash, visibility: true, setting: structuredClone(setting) }
      operation.push(ref.operation)
    }

    if (status === 'afterStart') {
      ref.operation.setting.path.push({ x: Math.round(x), y: Math.round(y) }, { x: Math.round(x), y: Math.round(y) })
    }

    if (status === 'afterMove') {
      ref.operation.setting.path[1].x = Math.round(x)
      ref.operation.setting.path[1].y = Math.round(y)
    }

    if (status === 'afterEnd') {
      ref.operation = undefined
    }

  }
}

const r = { _hash: _hash, type: type, name: name, pencilRender: pencilRender, pencilDraw: pencilDraw, settingComponent: settingComponent, settingDefault: settingDefault }

export default r