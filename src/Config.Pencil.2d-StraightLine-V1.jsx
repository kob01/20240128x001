import React from 'react'

import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import { ClickAwayListenerIfOpen } from './View.Component.ClickAwayListenerIfOpen'
import { ResizeObserverListener } from './View.Component.ResizeObserverListener'
import { ColorPicker } from './View.Component.ColorPicker'

import { PopperSX, TextFieldSX, TextFieldSmallSX, DrawerSX, DialogSX, DividerSX, SwitchSX, AccordionSX, PaperSX } from './utils.mui.sx'

import { hash } from './utils.common'

const _hash = 'YWRS25OLPFRT77O7'

const type = 'StraightLine'

const name = 'StraightLine-V1'

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

    {
      inOperation ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
            <div>Path Start X</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField sx={TextFieldSmallSX()} size='small' style={{ width: 120 }} value={value.path[0].x} onChange={(e) => { value.path[0].x = e.target.value; onChange(); }} />
            </div>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
            <div>Path Start Y</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField sx={TextFieldSmallSX()} size='small' style={{ width: 120 }} value={value.path[0].y} onChange={(e) => { value.path[0].y = e.target.value; onChange(); }} />
            </div>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
            <div>Path Start X</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField sx={TextFieldSmallSX()} size='small' style={{ width: 120 }} value={value.path[1].x} onChange={(e) => { value.path[1].x = e.target.value; onChange(); }} />
            </div>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
            <div>Path Start Y</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField sx={TextFieldSmallSX()} size='small' style={{ width: 120 }} value={value.path[1].y} onChange={(e) => { value.path[1].y = e.target.value; onChange(); }} />
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

  context.beginPath(operation.setting.path[0].x, operation.setting.path[0].y)
  context.moveTo(operation.setting.path[0].x, operation.setting.path[0].y)
  context.lineTo(operation.setting.path[1].x, operation.setting.path[1].y)

  context.stroke()

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