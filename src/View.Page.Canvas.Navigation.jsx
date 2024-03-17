import React from 'react'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Drawer from '@mui/material/Drawer'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'

import SaveIcon from '@mui/icons-material/Save'
import DoneIcon from '@mui/icons-material/Done'
import SendIcon from '@mui/icons-material/Send'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import SettingsIcon from '@mui/icons-material/Settings'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { ImitationGlobal, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { fixed } from './utils.common'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function Content() {
  const canvasFind = ImitationPageCanvas.state.memo.canvasFind(ImitationPageCanvas.state.store.canvas.control)
  const paintFind = ImitationPageCanvas.state.memo.paintFind(ImitationPageCanvas.state.store.paint.control)

  return <div style={{ width: 360, height: '100%', padding: 16, overflowY: 'auto' }}>
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.expand[0]} onChange={(e, v) => { ImitationPageCanvas.state.store.navigation.expand[0] = v; ImitationPageCanvas.state.function.update() }}>
          <AccordionSummary>View</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Fullview</div>
                <div>
                  <Switch {...SwitchSX()} checked={ImitationPageCanvas.state.store.view.panorama} onChange={(e) => { ImitationPageCanvas.state.store.view.panorama = e.target.checked; ImitationPageCanvas.state.function.update(); }} />
                </div>
              </Grid> */}

              <Grid item xs={12}>
                Scale {ImitationPageCanvas.state.store.view.scale}
              </Grid>
              <Grid item xs={12}>
                <Slider value={ImitationPageCanvas.state.store.view.scale} onChange={(e, v) => { ImitationPageCanvas.state.store.view.scale = v; ImitationPageCanvas.state.function.update(); }} min={0} max={4} step={0.1} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.expand[1]} onChange={(e, v) => { ImitationPageCanvas.state.store.navigation.expand[1] = v; ImitationPageCanvas.state.function.update() }}>
          <AccordionSummary>Paint</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>Control</Grid>
              <Grid item xs={12}>
                <FormControl sx={SelectSX().sx} fullWidth>
                  <Select {...SelectSX()} value={ImitationPageCanvas.state.store.paint.control} onChange={(e) => { ImitationPageCanvas.state.function.onSwitchPaint(e.target.value) }}>
                    {
                      ImitationPageCanvas.state.store.paint.information.map(i => <MenuItem value={i._hash} key={i._hash}>{i.name}</MenuItem>)
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
        <Accordion {...AccordionSX()} expanded={ImitationPageCanvas.state.store.navigation.expand[2]} onChange={(e, v) => { ImitationPageCanvas.state.store.navigation.expand[2] = v; ImitationPageCanvas.state.function.update() }}>
          <AccordionSummary>Layer</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {
                ImitationPageCanvas.state.store.canvas.information.map(i => {
                  return <Grid key={i._hash} item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button fullWidth variant={ImitationPageCanvas.state.store.canvas.control === i._hash ? 'outlined' : 'text'} onClick={() => { ImitationPageCanvas.state.store.canvas.control = i._hash; ImitationPageCanvas.state.function.update() }} style={{ marginRight: 8 }}>{i._hash}</Button>
                    <Tooltip {...TooltipSX()} title={
                      <Paper {...PaperSX()} style={{ padding: 12 }}>
                        <IconButton onClick={() => { ImitationPageCanvas.state.function.onRemoveLayer(i._hash) }}><DeleteIcon color='primary' /></IconButton>
                        <IconButton onClick={() => { ImitationPageCanvas.state.function.onMoveLayer(i._hash, 0) }}><KeyboardArrowUpIcon /></IconButton>
                        <IconButton onClick={() => { ImitationPageCanvas.state.function.onMoveLayer(i._hash, 1) }}><KeyboardArrowDownIcon /></IconButton>
                      </Paper>
                    }>
                      <IconButton><SettingsIcon color='primary' /></IconButton>
                    </Tooltip>
                  </Grid>
                })
              }
              <Grid item xs={12}>
                <Button fullWidth variant='text' onClick={() => { ImitationPageCanvas.state.function.onCreateLayer() }}><AddIcon /></Button>
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

  return <Dialog open={ImitationPageCanvas.state.store.setting.dialog} sx={{ ...DialogSX().sx, '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={onClose}>
    <DialogTitle>Setting</DialogTitle>
    <DialogContent dividers>

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Tabs {...TabsSX()} value={ImitationPageCanvas.state.store.setting.tab} onChange={(e, v) => { ImitationPageCanvas.state.store.setting.tab = v; ImitationPageCanvas.state.function.update(); }}>
            <Tab label='View' value={0} />
            <Tab label='Paint' value={1} />
            <Tab label='Layer' value={2} />
          </Tabs>
        </Grid>

        <Grid item xs={12}>
          <Divider {...DividerSX()} />
        </Grid>

        {
          ImitationPageCanvas.state.store.setting.tab === 0 ?
            <>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Scale Layer All</div>
                <div>
                  <Switch {...SwitchSX()} checked={ImitationPageCanvas.state.store.view.scaleLayerAll} onChange={(e) => { ImitationPageCanvas.state.store.view.scaleLayerAll = e.target.checked; ImitationPageCanvas.state.function.update(); }} disabled={ImitationPageCanvas.state.store.view.perspective === true} />
                </div>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Translate Layer</div>
                <div>
                  <Switch {...SwitchSX()} checked={ImitationPageCanvas.state.store.view.translateLayer} onChange={(e) => { ImitationPageCanvas.state.function.onSwitchTranslateLayer(e.target.checked) }} />
                </div>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Translate Layer All</div>
                <div>
                  <Switch {...SwitchSX()} checked={ImitationPageCanvas.state.store.view.translateLayerAll} onChange={(e) => { ImitationPageCanvas.state.function.onSwitchTranslateLayerAll(e.target.checked) }} />
                </div>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Translate Fix</div>
                <div>
                  <Button variant='text' onClick={() => ImitationPageCanvas.state.function.onTranslateFix()} children={<SendIcon />} />
                </div>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Resize</div>
                <div>
                  <Switch {...SwitchSX()} checked={ImitationPageCanvas.state.store.view.resizeLayer} onChange={(e) => { ImitationPageCanvas.state.function.onSwitchRisezeLayer(e.target.checked) }} />
                </div>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Fullview</div>
                <div>
                  <Switch {...SwitchSX()} checked={ImitationPageCanvas.state.store.view.panorama} onChange={(e) => { ImitationPageCanvas.state.store.view.panorama = e.target.checked; ImitationPageCanvas.state.function.update(); }} />
                </div>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Perspective</div>
                <div>
                  <Switch {...SwitchSX()} checked={ImitationPageCanvas.state.store.view.perspective} onChange={(e) => { ImitationPageCanvas.state.function.onSwitchPerspective(e.target.checked) }} />
                </div>
              </Grid>

              {
                ImitationPageCanvas.state.store.view.perspective === true ?
                  <>
                    <Grid item xs={12}>
                      Perspective Gap {fixed(ImitationPageCanvas.state.store.view.perspectiveGap)}
                    </Grid>
                    <Grid item xs={12}>
                      <Slider value={ImitationPageCanvas.state.store.view.perspectiveGap} onChange={(e, v) => { ImitationPageCanvas.state.store.view.perspectiveGap = v; ImitationPageCanvas.state.function.update(); }} min={0} max={400} step={1} />
                    </Grid>

                    <Grid item xs={12}>
                      Perspective Rotate X {fixed(ImitationPageCanvas.state.store.view.perspectiveRotateX)}
                    </Grid>
                    <Grid item xs={12}>
                      <Slider value={ImitationPageCanvas.state.store.view.perspectiveRotateX} onChange={(e, v) => { ImitationPageCanvas.state.store.view.perspectiveRotateX = v; ImitationPageCanvas.state.function.update(); }} min={-360} max={360} step={1} />
                    </Grid>

                    <Grid item xs={12}>
                      Perspective Rotate Y {fixed(ImitationPageCanvas.state.store.view.perspectiveRotateY)}
                    </Grid>
                    <Grid item xs={12}>
                      <Slider value={ImitationPageCanvas.state.store.view.perspectiveRotateY} onChange={(e, v) => { ImitationPageCanvas.state.store.view.perspectiveRotateY = v; ImitationPageCanvas.state.function.update(); }} min={-360} max={360} step={1} />
                    </Grid>
                  </>
                  : null
              }
            </>
            : null
        }

        {
          ImitationPageCanvas.state.store.setting.tab === 1 ?
            <>
              <Grid item xs={12}>
                Current
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={SelectSX().sx} fullWidth>
                  <Select {...SelectSX()} value={ImitationPageCanvas.state.store.paint.current} onChange={(e) => { ImitationPageCanvas.state.function.onSwitchPaint(e.target.value) }}>
                    {
                      ImitationPageCanvas.state.store.paint.option.map(i => {
                        return <MenuItem value={i._hash} key={i._hash}>{i.label}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>

              {
                paintFind.settingComponent.map((I, index) => <I key={index} value={ImitationPageCanvas.state.store.paint.setting} onChange={() => ImitationPageCanvas.state.function.update()} />)
              }
            </>
            : null
        }

        {
          ImitationPageCanvas.state.store.setting.tab === 2 ?
            <>
              <Grid item xs={12}>
                <Tabs {...TabsSX()} value={ImitationPageCanvas.state.store.setting.tabLayer} onChange={(e, v) => { ImitationPageCanvas.state.store.setting.tabLayer = v; ImitationPageCanvas.state.function.update(); }}>
                  <Tab label='Current' value={0} />
                  <Tab label='Create' value={1} />
                </Tabs>
              </Grid>

              <Grid item xs={12}>
                <Divider {...DividerSX()} />
              </Grid>

              {
                ImitationPageCanvas.state.store.setting.tabLayer === 0 ?
                  <>
                    <Grid item xs={12}>
                      Width
                    </Grid>
                    <Grid item xs={12}>
                      <TextField {...TextFieldSX()} value={canvasFind.width} onChange={e => { canvasFind.width = e.target.value; ImitationPageCanvas.state.function.update(); }} fullWidth autoComplete='off' />
                    </Grid>

                    <Grid item xs={12}>
                      Height
                    </Grid>
                    <Grid item xs={12}>
                      <TextField {...TextFieldSX()} value={canvasFind.height} onChange={e => { canvasFind.height = e.target.value; ImitationPageCanvas.state.function.update(); }} fullWidth autoComplete='off' />
                    </Grid>

                    <Grid item xs={12}>
                      Translate X
                    </Grid>
                    <Grid item xs={12}>
                      <TextField {...TextFieldSX()} value={canvasFind.translateX} onChange={e => { canvasFind.translateX = e.target.value; ImitationPageCanvas.state.function.update(); }} fullWidth autoComplete='off' />
                    </Grid>

                    <Grid item xs={12}>
                      Translate Y
                    </Grid>
                    <Grid item xs={12}>
                      <TextField {...TextFieldSX()} value={canvasFind.translateY} onChange={e => { canvasFind.translateY = e.target.value; ImitationPageCanvas.state.function.update(); }} fullWidth autoComplete='off' />
                    </Grid>

                    <Grid item xs={12}>
                      Scale {fixed(canvasFind.scale * 10)}
                    </Grid>
                    <Grid item xs={12}>
                      <Slider value={canvasFind.scale * 10} onChange={(e, v) => { canvasFind.scale = v * 0.1; ImitationPageCanvas.state.function.update(); }} min={1} max={20} step={1} />
                    </Grid>

                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>Remove</div>
                      <div>
                        <Button variant='text' onClick={() => ImitationPageCanvas.state.function.onRemoveLayer(canvasFind._hash)} children={<SendIcon />} />
                      </div>
                    </Grid>
                  </>
                  : null
              }

              {
                ImitationPageCanvas.state.store.setting.tabLayer === 1 ?
                  <>
                    <Grid item xs={12}>
                      Width
                    </Grid>
                    <Grid item xs={12}>
                      <TextField {...TextFieldSX()} value={ImitationPageCanvas.state.store.layer.width} onChange={e => { ImitationPageCanvas.state.store.layer.width = e.target.value; ImitationPageCanvas.state.function.update(); }} fullWidth autoComplete='off' />
                    </Grid>

                    <Grid item xs={12}>
                      Height
                    </Grid>
                    <Grid item xs={12}>
                      <TextField {...TextFieldSX()} value={ImitationPageCanvas.state.store.layer.height} onChange={e => { ImitationPageCanvas.state.store.layer.height = e.target.value; ImitationPageCanvas.state.function.update(); }} fullWidth autoComplete='off' />
                    </Grid>

                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>Create</div>
                      <div>
                        <Button variant='text' onClick={() => ImitationPageCanvas.state.function.onCreateLayer(ImitationPageCanvas.state.store.layer)} children={<SendIcon />} />
                      </div>
                    </Grid>
                  </>
                  : null
              }
            </>
            : null
        }

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => ImitationPageCanvas.state.function.onClear()} children={<RemoveIcon />} />
      <Button variant='contained' onClick={() => ImitationPageCanvas.state.function.onSave()} children={<SaveIcon />} />
      <Button variant='contained' onClick={onClose} children={<DoneIcon />} />
    </DialogActions>
  </Dialog >
}

export default withBindComponentPure(App, [{ instance: ImitationGlobal, dependence: state => [state.store.navigation.mode] }, { instance: ImitationPageCanvas, dependence: state => [state.store.update] }])