import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'

import ColorLensIcon from '@mui/icons-material/ColorLens'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import LayersIcon from '@mui/icons-material/Layers'
import DrawIcon from '@mui/icons-material/Draw'
import LockIcon from '@mui/icons-material/Lock'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CopyAllIcon from '@mui/icons-material/CopyAll'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SaveIcon from '@mui/icons-material/Save'
import ClearAllIcon from '@mui/icons-material/ClearAll'

import { ClickAwayListenerIfOpen } from './View.Component.ClickAwayListenerIfOpen'

import { ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { PopperSX, TextFieldSX, TextFieldSmallSX, DrawerSX, DialogSX, DividerSX, SwitchSX, AccordionSX, PaperSX } from './utils.mui.sx'

import { hash, throttleLastRAF } from './utils.common'

import { localStorageCache } from './utils.const'

function Operation(props) {
  const canvasLayerFind = ImitationPageCanvas.state.memo.canvasLayerFind(props.canvasLayerHash)
  const canvasLayerRefFind = ImitationPageCanvas.state.memo.canvasLayerRefFind(props.canvasLayerHash)
  const canvasLayerOperationFind = ImitationPageCanvas.state.memo.canvasLayerOperationFind(props.canvasLayerHash, props.canvasOperationHash)
  const pencilFind = ImitationPageCanvas.state.memo.pencilFind(canvasLayerOperationFind.pencilHash)

  const updateThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationPageCanvas.state.function.update), [])
  const updateCanvasOffscreenRenderThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationPageCanvas.state.function.updateCanvasOffscreenRender), [])

  const onScaleXChange = (value) => {
    canvasLayerOperationFind.transform.scaleX = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onScaleYChange = (value) => {
    canvasLayerOperationFind.transform.scaleY = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onTranslateXChange = (value) => {
    canvasLayerOperationFind.transform.translateX = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onTranslateYChange = (value) => {
    canvasLayerOperationFind.transform.translateY = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  if (canvasLayerFind === undefined || canvasLayerOperationFind === undefined) return <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}><CircularProgress size={24} /></div>

  return <Grid container spacing={0} style={{ fontSize: 12 }}>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Visibility</div>
      <div>
        <Switch sx={SwitchSX()} size='small' checked={canvasLayerOperationFind.visibility} onChange={(e) => { ImitationPageCanvas.state.function.onCanvasOperationVisibility(canvasLayerFind._hash, canvasLayerOperationFind._hash, e.target.checked) }} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Scale X</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerOperationFind.transform.scaleX.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerOperationFind.transform.scaleX} onChange={(e, v) => { onScaleXChange(v) }} min={0.02} max={24} step={0.01} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Scale Y</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerOperationFind.transform.scaleY.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerOperationFind.transform.scaleY} onChange={(e, v) => { onScaleYChange(v) }} min={0.02} max={24} step={0.01} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Translate X</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerOperationFind.transform.translateX.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerOperationFind.transform.translateX} onChange={(e, v) => { onTranslateXChange(v) }} min={Math.min(canvasLayerOperationFind.transform.translateX, -1000)} max={Math.max(canvasLayerOperationFind.transform.translateX, 1000)} step={1} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Translate Y</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerOperationFind.transform.translateY.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerOperationFind.transform.translateY} onChange={(e, v) => { onTranslateYChange(v) }} min={Math.min(canvasLayerOperationFind.transform.translateY, -1000)} max={Math.max(canvasLayerOperationFind.transform.translateY, 1000)} step={1} />
      </div>
    </Grid>

    <Grid item xs={12}>
      <pencilFind.settingComponent value={canvasLayerOperationFind.setting} onChange={() => { canvasLayerRefFind.offscreenUpdate = true; ImitationPageCanvas.state.function.updateCanvasOffscreenRender(); ImitationPageCanvas.state.function.update(); }} inOperation={true} pushClickAwayRefs={props.pushClickAwayRefs} />
    </Grid>

  </Grid>
}

const OperationComponent = withBindComponentPure(
  Operation,
  [
    { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
  ]
)

function Operations(props) {
  const canvasLayerFind = ImitationPageCanvas.state.memo.canvasLayerFind(props.canvasLayerHash)

  const [operationProperty, setOperationProperty] = React.useState()

  if (canvasLayerFind === undefined) return <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}><CircularProgress size={24} /></div>

  if (canvasLayerFind.operation.length === 0) return <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}><CircularProgress size={24} /></div>

  return <Grid container spacing={0} style={{ fontSize: 12 }}>

    {
      canvasLayerFind.operation.map(i => {
        return <Grid key={i._hash} item xs={12} style={{ height: 32 }}>
          <div style={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size='small'>
                <LayersIcon color='primary' fontSize='small' />
              </IconButton>
              <div style={{ margin: '0 8px', fontSize: 12 }}>{i._hash}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onCanvasOperationVisibility(canvasLayerFind._hash, i._hash, !i.visibility) }}>
                <VisibilityIcon color='primary' fontSize='small' style={{ opacity: i.visibility ? 1 : 0.2, transition: '1s all' }} />
              </IconButton>
              <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onCanvasOperationRemove(canvasLayerFind._hash, i._hash) }}>
                <DeleteIcon color='primary' fontSize='small' />
              </IconButton>
              <ClickAwayListenerIfOpen onClick={({ inContainStart, inContainEnd, setOpen }) => { if (inContainStart === false && inContainEnd === false) setOpen(false) }}>
                {
                  ({ open, setOpen, pushClickAwayRef }) => {
                    return <Tooltip
                      PopperProps={{ sx: PopperSX() }}
                      placement='left'
                      open={open}
                      title={
                        <div style={{ padding: 8, width: 320 }} ref={el => [...props.pushClickAwayRefs, pushClickAwayRef].forEach(i => i(el))}>
                          <Paper sx={PaperSX()} style={{ padding: 16 }}>
                            <OperationComponent {...operationProperty} pushClickAwayRefs={[...props.pushClickAwayRefs, pushClickAwayRef]} />
                          </Paper>
                        </div>
                      }
                      children={
                        <IconButton size='small' ref={el => [...props.pushClickAwayRefs, pushClickAwayRef].forEach(i => i(el))} onClick={() => { setOpen(true); setOperationProperty({ canvasLayerHash: canvasLayerFind._hash, canvasOperationHash: i._hash }) }}>
                          <EditIcon color='primary' fontSize='small' />
                        </IconButton>
                      }
                    />
                  }
                }
              </ClickAwayListenerIfOpen>
            </div>
          </div>
        </Grid>
      })
    }

  </Grid>
}

const OperationsComponent = withBindComponentPure(
  Operations,
  [
    { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
  ]
)

function Layer(props) {
  const canvasLayerFind = ImitationPageCanvas.state.memo.canvasLayerFind(props.canvasLayerHash)
  const canvasLayerRefFind = ImitationPageCanvas.state.memo.canvasLayerRefFind(props.canvasLayerHash)
  const canvasLayerOperationVisibilityTrackFindIndex = ImitationPageCanvas.state.memo.canvasLayerOperationVisibilityTrackFindIndex(props.canvasLayerHash, [JSON.stringify(canvasLayerFind.operation)])

  const updateThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationPageCanvas.state.function.update), [])
  const updateCanvasOffscreenRenderThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationPageCanvas.state.function.updateCanvasOffscreenRender), [])

  const [operationsProperty, setOperationsProperty] = React.useState()

  const onScaleXChange = (value) => {
    canvasLayerFind.scaleX = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onScaleYChange = (value) => {
    canvasLayerFind.scaleY = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onTranslateXChange = (value) => {
    canvasLayerFind.translateX = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onTranslateYChange = (value) => {
    canvasLayerFind.translateY = value
    canvasLayerRefFind.offscreenUpdate = true
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  if (canvasLayerFind === undefined) return null

  return <Grid container spacing={0} style={{ fontSize: 12 }}>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Visibility</div>
      <div>
        <Switch sx={SwitchSX()} size='small' checked={canvasLayerFind.visibility} onChange={(e) => { ImitationPageCanvas.state.function.onCanvasLayerVisibility(canvasLayerFind._hash, e.target.checked) }} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Scale X</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerFind.scaleX.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerFind.scaleX} onChange={(e, v) => { onScaleXChange(v) }} min={0.02} max={24} step={0.01} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Scale Y</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerFind.scaleY.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerFind.scaleY} onChange={(e, v) => { onScaleYChange(v) }} min={0.02} max={24} step={0.01} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Translate X</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerFind.translateX.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerFind.translateX} onChange={(e, v) => { onTranslateXChange(v) }} min={Math.min(canvasLayerFind.translateX, -1000)} max={Math.max(canvasLayerFind.translateX, 1000)} step={1} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Translate Y</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerFind.translateY.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerFind.translateY} onChange={(e, v) => { onTranslateYChange(v) }} min={Math.min(canvasLayerFind.translateY, -1000)} max={Math.max(canvasLayerFind.translateY, 1000)} step={1} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Copy Layer</div>
      <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerCopy(canvasLayerFind._hash) }}><CopyAllIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Remove Layer</div>
      <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerRemove(canvasLayerFind._hash) }}><DeleteIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Move Up Layer</div>
      <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerMove(canvasLayerFind._hash, 0) }}><KeyboardArrowUpIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Move Down Layer</div>
      <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerMove(canvasLayerFind._hash, 1) }}><KeyboardArrowDownIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Check Operations</div>
      <ClickAwayListenerIfOpen onClick={({ inContainStart, inContainEnd, setOpen }) => { if (inContainStart === false && inContainEnd === false) setOpen(false) }}>
        {
          ({ open, setOpen, pushClickAwayRef }) => {
            return <Tooltip
              PopperProps={{ sx: PopperSX() }}
              placement='left'
              open={open}
              title={
                <div style={{ padding: 8, width: 320 }} ref={el => [...props.pushClickAwayRefs, pushClickAwayRef].forEach(i => i(el))}>
                  <Paper sx={PaperSX()} style={{ padding: 16 }}>
                    <OperationsComponent {...operationsProperty} pushClickAwayRefs={[...props.pushClickAwayRefs, pushClickAwayRef]} />
                  </Paper>
                </div>
              }
              children={
                <IconButton size='small' ref={el => [...props.pushClickAwayRefs, pushClickAwayRef].forEach(i => i(el))} onClick={() => { setOpen(true); setOperationsProperty({ canvasLayerHash: canvasLayerFind._hash }) }}><LayersIcon color='primary' fontSize='small' /></IconButton>
              }
            />
          }
        }
      </ClickAwayListenerIfOpen>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Track Operations</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerOperationVisibilityTrackFindIndex}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerOperationVisibilityTrackFindIndex} onChange={(e, v) => { ImitationPageCanvas.state.function.onCanvasOperationVisibilityTracks(canvasLayerFind._hash, v) }} min={0} max={canvasLayerFind.operation.length} step={1} />
      </div>
    </Grid>

  </Grid>
}

const LayerComponent = withBindComponentPure(
  Layer,
  [
    { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
  ]
)

function Layers(props) {
  const [layerProperty, setLayerProperty] = React.useState()

  if (ImitationPageCanvas.state.store.source === undefined) return <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}><CircularProgress size={24} /></div>

  return <Grid container spacing={0} style={{ fontSize: 12 }}>
    {
      ImitationPageCanvas.state.store.source.canvas.layer.map(i => {
        return <Grid key={i._hash} item xs={12} style={{ height: 32 }}>
          <div style={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size='small' onClick={(e) => { ImitationPageCanvas.state.store.activeLayer = i._hash; ImitationPageCanvas.state.function.update() }}>
                <LayersIcon color='primary' fontSize='small' style={{ opacity: ImitationPageCanvas.state.store.activeLayer === i._hash ? 1 : 0.2, transition: '1s all' }} />
              </IconButton>
              <div style={{ margin: '0 8px', fontSize: 12 }}>{i._hash}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerVisibility(i._hash, !i.visibility) }}>
                <VisibilityIcon color='primary' fontSize='small' style={{ opacity: i.visibility ? 1 : 0.2, transition: '1s all' }} />
              </IconButton>
              <IconButton size='small' onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerRemove(i._hash) }}>
                <DeleteIcon color='primary' fontSize='small' />
              </IconButton>
              <ClickAwayListenerIfOpen onClick={({ inContainStart, inContainEnd, setOpen }) => { if (inContainStart === false && inContainEnd === false) setOpen(false) }}>
                {
                  ({ open, setOpen, pushClickAwayRef }) => {
                    return <Tooltip
                      PopperProps={{ sx: PopperSX() }}
                      placement='left'
                      open={open}
                      title={
                        <div style={{ padding: 8, width: 320 }} ref={el => [...props.pushClickAwayRefs, pushClickAwayRef].forEach(i => i(el))}>
                          <Paper sx={PaperSX()} style={{ padding: 16 }}>
                            <LayerComponent {...layerProperty} pushClickAwayRefs={[...props.pushClickAwayRefs, pushClickAwayRef]} />
                          </Paper>
                        </div>
                      }
                      children={
                        <IconButton size='small' ref={el => [...props.pushClickAwayRefs, pushClickAwayRef].forEach(i => i(el))} onClick={() => { setOpen(true); setLayerProperty({ canvasLayerHash: i._hash }) }}>
                          <EditIcon color='primary' fontSize='small' />
                        </IconButton>
                      }
                    />
                  }
                }
              </ClickAwayListenerIfOpen>
            </div>
          </div>
        </Grid>
      })
    }

    <Grid item xs={12}>
      <Button fullWidth component='div' onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerCreate() }}>
        <AddIcon color='primary' fontSize='small' />
      </Button>
    </Grid>
  </Grid>
}

const LayersComponent = withBindComponentPure(
  Layers,
  [
    { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
  ]
)

function Pencil(props) {
  const pencilFind = ImitationPageCanvas.state.memo.pencilFind(props.pencilHash)

  if (pencilFind === undefined) return <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}><CircularProgress size={24} /></div>

  return <Grid container spacing={0} style={{ fontSize: 12 }}>

    <Grid item xs={12}>
      <pencilFind.settingComponent value={pencilFind.setting} onChange={() => { ImitationPageCanvas.state.function.update(); }} pushClickAwayRefs={props.pushClickAwayRefs} />
    </Grid>

  </Grid>
}

const PencilComponent = withBindComponentPure(
  Pencil,
  [
    { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
  ]
)

function Pencils(props) {
  const [pencilProperty, setPencilProperty] = React.useState()

  if (ImitationPageCanvas.state.store.pencil === undefined) return <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}><CircularProgress size={24} /></div>

  return <Grid container spacing={0} style={{ fontSize: 12 }}>
    {
      ImitationPageCanvas.state.store.pencil.map(i => {
        return <Grid key={i._hash} item xs={12} style={{ height: 32 }}>
          <div style={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size='small' onClick={(e) => { ImitationPageCanvas.state.store.activePencil = i._hash; ImitationPageCanvas.state.function.update() }}>
                <ColorLensIcon color='primary' fontSize='small' style={{ opacity: ImitationPageCanvas.state.store.activePencil === i._hash ? 1 : 0.2, transition: '1s all' }} />
              </IconButton>
              <div style={{ margin: '0 8px', fontSize: 12 }}>{i.name}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ClickAwayListenerIfOpen onClick={({ inContainStart, inContainEnd, setOpen }) => { if (inContainStart === false && inContainEnd === false) setOpen(false) }}>
                {
                  ({ open, setOpen, pushClickAwayRef }) => {
                    return <Tooltip
                      PopperProps={{ sx: PopperSX() }}
                      placement='left'
                      open={open}
                      title={
                        <div style={{ padding: 8, width: 320 }} ref={el => [...props.pushClickAwayRefs, pushClickAwayRef].forEach(i => i(el))}>
                          <Paper sx={PaperSX()} style={{ padding: 16 }}>
                            <PencilComponent {...pencilProperty} pushClickAwayRefs={[...props.pushClickAwayRefs, pushClickAwayRef]} />
                          </Paper>
                        </div>
                      }
                      children={
                        <IconButton size='small' ref={el => [...props.pushClickAwayRefs, pushClickAwayRef].forEach(i => i(el))} onClick={(e) => { setOpen(true); setPencilProperty({ pencilHash: i._hash }); }}>
                          <EditIcon color='primary' fontSize='small' />
                        </IconButton>
                      }
                    />
                  }
                }
              </ClickAwayListenerIfOpen>
            </div>
          </div>
        </Grid>
      })
    }
  </Grid>
}

const PencilsComponent = withBindComponentPure(
  Pencils,
  [
    { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
  ]
)

function Control() {
  return <Grid container spacing={0} style={{ fontSize: 12 }}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Enable Draw</div>
      <div>
        <Switch sx={SwitchSX()} size='small' checked={ImitationPageCanvas.state.store.controlDraw} onChange={(e) => { ImitationPageCanvas.state.store.controlDraw = e.target.checked; ImitationPageCanvas.state.function.update() }} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Enable Move</div>
      <div>
        <Switch sx={SwitchSX()} size='small' checked={ImitationPageCanvas.state.store.controlMove} onChange={(e) => { ImitationPageCanvas.state.store.controlMove = e.target.checked; ImitationPageCanvas.state.function.update() }} />
      </div>
    </Grid>
  </Grid>
}

const ControlComponent = withBindComponentPure(
  Control,
  [
    { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.store.controlDraw, ImitationPageCanvas.state.store.controlMove] }
  ]
)

function View() {
  const updateThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationPageCanvas.state.function.update), [])
  const updateCanvasOffscreenRenderThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationPageCanvas.state.function.updateCanvasOffscreenRender), [])

  const onScaleXChange = (value) => {
    ImitationPageCanvas.state.store.viewScaleX = value
    ImitationPageCanvas.state.store.refLayer.forEach(i => i.offscreenUpdate = true)
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onScaleYChange = (value) => {
    ImitationPageCanvas.state.store.viewScaleY = value
    ImitationPageCanvas.state.store.refLayer.forEach(i => i.offscreenUpdate = true)
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onTranslateXChange = (value) => {
    ImitationPageCanvas.state.store.viewTranslateX = value
    ImitationPageCanvas.state.store.refLayer.forEach(i => i.offscreenUpdate = true)
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  const onTranslateYChange = (value) => {
    ImitationPageCanvas.state.store.viewTranslateY = value
    ImitationPageCanvas.state.store.refLayer.forEach(i => i.offscreenUpdate = true)
    updateCanvasOffscreenRenderThrottleLastRAF()
    updateThrottleLastRAF()
  }

  return <Grid container spacing={0} style={{ fontSize: 12 }}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Scale X</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{ImitationPageCanvas.state.store.viewScaleX.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={ImitationPageCanvas.state.store.viewScaleX} onChange={(e, v) => { onScaleXChange(v) }} min={0.02} max={24} step={0.01} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Scale Y</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{ImitationPageCanvas.state.store.viewScaleY.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={ImitationPageCanvas.state.store.viewScaleY} onChange={(e, v) => { onScaleYChange(v) }} min={0.02} max={24} step={0.01} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Translate X</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{ImitationPageCanvas.state.store.viewTranslateX.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={ImitationPageCanvas.state.store.viewTranslateX} onChange={(e, v) => { onTranslateXChange(v) }} min={Math.min(ImitationPageCanvas.state.store.viewTranslateX, -1000)} max={Math.max(ImitationPageCanvas.state.store.viewTranslateX, 1000)} step={1} />
      </div>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Translate Y</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{ImitationPageCanvas.state.store.viewTranslateY.toFixed(2)}</div>
        <Slider size='small' style={{ width: 120 }} value={ImitationPageCanvas.state.store.viewTranslateY} onChange={(e, v) => { onTranslateYChange(v) }} min={Math.min(ImitationPageCanvas.state.store.viewTranslateY, -1000)} max={Math.max(ImitationPageCanvas.state.store.viewTranslateY, 1000)} step={1} />
      </div>
    </Grid>
  </Grid>
}

const ViewComponent = withBindComponentPure(
  View,
  [
    {
      instance: ImitationPageCanvas, dependence: state => [
        ImitationPageCanvas.state.store.viewScaleX,
        ImitationPageCanvas.state.store.viewScaleY,
        ImitationPageCanvas.state.store.viewTranslateX,
        ImitationPageCanvas.state.store.viewTranslateY,
      ]
    }
  ]
)

function LocalStorage() {
  const navigationNavigationWindow = () => JSON.stringify(ImitationPageCanvas.state.store.navigationWindow.map(i => ({ ...i, load: false })))
  const canvasSource = () => JSON.stringify(ImitationPageCanvas.state.store.source)
  const canvasActive = () => JSON.stringify(ImitationPageCanvas.state.store.active)

  const saveLocalStorage = () => {
    const cache = {
      localStorageNavigationNavigationWindow: JSON.parse(navigationNavigationWindow()),
      localStorageCanvasSource: JSON.parse(canvasSource()),
      localStorageCanvasActive: JSON.parse(canvasActive())
    }

    window.localStorage.setItem(localStorageCache, JSON.stringify(cache))
  }

  const clearLocalStorage = () => {
    window.localStorage.removeItem(localStorageCache)
  }

  return <Grid container spacing={0} style={{ fontSize: 12 }}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Save All Storage</div>
      <IconButton size='small' onClick={() => { saveLocalStorage() }}><SaveIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Clear All Storage</div>
      <IconButton size='small' onClick={() => { clearLocalStorage() }}><ClearAllIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Copy Navigation Accordion Window</div>
      <IconButton size='small' onClick={() => { navigator.clipboard.writeText(navigationNavigationWindow()) }}><CopyAllIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Copy Canvas Source</div>
      <IconButton size='small' onClick={() => { navigator.clipboard.writeText(canvasSource()) }}><CopyAllIcon color='primary' fontSize='small' /></IconButton>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
      <div>Copy Canvas Active</div>
      <IconButton size='small' onClick={() => { navigator.clipboard.writeText(canvasActive()) }}><CopyAllIcon color='primary' fontSize='small' /></IconButton>
    </Grid>
  </Grid>
}

const LocalStorageComponent = withBindComponentPure(
  LocalStorage,
  [
    {
      instance: ImitationPageCanvas, dependence: state => []
    }
  ]
)

const App = [
  { Component: ControlComponent, Icon: LockIcon },
  { Component: LayersComponent, Icon: LayersIcon },
  { Component: PencilsComponent, Icon: DrawIcon },
  { Component: ViewComponent, Icon: ViewCarouselIcon },
  { Component: LocalStorageComponent, Icon: SaveIcon },
]

export default App