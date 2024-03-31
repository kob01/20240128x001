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
  const paintFind = ImitationPageCanvas.state.memo.paintFind(ImitationPageCanvas.state.store.paint.control)

  return <div style={{ width: 360, height: '100%', padding: 16, overflowY: 'auto' }}>
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.basic.expand.view} onChange={(e, v) => { ImitationPageCanvas.state.function.onNavigationExpandChange('basic', 'view', v) }}>
          <AccordionSummary>View</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                Scale {ImitationPageCanvas.state.store.view.scale}
              </Grid>
              <Grid item xs={12}>
                <Slider value={ImitationPageCanvas.state.store.view.scale} onChange={(e, v) => { ImitationPageCanvas.state.function.onViewScaleChangeThrottleLastRIC(v) }} min={0.02} max={24} step={0.01} />
              </Grid>

              <Grid item xs={12}>
                Translate X {ImitationPageCanvas.state.store.view.translateX}
              </Grid>
              <Grid item xs={12}>
                <Slider value={ImitationPageCanvas.state.store.view.translateX} onChange={(e, v) => { ImitationPageCanvas.state.function.onViewTranslateXChangeThrottleLastRIC(v) }} min={Math.min(ImitationPageCanvas.state.store.view.translateX, -1000)} max={Math.max(ImitationPageCanvas.state.store.view.translateX, 1000)} step={1} />
              </Grid>

              <Grid item xs={12}>
                Translate Y {ImitationPageCanvas.state.store.view.translateY}
              </Grid>
              <Grid item xs={12}>
                <Slider value={ImitationPageCanvas.state.store.view.translateY} onChange={(e, v) => { ImitationPageCanvas.state.function.onViewTranslateYChangeThrottleLastRIC(v) }} min={Math.min(ImitationPageCanvas.state.store.view.translateY, -1000)} max={Math.max(ImitationPageCanvas.state.store.view.translateY, 1000)} step={1} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.basic.expand.control} onChange={(e, v) => { ImitationPageCanvas.state.function.onNavigationExpandChange('basic', 'control', v) }}>
          <AccordionSummary>Control</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Paint</div>
                <div>
                  <Switch {...SwitchSX()} checked={ImitationPageCanvas.state.store.control.paint} onChange={(e) => { ImitationPageCanvas.state.function.onControlChange('paint', e.target.checked) }} />
                </div>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Move</div>
                <div>
                  <Switch {...SwitchSX()} checked={ImitationPageCanvas.state.store.control.move} onChange={(e) => { ImitationPageCanvas.state.function.onControlChange('move', e.target.checked) }} />
                </div>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.basic.expand.paint} onChange={(e, v) => { ImitationPageCanvas.state.function.onNavigationExpandChange('basic', 'paint', v) }}>
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
        <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.basic.expand.layer} onChange={(e, v) => { ImitationPageCanvas.state.function.onNavigationExpandChange('basic', 'layer', v) }}>
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
                  <IconButton onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerCreate() }}><AddIcon /></IconButton>
                </div>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.basic.expand.action} onChange={(e, v) => { ImitationPageCanvas.state.function.onNavigationExpandChange('basic', 'action', v) }}>
          <AccordionSummary>Action</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button fullWidth style={{ position: 'relative' }} variant='outlined' onClick={() => { ImitationPageCanvas.state.function.onSave(0) }}><SaveIcon style={{ position: 'absolute', left: 8, top: 0, bottom: 0, margin: 'auto' }} />Save Source</Button>
              </Grid>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button fullWidth style={{ position: 'relative' }} variant='outlined' onClick={() => { ImitationPageCanvas.state.function.onSave(1) }}><SaveIcon style={{ position: 'absolute', left: 8, top: 0, bottom: 0, margin: 'auto' }} />Save Canvas</Button>
              </Grid>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button fullWidth style={{ position: 'relative' }} variant='outlined' onClick={() => { ImitationPageCanvas.state.function.onClear() }}><SaveIcon style={{ position: 'absolute', left: 8, top: 0, bottom: 0, margin: 'auto' }} />Clear Canvas</Button>
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
    ImitationPageCanvas.state.store.navigation.basic.open = false
    ImitationPageCanvas.state.function.update()
  }

  if (ImitationGlobal.state.store.navigation.mode === 0) {
    return <Paper {...PaperSX()} style={{ width: ImitationPageCanvas.state.store.navigation.basic.open ? 360 : 0, marginRight: ImitationPageCanvas.state.store.navigation.basic.open ? 16 : 0, height: '100%', transitionProperty: 'width, margin-light, margin-right', transitionDuration: '1s', overflow: 'hidden' }}>
      <Content />
    </Paper>
  }

  if (ImitationGlobal.state.store.navigation.mode === 1) {
    return <Drawer {...DrawerSX()} anchor='left' open={ImitationPageCanvas.state.store.navigation.basic.open} onClose={() => onClose()}>
      <Content />
    </Drawer>
  }

  return null
}

const dependence = [{ instance: ImitationGlobal, dependence: state => [state.store.navigation.mode] }]

export default withBindComponentPure(App, dependence)