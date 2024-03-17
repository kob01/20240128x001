import React from 'react'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider'

import { TextFieldSX } from './utils.mui.sx'

const _hash = 'Image'

const label = 'Image'

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

const settingDefault = { color: '#000000', alpha: 1, width: 1, imagebase64: undefined }

const paintOrigin = (context, pixel) => {
  context.save()
  context.globalAlpha = pixel.alpha
  context.drawImage(image, pixel.x, pixel.y, pixel.w, pixel.h, x, y, width, height)
  context.restore()
}

const paintAction = () => {
  const ref = { positionOrigin: undefined, positionTarget: undefined, positionFirst: undefined }

  return (canvas, context, setting, status, relativeX, relativeY, offsetX, offsetY) => {
    const r = []

    if (status === 0) {
      ref.positionOrigin = { x: relativeX, y: relativeY }
      ref.positionTarget = { x: relativeX, y: relativeY }
      ref.positionFirst = true
    }

    if (status === 1) {
      if (Math.abs(relativeX - ref.positionTarget.x) >= 1 || Math.abs(relativeY - ref.positionTarget.y) >= 1) {
        const path = []

        var sx = ref.positionTarget.x
        var sy = ref.positionTarget.y
        var ex = relativeX
        var ey = relativeY

        const slopeOrigin = caculateSlope(sx, sy, ex, ey)

        while (Math.abs(sx - ex) >= 1 || Math.abs(sy - ey) >= 1) {
          const slopeTarget = caculateSlope(sx, sy, ex, ey)

          const tx = sx
          const ty = sy

          if (slopeTarget > slopeOrigin && Math.abs(sx - ex) >= 1) {
            if (sx > ex && sx - ex >= 1) sx = sx - 1
            if (ex > sx && ex - sx >= 1) sx = sx + 1
          }

          if (slopeTarget < slopeOrigin && Math.abs(sy - ey) >= 1) {
            if (sy > ey && sy - ey >= 1) sy = sy - 1
            if (ey > sy && ey - sy >= 1) sy = sy + 1
          }

          if (slopeTarget === slopeOrigin && slopeTarget === Number.MAX_VALUE) {
            if (sx > ex && sx - ex >= 1) sx = sx - 1
            if (ex > sx && ex - sx >= 1) sx = sx + 1
          }

          if (slopeTarget === slopeOrigin && slopeTarget === Number.MIN_VALUE) {
            if (sy > ey && sy - ey >= 1) sy = sy - 1
            if (ey > sy && ey - sy >= 1) sy = sy + 1
          }

          if (slopeTarget === slopeOrigin && slopeTarget !== Number.MAX_VALUE && slopeTarget !== Number.MIN_VALUE) {
            if (sx > ex && sx - ex >= 1) sx = sx - 1
            if (ex > sx && ex - sx >= 1) sx = sx + 1
          }

          if (sx === tx && sy === ty && Math.abs(sx - ex) >= 1) {
            if (sx > ex && sx - ex >= 1) sx = sx - 1
            if (ex > sx && ex - sx >= 1) sx = sx + 1
          }

          if (sx === tx && sy === ty && Math.abs(sy - ey) >= 1) {
            if (sy > ey && sy - ey >= 1) sy = sy - 1
            if (ey > sy && ey - sy >= 1) sy = sy + 1
          }

          if (ref.positionFirst === true && path.length === 0) {
            if (sx !== tx) path.push({ x: tx, y: ty }, ...caculateWidth({ x: tx, y: ty }, setting.width, 'y'))
            if (sy !== ty) path.push({ x: tx, y: ty }, ...caculateWidth({ x: tx, y: ty }, setting.width, 'x'))
          }

          if (sx !== tx) path.push({ x: sx, y: sy }, ...caculateWidth({ x: sx, y: sy }, setting.width, 'y'))
          if (sy !== ty) path.push({ x: sx, y: sy }, ...caculateWidth({ x: sx, y: sy }, setting.width, 'x'))

          if (sx === tx && sy === ty) console.error(_hash, sx, sy, ex, ey)
          if (sx === tx && sy === ty) break
        }

        path.forEach(i => {
          Object.assign(
            i,
            {
              _hash: _hash,
              x: i.x - offsetX,
              y: i.y - offsetY,
              color: setting.color,
              alpha: setting.alpha
            }
          )
        })

        path.forEach(i => {
          paintOrigin(
            context,
            {
              ...i,
              x: i.x + offsetX,
              y: i.y + offsetY,
            }
          )
        })

        r.push(...path)

        ref.positionTarget = { x: sx, y: sy }
        ref.positionFirst = false
      }
    }

    if (status === 2) {
      ref.positionOrigin = undefined
      ref.positionTarget = undefined
      ref.positionFirst = undefined
    }

    return r
  }
}

const r = { _hash: _hash, label: label, paintOrigin: paintOrigin, paintAction: paintAction, settingComponent: settingComponent, settingDefault: settingDefault }

export default r