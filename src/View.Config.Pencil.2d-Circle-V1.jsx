import React from 'react'

import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'

import { ClickAwayListener } from './View.Component.ClickAwayListener'
import { ColorPicker } from './View.Component.ColorPicker'

import { TextFieldSXSmall, TooltipSX, PaperSX, SwitchSX } from './utils.mui.sx'

import { hash } from './utils.common'

const _hash = 'CDJ3WDJAXOUO01XR'

const type = 'Circle'

const name = 'Circle-V1'

function settingComponent(props) {
  const { value, onChange, inDraw, inGraph } = props

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

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Angle Counterclockwise</div>
      <div>
        <Switch {...SwitchSX()} size='small' checked={value.counterclockwise} onChange={(e) => { value.counterclockwise = e.target.checked; value.stroke = !value.fill; onChange(); }} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Angle Start</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{value.sAngle.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={value.sAngle / 2} onChange={(e, v) => { value.sAngle = v * 2; onChange(); }} min={0} max={1} step={0.01} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Angle End</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{value.eAngle.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={value.eAngle / 2} onChange={(e, v) => { value.eAngle = v * 2; onChange(); }} min={0} max={1} step={0.01} />
      </div>
    </Grid>

    {
      inGraph ?
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

const settingDefault = { color: 'rgba(0, 0, 0, 1)', alpha: 1, width: 1, stroke: true, fill: false, counterclockwise: false, sAngle: 0, eAngle: 2, path: [] }

const pencilRender = (canvas, context, layer, graph) => {
  const r =
    Math.round(
      Math.pow(
        Math.pow(Math.abs(graph.setting.path[1].x - graph.setting.path[0].x), 2) +
        Math.pow(Math.abs(graph.setting.path[1].y - graph.setting.path[0].y), 2),
        1 / 2
      )
    )

  context.save()

  context.globalAlpha = graph.setting.alpha
  context.strokeStyle = graph.setting.color
  context.fillStyle = graph.setting.color
  context.lineWidth = graph.setting.width

  context.beginPath()

  context.arc(graph.setting.path[0].x, graph.setting.path[0].y, r, graph.setting.sAngle * Math.PI, graph.setting.eAngle * Math.PI, graph.setting.counterclockwise)

  if (graph.setting.stroke) context.stroke()
  if (graph.setting.fill) context.fill()

  context.restore()
}

const pencilDraw = () => {
  const ref = { graph: undefined }

  return (canvas, context, setting, layer, graph, status, x, y) => {

    if (status === 'afterStart') {
      ref.graph = { _hash: hash(), pencilHash: _hash, visibility: true, setting: structuredClone(setting) }
      graph.push(ref.graph)
    }

    if (status === 'afterStart') {
      ref.graph.setting.path.push({ x: Math.round(x), y: Math.round(y) }, { x: Math.round(x), y: Math.round(y) })
    }

    if (status === 'afterMove') {
      ref.graph.setting.path[1].x = Math.round(x)
      ref.graph.setting.path[1].y = Math.round(y)
    }

    if (status === 'afterEnd') {
      ref.graph = undefined
    }

  }
}

const r = { _hash: _hash, type: type, name: name, pencilRender: pencilRender, pencilDraw: pencilDraw, settingComponent: settingComponent, settingDefault: settingDefault }

export default r