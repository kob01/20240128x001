import React from 'react'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider'

import { TextFieldSX } from './utils.mui.sx'

import { hash } from './utils.common'

const _hash = 'OriginLine'

const type = 'OriginLine'

const label = 'OriginLine'

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

const paintOrigin = (context, action) => {
  context.save()

  context.globalAlpha = action.setting.alpha
  context.strokeStyle = action.setting.color
  context.lineWidth = action.setting.width

  action.path.forEach((i, index) => {
    if (index === 0) context.beginPath(i.x + action.offset.x, i.y + action.offset.y)
    if (index !== 0) context.lineTo(i.x + action.offset.x, i.y + action.offset.y)
  })

  context.stroke()

  context.restore()
}

const paintAction = () => {
  const ref = { _hash: undefined, action: undefined }

  return (canvas, context, setting, action, status, x, y) => {
    const r = []

    if (status === 0) {
      ref.action = { _hash: hash(), type: type, path: [{ x: x, y: y }], setting: setting, offset: { x: 0, y: 0 } }
    }

    if (status === 0) {
      action.push(ref.action)
    }

    if (status === 1) {
      ref.action.path.push({ x: x, y: y })
    }

    if (status === 2) {
      ref.action = undefined
    }

    return r
  }
}

const r = { _hash: _hash, type: type, label: label, paintOrigin: paintOrigin, paintAction: paintAction, settingComponent: settingComponent, settingDefault: settingDefault }

export default r