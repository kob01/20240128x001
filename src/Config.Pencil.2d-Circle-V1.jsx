import React from 'react'

import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'

import { ClickAwayListenerIfOpen } from './View.Component.ClickAwayListenerIfOpen'
import { ResizeObserverListener } from './View.Component.ResizeObserverListener'
import { ColorPicker } from './View.Component.ColorPicker'

import { PopperSX, TextFieldSX, TextFieldSmallSX, DrawerSX, DialogSX, DividerSX, SwitchSX, AccordionSX, PaperSX } from './utils.mui.sx'

import { hash } from './utils.common'

const _hash = 'CDJ3WDJAXOUO01XR'

const type = 'Circle'

const name = 'Circle-V1'

function settingComponent(props) {
  const { value, onChange, inDraw, inOperation, pushIgnoreTargets } = props

  return <Grid container spacing={0}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>
        Color
      </div>
      <div>
        <ClickAwayListenerIfOpen onClick={({ inContainStart, inContainEnd, setOpen }) => { if (inContainStart === false && inContainEnd === false) setOpen(false) }}>
          {
            ({ open, setOpen, pushIgnoreTarget }) => {
              return <ResizeObserverListener>
                {
                  ({ pushResizeTarget }) => {
                    return <Tooltip
                      PopperProps={{ sx: PopperSX() }}
                      open={open}
                      title={
                        <div style={{ padding: 8, width: 320 }} ref={el => [...pushIgnoreTargets, pushIgnoreTarget, pushResizeTarget].forEach(i => i(el))}>
                          <Paper sx={PaperSX()} style={{ padding: 16 }}>
                            <ColorPicker value={value.color} onChange={v => { value.color = v; onChange(); }} colors={['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)']} />
                          </Paper>
                        </div>
                      }
                      children={
                        <Button variant='contained' style={{ width: 42, height: 24, minWidth: 'initial', background: value.color }} onClick={() => setOpen(!open)} ref={el => [...pushIgnoreTargets, pushIgnoreTarget].forEach(i => i(el))}></Button>
                      }
                    />
                  }
                }
              </ResizeObserverListener>
            }
          }
        </ClickAwayListenerIfOpen>
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Alpha</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{value.alpha.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={value.alpha} onChange={(e, v) => { value.alpha = v; onChange(); }} min={0} max={1} step={0.1} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Width</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{value.width.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={value.width} onChange={(e, v) => { value.width = v; onChange(); }} min={1} max={10} step={1} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Mode Stroke</div>
      <div>
        <Switch sx={SwitchSX()} size='small' checked={value.stroke} onChange={(e) => { value.stroke = e.target.checked; value.fill = !value.stroke; onChange(); }} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Mode Fill</div>
      <div>
        <Switch sx={SwitchSX()} size='small' checked={value.fill} onChange={(e) => { value.fill = e.target.checked; value.stroke = !value.fill; onChange(); }} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Angle Counterclockwise</div>
      <div>
        <Switch sx={SwitchSX()} size='small' checked={value.counterclockwise} onChange={(e) => { value.counterclockwise = e.target.checked; value.stroke = !value.fill; onChange(); }} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Angle</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{value.angle.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={value.angle} onChange={(e, v) => { value.angle = v; onChange(); }} min={0} max={1} step={0.01} />
      </div>
    </Grid>

    {
      inOperation ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
            <div>Path Center X</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField sx={TextFieldSmallSX()} size='small' style={{ width: 120 }} value={value.path[0].x} onChange={(e) => { value.path[0].x = e.target.value; onChange(); }} />
            </div>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
            <div>Path Center Y</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField sx={TextFieldSmallSX()} size='small' style={{ width: 120 }} value={value.path[0].y} onChange={(e) => { value.path[0].y = e.target.value; onChange(); }} />
            </div>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
            <div>Path Radius X</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField sx={TextFieldSmallSX()} size='small' style={{ width: 120 }} value={value.path[1].x} onChange={(e) => { value.path[1].x = e.target.value; onChange(); }} />
            </div>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
            <div>Path Radius Y</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField sx={TextFieldSmallSX()} size='small' style={{ width: 120 }} value={value.path[1].y} onChange={(e) => { value.path[1].y = e.target.value; onChange(); }} />
            </div>
          </Grid>
        </>
        : null
    }
  </Grid>
}

const settingDefault = { color: 'rgba(0, 0, 0, 1)', alpha: 1, width: 1, stroke: true, fill: false, counterclockwise: false, angle: 1, path: [] }

const pencilRender = (canvas, context, layer, operation) => {
  const r =
    Math.round(
      Math.pow(
        Math.pow(Math.abs(operation.setting.path[1].x - operation.setting.path[0].x), 2) +
        Math.pow(Math.abs(operation.setting.path[1].y - operation.setting.path[0].y), 2),
        1 / 2
      )
    )

  const diffX = operation.setting.path[1].x - operation.setting.path[0].x
  const diffY = operation.setting.path[1].y - operation.setting.path[0].y

  if (diffX > 0) var atan = Math.atan(diffY / diffX)
  if (diffX < 0) var atan = Math.PI + Math.atan(diffY / diffX)
  if (diffX === 0 && diffY > 0) var atan = Math.PI * 0.5
  if (diffX === 0 && diffY < 0) var atan = Math.PI * 1.5

  if (operation.setting.counterclockwise === true) {
    var sAngle = operation.setting.angle * Math.PI * 2 + atan
    var eAngle = (1 - operation.setting.angle) * Math.PI * 2 + atan
  }

  if (operation.setting.counterclockwise === false) {
    var sAngle = (1 - operation.setting.angle) * Math.PI * 2 + atan
    var eAngle = operation.setting.angle * Math.PI * 2 + atan
  }

  context.save()

  context.globalAlpha = operation.setting.alpha
  context.strokeStyle = operation.setting.color
  context.fillStyle = operation.setting.color
  context.lineWidth = operation.setting.width

  context.beginPath()

  context.arc(operation.setting.path[0].x, operation.setting.path[0].y, r, sAngle, eAngle, operation.setting.counterclockwise)

  if (operation.setting.stroke) context.stroke()
  if (operation.setting.fill) context.fill()

  context.restore()
}

const pencilAction = () => {
  const ref = {}

  return (status, relativeX, relativeY, canvas, context, layer, operations, operation) => {

    if (status === 'afterStart') {
      operation.setting.path.push({ x: Math.round(relativeX), y: Math.round(relativeY) }, { x: Math.round(relativeX), y: Math.round(relativeY) })
    }

    if (status === 'afterMove') {
      operation.setting.path[1].x = Math.round(relativeX)
      operation.setting.path[1].y = Math.round(relativeY)
    }

  }
}

const r = { _hash: _hash, type: type, name: name, pencilRender: pencilRender, pencilAction: pencilAction, settingComponent: settingComponent, settingDefault: settingDefault }

export default r