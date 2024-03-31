import React from 'react'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider'

import { TextFieldSX } from './utils.mui.sx'

import { hash } from './utils.common'

const _hash = '2d-Line-V2'

const type = 'Line'

const name = 'Line-V2'

function Color(props) {
  const { value, onChange } = props

  return <>
    <Grid item xs={12}>
      Color
    </Grid>
    <Grid item xs={12}>
      <div style={{ position: 'relative' }}>
        <TextField {...TextFieldSX()} value={value.color} onChange={e => { value.color = e.target.value; onChange(); }} fullWidth autoComplete='off' />
        <TextField {...TextFieldSX()} value={value.color} onChange={e => { value.color = e.target.value; onChange(); }} fullWidth autoComplete='off' type='color' style={{ width: 64, position: 'absolute', top: 0, bottom: 0, right: 0, margin: 'auto' }} />
      </div>
    </Grid>
  </>
}

function Alpha(props) {
  const { value, onChange } = props

  return <>
    <Grid item xs={12}>
      Alpha {value.alpha}
    </Grid>
    <Grid item xs={12}>
      <Slider value={value.alpha} onChange={(e, v) => { value.alpha = v; onChange(); }} min={0} max={1} step={0.1} />
    </Grid>
  </>
}

function Width(props) {
  const { value, onChange } = props

  return <>
    <Grid item xs={12}>
      Width {value.width}
    </Grid>
    <Grid item xs={12}>
      <div style={{ position: 'relative' }}>
        <Slider value={value.width} onChange={(e, v) => { value.width = v; onChange(); }} min={1} max={10} step={1} />
      </div>
    </Grid>
  </>
}

const settingComponent = [Color, Alpha, Width]

const settingDefault = { color: '#000000', alpha: 1, width: 1 }

const paintRender = (context, action, position) => {
  const scale = (position.scaleX + position.scaleY) / 2

  context.save()

  context.globalAlpha = action.setting.alpha
  context.strokeStyle = action.setting.color
  context.lineWidth = action.setting.width * scale

  action.path.forEach((i, index) => {
    if (index === 0) context.beginPath(i.x * scale + position.offsetX, i.y * scale + position.offsetY)
    if (index === 0) context.lineTo(i.x * scale + position.offsetX, i.y * scale + position.offsetY)
    if (index !== 0) context.lineTo(i.x * scale + position.offsetX, i.y * scale + position.offsetY)
  })

  context.stroke()

  context.restore()
}

const paintAction = () => {
  const ref = { _hash: undefined, action: undefined }

  return (canvas, context, setting, action, status, x, y) => {

    if (status === 0) {
      ref.action = { _hash: hash(), hashPaint: _hash, path: [{ x: Math.round(x), y: Math.round(y) }], setting: JSON.parse(JSON.stringify(setting)), visibility: true }
    }

    if (status === 0) {
      action.push(ref.action)
    }

    if (status === 1) {
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

    if (status === 2) {
      ref.action = undefined
    }

    if (status === 3) {

    }

  }
}

const r = { _hash: _hash, type: type, name: name, paintRender: paintRender, paintAction: paintAction, settingComponent: settingComponent, settingDefault: settingDefault }

export default r