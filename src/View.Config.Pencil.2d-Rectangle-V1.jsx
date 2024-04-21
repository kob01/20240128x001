import React from 'react'

import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'

import { ClickAwayListener } from './View.Component.ClickAwayListener'
import { ColorPicker } from './View.Component.ColorPicker'

import { TextFieldSX, TooltipSX, PaperSX, SwitchSX } from './utils.mui.sx'

import { hash } from './utils.common'

const _hash = '2d-Rectangle-V2'

const type = 'Rectangle'

const name = 'Rectangle-V2'

function settingComponent(props) {
  const { value, onChange } = props

  return <Grid container spacing={0}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>
        Color
      </div>
      <div>
        <ClickAwayListener>
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
        </ClickAwayListener>
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
  </Grid>
}

const settingDefault = { color: 'rgba(0, 0, 0, 1)', alpha: 1, width: 1, stroke: true, fill: false, path: [] }

const pencilRender = (canvas, context, layer, action) => {
  context.save()

  context.globalAlpha = action.setting.alpha
  context.strokeStyle = action.setting.color
  context.fillStyle = action.setting.color
  context.lineWidth = action.setting.width

  context.beginPath(action.setting.path[0].x, action.setting.path[0].y)
  context.moveTo(action.setting.path[0].x, action.setting.path[0].y)
  context.lineTo(action.setting.path[1].x, action.setting.path[0].y)
  context.lineTo(action.setting.path[1].x, action.setting.path[1].y)
  context.lineTo(action.setting.path[0].x, action.setting.path[1].y)
  context.closePath()

  if (action.setting.stroke) context.stroke()
  if (action.setting.fill) context.fill()

  context.restore()
}

const pencilAction = () => {
  const ref = { action: undefined }

  return (canvas, context, setting, layer, action, status, x, y) => {

    if (status === 'afterStart') {
      ref.action = { _hash: hash(), pencilHash: _hash, visibility: true, setting: structuredClone(setting) }
      action.push(ref.action)
    }

    if (status === 'afterStart') {
      ref.action.setting.path.push({ x: Math.round(x), y: Math.round(y) }, { x: Math.round(x), y: Math.round(y) })
    }

    if (status === 'afterMove') {
      ref.action.setting.path[1].x = Math.round(x)
      ref.action.setting.path[1].y = Math.round(y)
    }

    if (status === 'afterEnd') {
      ref.action = undefined
    }

  }
}

const r = { _hash: _hash, type: type, name: name, pencilRender: pencilRender, pencilAction: pencilAction, settingComponent: settingComponent, settingDefault: settingDefault }

export default r