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

function Area(props) {
  const { value, onChange } = props

  return <>
    <Grid item xs={12}>
      Area {value.area}
    </Grid>
    <Grid item xs={12}>
      <div style={{ position: 'relative' }}>
        <Slider value={value.area} onChange={(e, v) => { value.area = v; onChange(); }} min={1} max={8} step={1} />
      </div>
    </Grid>
  </>
}

const settingComponent = [Color, Alpha, Area]

const settingDefault = { color: '#000000', alpha: 1, area: 2 }

const slope = (x, y, x_, y_) => {
  const rx = x - x_
  const ry = y - y_

  if (rx === 0) return -1
  if (ry === 0) return -2

  return Math.abs(ry) / Math.abs(rx)
}

const caculte = (x, y, x_, y_) => {
  const r = []

  const s = slope(x, y, x_, y_)

  while (x !== x_ || y !== y_) {
    const s_ = slope(x, y, x_, y_)

    if (s_ === -1 || s_ > s || s_ === s) {
      if (y > y_) y = y - 1
      if (y < y_) y = y + 1
    }

    if (s_ === -2 || s_ < s) {
      if (x > x_) x = x - 1
      if (x < x_) x = x + 1
    }

    if (x !== x_ || y !== y_) r.push([x, y])
  }

  return r
}

const round = (x, y, area) => {
  var sx = x - area
  var sy = y - area
  var ex = x + area
  var ey = y + area

  const r = []

  while (sx < ex || sx === ex) {
    sy = y - area
    while (sy < ey || sy === ey) {
      r.push([sx, sy])
      sy = sy + 1
    }
    sx = sx + 1
  }

  return r
}

const draw = (canvasRef, paintSetting, xys) => {
  xys
    .map(i => round(i[0], i[1], paintSetting.area))
    .flat()
    .map(i => i.join('-'))
    .reduce((t, i) => Array.from(new Set([...t, i])), [])
    .map(i => i.split('-'))
    .forEach(i => canvasRef.context.clearRect(i[0], i[1], 1, 1))
}

const paint = () => {
  const ref = { position: [] }

  return (canvasRef, paintSetting, status, x, y) => {
    if (status === 0) {
      canvasRef.context.save()
      canvasRef.context.globalAlpha = paintSetting.alpha
      canvasRef.context.fillStyle = paintSetting.color
      draw(canvasRef, paintSetting, [[x, y]])
      ref.position = [x, y]
    }

    if (status === 2) {
      canvasRef.context.restore()
    }

    if (status === 1) {
      if (x !== ref.position[0] || y !== ref.position[1]) {
        draw(canvasRef, paintSetting, [...caculte(ref.position[0], ref.position[1], x, y), [x, y]])
        ref.position = [x, y]
      }
    }
  }
}

const r = { _hash: 'Rubber', label: 'Rubber', paint: paint, settingComponent: settingComponent, settingDefault: settingDefault }

export default r