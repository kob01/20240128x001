import React from 'react'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Tooltip from '@mui/material/Tooltip'

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { NavigationItem, NavigationAccordion } from './View.Navigation.Component'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function View() {
  return <Grid container spacing={2}>

    <Grid item xs={12}>
      <NavigationAccordion text={'View'} type={['canvas', 'view']}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Scale X {ImitationPageCanvas.state.store.view.scaleX}
          </Grid>
          <Grid item xs={12}>
            <Slider value={ImitationPageCanvas.state.store.view.scaleX} onChange={(e, v) => { ImitationPageCanvas.state.function.onViewScaleXChangeThrottleLastRIC(v) }} min={0.02} max={24} step={0.01} />
          </Grid>

          <Grid item xs={12}>
            Scale Y {ImitationPageCanvas.state.store.view.scaleY}
          </Grid>
          <Grid item xs={12}>
            <Slider value={ImitationPageCanvas.state.store.view.scaleY} onChange={(e, v) => { ImitationPageCanvas.state.function.onViewScaleYChangeThrottleLastRIC(v) }} min={0.02} max={24} step={0.01} />
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
      </NavigationAccordion>
    </Grid>

  </Grid>
}

function Basic() {
  return <Grid container spacing={2}>

    <Grid item xs={12}>
      <NavigationAccordion text={'View'} type={['canvas', 'view']}>
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
      </NavigationAccordion>
    </Grid>

    <Grid item xs={12}>
      <NavigationAccordion text={'Control'} type={['canvas', 'control']}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>Paint</div>
            <div>
              <Switch {...SwitchSX()} checked={ImitationPageCanvas.state.store.control.paint} onChange={(e) => { ImitationPageCanvas.state.store.control.paint = e.target.checked; ImitationPageCanvas.state.function.update() }} />
            </div>
          </Grid>
        </Grid>
      </NavigationAccordion>
    </Grid>

    <Grid item xs={12}>
      <NavigationAccordion text={'Action'} type={['canvas', 'action']}>
        <Grid container spacing={1}>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button fullWidth style={{ position: 'relative', justifyContent: 'flex-start' }} onClick={() => { ImitationPageCanvas.state.function.onSave(0) }}><SaveIcon style={{ marginRight: 8 }} />Save Source</Button>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button fullWidth style={{ position: 'relative', justifyContent: 'flex-start' }} onClick={() => { ImitationPageCanvas.state.function.onSave(1) }}><SaveIcon style={{ marginRight: 8 }} />Save Canvas</Button>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button fullWidth style={{ position: 'relative', justifyContent: 'flex-start' }} onClick={() => { ImitationPageCanvas.state.function.onClear() }}><SaveIcon style={{ marginRight: 8 }} />Clear Canvas</Button>
          </Grid>
        </Grid>
      </NavigationAccordion>
    </Grid>

  </Grid>
}

function Paint() {
  const paintFind = ImitationPageCanvas.state.memo.paintFind(ImitationPageCanvas.state.store.paint.control)

  return <Grid container spacing={2}>

    <Grid item xs={12}>
      <NavigationAccordion text={'Paint'} type={['canvas', 'paint']}>
        <Grid container spacing={2}>
          <Grid item xs={12}>Control</Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {
                ImitationPageCanvas.state.store.paint.information.map(i => {
                  return <Grid item key={i._hash}>
                    <Button variant={ImitationPageCanvas.state.store.paint.control === i._hash ? 'contained' : 'text'} onClick={(e) => { ImitationPageCanvas.state.function.onPaintSwitch(i._hash) }}>{i.name}</Button>
                  </Grid>
                })
              }
            </Grid>
          </Grid>
        </Grid>
      </NavigationAccordion>
    </Grid>

    <Grid item xs={12}>
      <NavigationAccordion text={'Setting'} type={['canvas', 'paintsetting']}>
        <paintFind.settingComponent value={ImitationPageCanvas.state.store.paint.setting} onChange={() => ImitationPageCanvas.state.function.update()} />
      </NavigationAccordion>
    </Grid>

  </Grid>
}

function Layer() {
  const canvasFind = ImitationPageCanvas.state.memo.canvasFind(ImitationPageCanvas.state.store.canvas.control)
  const canvasActionVisibilityTrackFindIndex = ImitationPageCanvas.state.memo.canvasActionVisibilityTrackFindIndex(ImitationPageCanvas.state.store.canvas.control, canvasFind ? [canvasFind.action.map(i => i.visibility).join('')] : [''])

  return <Grid container spacing={2}>

    <Grid item xs={12}>
      <NavigationAccordion text={'Layer'} type={['canvas', 'layer']}>
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
      </NavigationAccordion>
    </Grid>

    {
      canvasFind !== undefined ?
        <Grid item xs={12}>
          <NavigationAccordion text={'Setting'} type={['canvas', 'layersetting']}>
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
          </NavigationAccordion>
        </Grid>
        : null
    }

    {
      canvasFind !== undefined && canvasFind.action.length > 0 ?
        <Grid item xs={12}>
          <NavigationAccordion text={'Action'} type={['canvas', 'layeraction']}>
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
                    canvasFind.action.map((i, index) => {
                      return <Grid item key={i._hash}>
                        <Button variant={i.visibility ? 'contained' : 'outlined'} style={{ padding: 0, width: 36, height: 36, minWidth: 'auto' }} color='primary' onClick={() => ImitationPageCanvas.state.function.onCanvasLayerActionVisibilityTrack(canvasFind._hash, index)}>{String(index + 1).padStart(2, '0')}</Button>
                      </Grid>
                    })
                  }
                </Grid>
              </Grid>
            </Grid>
          </NavigationAccordion>
        </Grid>
        : null
    }

  </Grid>
}

function App() {
  return <>
    <NavigationItem children={<View />} text={'View'} type={['canvas', 'view']} />
    <NavigationItem children={<Basic />} text={'Basic'} type={['canvas', 'basic']} />
    <NavigationItem children={<Paint />} text={'Paint'} type={['canvas', 'paint']} />
    <NavigationItem children={<Layer />} text={'Layer'} type={['canvas', 'layer']} />
  </>
}

const dependence = [
  { instance: ImitationGlobal, dependence: state => [state.store.rect, state.store.recting] },
  { instance: ImitationNavigation, dependence: state => [...Object.values(state.store.expand.canvas), ...Object.values(state.store.tooltip.canvas)] },
  { instance: ImitationPageCanvas, dependence: state => [state.update.now] }
]

export default withBindComponentPure(App, dependence)