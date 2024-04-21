import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'

import { rgbaSpilt } from './utils.common'

const ColorPicker = (props) => {
  const rgbaObject = rgbaSpilt(props.value)
  const rgbaString = `rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`

  return <Grid container spacing={0} style={{ fontSize: 12 }}>
    {
      props.colors ?
        <Grid item xs={12}>
          <Grid container spacing={0}>
            {
              props.colors.map(i => {
                return <Grid item key={i} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 30, height: 30 }}>
                  <Button variant='contained' style={{ background: i, width: 24, height: 24, borderRadius: '100%', minWidth: 'initial', padding: 0 }} onClick={() => { props.onChange(i) }} />
                </Grid>
              })
            }
          </Grid>
        </Grid>
        : null
    }

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Red</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{Number(rgbaObject.r)}</div>
        <Slider size='small' style={{ width: 120 }} value={Number(rgbaObject.r)} onChange={(e, v) => { props.onChange(`rgba(${v}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`) }} min={0} max={255} step={1}></Slider>
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Green</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{Number(rgbaObject.g)}</div>
        <Slider size='small' style={{ width: 120 }} value={Number(rgbaObject.g)} onChange={(e, v) => { props.onChange(`rgba(${rgbaObject.r}, ${v}, ${rgbaObject.b}, ${rgbaObject.a})`) }} min={0} max={255} step={1}></Slider>
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Blue</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{Number(rgbaObject.b)}</div>
        <Slider size='small' style={{ width: 120 }} value={Number(rgbaObject.b)} onChange={(e, v) => { props.onChange(`rgba(${rgbaObject.r}, ${rgbaObject.g}, ${v}, ${rgbaObject.a})`) }} min={0} max={255} step={1}></Slider>
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Alpha</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{Number(rgbaObject.a)}</div>
        <Slider size='small' style={{ width: 120 }} value={Number(rgbaObject.a)} onChange={(e, v) => { props.onChange(`rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${v})`) }} min={0} max={1} step={0.01}></Slider>
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>
        <div>{rgbaString}</div>
      </div>
      <div>
        <Button variant='contained' style={{ width: 42, height: 24, minWidth: 'initial', background: rgbaString }} onClick={() => navigator.clipboard.writeText(rgbaString)}></Button>
      </div>
    </Grid>
  </Grid>
}

export { ColorPicker }