import React from 'react'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider'

import { TextFieldSX } from './utils.mui.sx'

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
      <div style={{ position: 'relative' }}>
        <Slider value={value.alpha} onChange={(e, v) => { value.alpha = v; onChange(); }} min={0} max={1} step={0.1} />
      </div>
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
        <Slider value={value.width} onChange={(e, v) => { value.width = v; onChange(); }} min={1} max={5} step={1} />
      </div>
    </Grid>
  </>
}

const settingComponent = [Color, Alpha, Width]

const settingDefault = { color: '#000000', alpha: 1, width: 1 }

const paint = () => {
  const ref = { inConfig: false }

  return (canvasRef, paintSetting, status, x, y) => {
    if (status === 0) {
      canvasRef.context.save()
      canvasRef.context.globalAlpha = paintSetting.alpha
      canvasRef.context.lineWidth = paintSetting.lineWidth
      canvasRef.context.lineCap = 'round'
      canvasRef.context.strokeStyle = paintSetting.color
      canvasRef.context.beginPath()
      canvasRef.context.moveTo(x, y)
    }
    if (status === 1) {
      canvasRef.context.lineTo(x, y)
      canvasRef.context.stroke()
    }
    if (status === 2) {
      canvasRef.context.restore()
    }
  }
}

const r = { _hash: 'LineOrigin', label: 'LineOrigin', paint: paint, settingComponent: settingComponent, settingDefault: settingDefault }

export default r