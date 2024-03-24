import React from 'react'

import Button from '@mui/material/Button'
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

import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { ImitationGlobal, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function Content() {
  const canvasFind = ImitationPageCanvas.state.memo.canvasFind(ImitationPageCanvas.state.store.canvas.control)
  const canvasActionVisibilityTrackFindIndex = ImitationPageCanvas.state.memo.canvasActionVisibilityTrackFindIndex(ImitationPageCanvas.state.store.canvas.control, canvasFind ? [canvasFind.action.map(i => i.visibility).join('')]: [''])
  const paintFind = ImitationPageCanvas.state.memo.paintFind(ImitationPageCanvas.state.store.paint.control)

  return <div style={{ width: 360, height: '100%', padding: 16, overflowY: 'auto' }}>
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.expand[0]} onChange={(e, v) => { ImitationPageCanvas.state.function.onNavigationExpandChange(0, v) }}>
          <AccordionSummary>View</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                Scale {ImitationPageCanvas.state.store.view.scale}
              </Grid>
              <Grid item xs={12}>
                <Slider value={ImitationPageCanvas.state.store.view.scale} onChange={(e, v) => { ImitationPageCanvas.state.function.onViewScaleChange(v) }} min={0} max={4} step={0.1} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.expand[1]} onChange={(e, v) => { ImitationPageCanvas.state.function.onNavigationExpandChange(1, v) }}>
          <AccordionSummary>Paint</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>Control</Grid>
              <Grid item xs={12} style={{ display: 'flex' }}>
                <FormControl sx={SelectSX().sx} style={{ width: 100, marginRight: 8 }}>
                  <Select {...SelectSX()} value={ImitationPageCanvas.state.store.paint.filter[0]} onChange={(e) => { ImitationPageCanvas.state.function.onPaintFilterTypeSwitch(e.target.value) }}>
                    {
                      Array.from(new Set(ImitationPageCanvas.state.store.paint.information.map(i => i.type)))
                        .map(i => <MenuItem value={i} key={i}>{i}</MenuItem>)
                    }
                  </Select>
                </FormControl>
                <FormControl sx={SelectSX().sx} style={{ width: 0, flexGrow: 1 }}>
                  <Select {...SelectSX()} value={ImitationPageCanvas.state.store.paint.control} onChange={(e) => { ImitationPageCanvas.state.function.onPaintSwitch(e.target.value) }}>
                    {
                      ImitationPageCanvas.state.store.paint.information
                        .filter(i => i.type === ImitationPageCanvas.state.store.paint.filter[0])
                        .map(i => <MenuItem value={i._hash} key={i._hash}>{i.name}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Grid>
              {
                paintFind.settingComponent.map((Componnet, index) => <Componnet key={ImitationPageCanvas.state.store.paint.control + index} value={ImitationPageCanvas.state.store.paint.setting} onChange={() => ImitationPageCanvas.state.function.update()} />)
              }
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.expand[2]} onChange={(e, v) => { ImitationPageCanvas.state.function.onNavigationExpandChange(2, v) }}>
          <AccordionSummary>Layer</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              {
                ImitationPageCanvas.state.store.canvas.information.map(i => {
                  return <Grid key={i._hash} item xs={12}>
                    <Button fullWidth variant={ImitationPageCanvas.state.store.canvas.control === i._hash ? 'contained' : 'outlined'} onClick={() => { ImitationPageCanvas.state.store.canvas.control = i._hash; ImitationPageCanvas.state.function.update() }} style={{ marginRight: 8 }}>{i._hash}</Button>
                  </Grid>
                })
              }
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <div>Action</div>
                <div>
                  <Button variant='outlined' style={{ padding: 5, minWidth: 'auto', marginLeft: 4 }} onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerCreate() }}><AddIcon /></Button>
                </div>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      {
        canvasFind !== undefined ?
          <Grid item xs={12}>
            <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.expand[3]} onChange={(e, v) => { ImitationPageCanvas.state.function.onNavigationExpandChange(3, v) }}>
              <AccordionSummary>Layer Setting</AccordionSummary>
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
                      <Button variant='outlined' style={{ padding: 5, minWidth: 'auto', marginLeft: 4 }} onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerMove(canvasFind._hash, 0) }}><KeyboardArrowUpIcon color='primary' /></Button>
                      <Button variant='outlined' style={{ padding: 5, minWidth: 'auto', marginLeft: 4 }} onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerMove(canvasFind._hash, 1) }}><KeyboardArrowDownIcon color='primary' /></Button>
                      <Button variant='outlined' style={{ padding: 5, minWidth: 'auto', marginLeft: 4 }} onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerRemove(canvasFind._hash) }}><DeleteIcon color='primary' /></Button>
                    </div>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          : null
      }

      {
        canvasFind !== undefined ?
          <Grid item xs={12}>
            <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.expand[4]} onChange={(e, v) => { ImitationPageCanvas.state.function.onNavigationExpandChange(4, v) }}>
              <AccordionSummary>Layer Action</AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    Visibility Track {canvasActionVisibilityTrackFindIndex}
                  </Grid>
                  <Grid item xs={12}>
                    <Slider value={canvasActionVisibilityTrackFindIndex} onChange={(e, v) => { ImitationPageCanvas.state.function.onCanvasLayerActionVisibilityTracks(canvasFind._hash, v) }} min={0} max={canvasFind.action.length} step={1} />
                  </Grid>

                  <Grid item xs={12}>
                    Visibility
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

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.expand[5]} onChange={(e, v) => { ImitationPageCanvas.state.function.onNavigationExpandChange(5, v) }}>
          <AccordionSummary>Action</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button fullWidth style={{ position: 'relative' }} variant='outlined' onClick={() => { ImitationPageCanvas.state.function.onSave(0) }}><SaveIcon style={{ position: 'absolute', left: 8, top: 0, bottom: 0, margin: 'auto' }} />Save Source</Button>
              </Grid>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button fullWidth style={{ position: 'relative' }} variant='outlined' onClick={() => { ImitationPageCanvas.state.function.onSave(1) }}><SaveIcon style={{ position: 'absolute', left: 8, top: 0, bottom: 0, margin: 'auto' }} />Save Canvas</Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

    </Grid>
  </div >
}

function App() {
  const onClose = () => {
    ImitationPageCanvas.state.store.navigation.open = false
    ImitationPageCanvas.state.function.update()
  }

  if (ImitationGlobal.state.store.navigation.mode === 0) {
    return <Paper {...PaperSX()} style={{ width: ImitationPageCanvas.state.store.navigation.open ? 360 : 0, marginRight: ImitationPageCanvas.state.store.navigation.open ? 16 : 0, height: '100%', transitionProperty: 'width, margin-right', transitionDuration: '1s', overflow: 'hidden' }}>
      <Content />
    </Paper>
  }

  if (ImitationGlobal.state.store.navigation.mode === 1) {
    return <Drawer {...DrawerSX()} anchor='left' open={ImitationPageCanvas.state.store.navigation.open} onClose={() => onClose()}>
      <Content />
    </Drawer>
  }

  return null
}

const dependence = [{ instance: ImitationGlobal, dependence: state => [state.store.navigation.mode] }]

export default withBindComponentPure(App, dependence)