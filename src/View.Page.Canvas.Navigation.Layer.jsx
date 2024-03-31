import React from 'react'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Drawer from '@mui/material/Drawer'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'

import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { ImitationGlobal, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function TextFieldControl(props) {
  const [value, setValue] = React.useState(props.value)

  const onBlur = (e) => {
    props.onChange(e, value)
    setValue(props.value)
  }

  React.useEffect(() => setValue(props.value), [props.value])

  return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} onBlur={onBlur}></TextField>
}

function Content() {
  const canvasFind = ImitationPageCanvas.state.memo.canvasFind(ImitationPageCanvas.state.store.canvas.control)
  const canvasActionVisibilityTrackFindIndex = ImitationPageCanvas.state.memo.canvasActionVisibilityTrackFindIndex(ImitationPageCanvas.state.store.canvas.control, canvasFind ? [canvasFind.action.map(i => i.visibility).join('')] : [''])

  return <div style={{ width: 360, height: '100%', padding: 16, overflowY: 'auto' }}>
    <Grid container spacing={2}>

      {
        canvasFind !== undefined ?
          <Grid item xs={12}>
            <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.layer.expand.setting} onChange={(e, v) => { ImitationPageCanvas.state.function.onNavigationExpandChange('layer','setting', v) }}>
              <AccordionSummary>Setting</AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>Visibility</div>
                    <div>
                      <Switch {...SwitchSX()} checked={canvasFind.visibility} onChange={(e) => { ImitationPageCanvas.state.function.onCanvasLayerVisibility(canvasFind._hash, e.target.checked) }} />
                    </div>
                  </Grid>

                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>Action</div>
                    <div>
                      <IconButton onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerMove(canvasFind._hash, 0) }}><KeyboardArrowUpIcon color='primary' /></IconButton>
                      <IconButton onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerMove(canvasFind._hash, 1) }}><KeyboardArrowDownIcon color='primary' /></IconButton>
                      <IconButton onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerRemove(canvasFind._hash) }}><DeleteIcon color='primary' /></IconButton>
                    </div>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          : null
      }

      {
        canvasFind !== undefined && canvasFind.action.length > 0 ?
          <Grid item xs={12}>
            <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.layer.expand.action} onChange={(e, v) => { ImitationPageCanvas.state.function.onNavigationExpandChange('layer','action', v) }}>
              <AccordionSummary>Action</AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    Track {canvasActionVisibilityTrackFindIndex}
                  </Grid>
                  <Grid item xs={12}>
                    <Slider value={canvasActionVisibilityTrackFindIndex} onChange={(e, v) => { ImitationPageCanvas.state.function.onCanvasLayerActionVisibilityTracks(canvasFind._hash, v) }} min={0} max={canvasFind.action.length} step={1} />
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid container spacing={1}>
                      {
                        new Array(canvasFind.action.length).fill().map((i, index) => {
                          return <Grid item key={index}>
                            <Button variant={canvasFind.action[index].visibility ? 'contained' : 'outlined'} style={{ padding: 0, width: 36, height: 36, minWidth: 'auto' }} color='primary' onClick={() => ImitationPageCanvas.state.function.onCanvasLayerActionVisibilityTrack(canvasFind._hash, index)}>{String(index + 1).padStart(2, '0')}</Button>
                          </Grid>
                        })
                      }
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          : null
      }

    </Grid>
  </div >
}

function App() {
  const onClose = () => {
    ImitationPageCanvas.state.store.navigation.layer.open = false
    ImitationPageCanvas.state.function.update()
  }

  if (ImitationGlobal.state.store.navigation.mode === 0) {
    return <Paper {...PaperSX()} style={{ width: ImitationPageCanvas.state.store.navigation.layer.open ? 360 : 0, marginLeft: ImitationPageCanvas.state.store.navigation.layer.open ? 16 : 0, height: '100%', transitionProperty: 'width, margin-light, margin-right', transitionDuration: '1s', overflow: 'hidden' }}>
      <Content />
    </Paper>
  }

  if (ImitationGlobal.state.store.navigation.mode === 1) {
    return <Drawer {...DrawerSX()} anchor='right' open={ImitationPageCanvas.state.store.navigation.layer.open} onClose={() => onClose()}>
      <Content />
    </Drawer>
  }

  return null
}

const dependence = [{ instance: ImitationGlobal, dependence: state => [state.store.navigation.mode] }]

export default withBindComponentPure(App, dependence)