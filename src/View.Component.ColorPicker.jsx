import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Paper from '@mui/material/Paper'

import { rgbaSpilt } from './utils.common'

const ColorPicker = (props) => {
  const rgbaObject = rgbaSpilt(props.value)
  const rgbaString = `rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`

  return <Grid container spacing={2}>
    {
      props.colors ?
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {
              props.colors.map(i => {
                return <Grid item key={i}>
                  <Button variant='contained' style={{ background: i, width: 28, height: 28, borderRadius: '100%', minWidth: 'initial', padding: 0 }} onClick={() => { props.onChange(i) }} />
                </Grid>
              })
            }
          </Grid>
        </Grid>
        : null
    }
    <Grid item xs={12}>
      <Slider sx={{ '& .MuiSlider-thumb': { background: `rgba(${rgbaObject.r}, 0, 0, 1)` } }} value={Number(rgbaObject.r)} onChange={(e, v) => { props.onChange(`rgba(${v}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`) }} min={0} max={255} step={1}></Slider>
    </Grid>
    <Grid item xs={12}>
      <Slider sx={{ '& .MuiSlider-thumb': { background: `rgba(0, ${rgbaObject.g}, 0, 1)` } }} value={Number(rgbaObject.g)} onChange={(e, v) => { props.onChange(`rgba(${rgbaObject.r}, ${v}, ${rgbaObject.b}, ${rgbaObject.a})`) }} min={0} max={255} step={1}></Slider>
    </Grid>
    <Grid item xs={12}>
      <Slider sx={{ '& .MuiSlider-thumb': { background: `rgba(0, 0, ${rgbaObject.r}, 1)` } }} value={Number(rgbaObject.b)} onChange={(e, v) => { props.onChange(`rgba(${rgbaObject.r}, ${rgbaObject.g}, ${v}, ${rgbaObject.a})`) }} min={0} max={255} step={1}></Slider>
    </Grid>
    <Grid item xs={12}>
      <Slider sx={{ '& .MuiSlider-thumb': { background: `rgba(0, 0, 0, ${rgbaObject.a})` } }} value={Number(rgbaObject.a)} onChange={(e, v) => { props.onChange(`rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${v})`) }} min={0} max={1} step={0.01}></Slider>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <Button variant='contained' style={{ background: rgbaString, height: 36 }} onClick={() => navigator.clipboard.writeText(rgbaString)}></Button>
      </div>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div>{rgbaString}</div>
      </div>
    </Grid>
  </Grid>
}

export { ColorPicker }