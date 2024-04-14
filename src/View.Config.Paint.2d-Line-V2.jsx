import React from 'react'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider'

import { TextFieldSX } from './utils.mui.sx'

import { hash } from './utils.common'

const _hash = '2d-Line-V2'

const type = 'Line'

const name = 'Line-V2'

function settingComponent(props) {
  const { value, onChange } = props

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      Color
    </Grid>
    <Grid item xs={12}>
      <div style={{ position: 'relative' }}>
        <TextField {...TextFieldSX()} value={value.color} onChange={e => { value.color = e.target.value; onChange(); }} fullWidth autoComplete='off' />
        <TextField {...TextFieldSX()} value={value.color} onChange={e => { value.color = e.target.value; onChange(); }} fullWidth autoComplete='off' type='color' style={{ width: 64, position: 'absolute', top: 0, bottom: 0, right: 0, margin: 'auto' }} />
      </div>
    </Grid>

    <Grid item xs={12}>
      Alpha {value.alpha}
    </Grid>
    <Grid item xs={12}>
      <Slider value={value.alpha} onChange={(e, v) => { value.alpha = v; onChange(); }} min={0} max={1} step={0.1} />
    </Grid>

    <Grid item xs={12}>
      Width {value.width}
    </Grid>
    <Grid item xs={12}>
      <div style={{ position: 'relative' }}>
        <Slider value={value.width} onChange={(e, v) => { value.width = v; onChange(); }} min={1} max={10} step={1} />
      </div>
    </Grid>
  </Grid>
}

const settingDefault = { color: '#000000', alpha: 1, width: 1 }

const paintRender = (canvas, context, layer, action) => {
  context.save()

  context.globalAlpha = action.setting.alpha
  context.strokeStyle = action.setting.color
  context.lineWidth = action.setting.width

  action.path.forEach((i, index) => {
    if (index === 0) context.beginPath(i.x, i.y)
    if (index === 0) context.lineTo(i.x, i.y)
    if (index !== 0) context.lineTo(i.x, i.y)
  })

  context.stroke()

  context.restore()
}

const paintAction = () => {
  const ref = { action: undefined }

  return (canvas, context, setting, layer, action, status, x, y) => {

    if (status === 'afterStart') {
      ref.action = { _hash: hash(), paintHash: _hash, path: [{ x: Math.round(x), y: Math.round(y) }], setting: JSON.parse(JSON.stringify(setting)), visibility: true }
      action.push(ref.action)
    }

    if (status === 'afterMove') {
      if (Math.round(x) !== ref.action.path[ref.action.path.length - 1].x || Math.round(y) !== ref.action.path[ref.action.path.length - 1].y) {
        ref.action.path.push({ x: Math.round(x), y: Math.round(y) })
        while (
          ref.action.path[ref.action.path.length - 1] !== undefined &&
          ref.action.path[ref.action.path.length - 2] !== undefined &&
          ref.action.path[ref.action.path.length - 3] !== undefined &&
          (
            (ref.action.path[ref.action.path.length - 1].x === ref.action.path[ref.action.path.length - 2].x && ref.action.path[ref.action.path.length - 2].x === ref.action.path[ref.action.path.length - 3].x) ||
            (ref.action.path[ref.action.path.length - 1].y === ref.action.path[ref.action.path.length - 2].y && ref.action.path[ref.action.path.length - 2].y === ref.action.path[ref.action.path.length - 3].y)
          ) &&
          (
            (ref.action.path[ref.action.path.length - 1].x - ref.action.path[ref.action.path.length - 2].x === ref.action.path[ref.action.path.length - 2].x - ref.action.path[ref.action.path.length - 3].x) &&
            (ref.action.path[ref.action.path.length - 1].y - ref.action.path[ref.action.path.length - 2].y === ref.action.path[ref.action.path.length - 2].y - ref.action.path[ref.action.path.length - 3].y)
          )
        ) {
          ref.action.path = ref.action.path.filter((i) => i !== ref.action.path[ref.action.path.length - 2])
        }
      }
    }

    if (status === 'afterEnd') {
      if (ref.action.path.length === 1) {
        layer.action = layer.action.filter(i => i._hash !== ref.action._hash)
      }

      ref.action = undefined
    }

  }
}

const r = { _hash: _hash, type: type, name: name, paintRender: paintRender, paintAction: paintAction, settingComponent: settingComponent, settingDefault: settingDefault }

export default r