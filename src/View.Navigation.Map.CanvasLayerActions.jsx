import React from 'react'

import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LayersIcon from '@mui/icons-material/Layers'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { ButtonSX, DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App(props) {
  const accordionWindowsFind = ImitationNavigation.state.memo.accordionWindowsFind(props.accordionWindowsHash)
  const canvasLayerFind = ImitationPageCanvas.state.memo.canvasLayerFind(accordionWindowsFind.property.canvasLayerHash)
  const canvasLayerActionVisibilityTrackFindIndex = ImitationPageCanvas.state.memo.canvasLayerActionVisibilityTrackFindIndex(accordionWindowsFind.property.canvasLayerHash, canvasLayerFind ? [canvasLayerFind.action.map(i => i.visibility).join('')] : [''])

  if (canvasLayerFind === undefined) accordionWindowsFind.hide = true

  if (canvasLayerFind === undefined) return null

  return <Grid container spacing={0}>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      Layer Hash ID: {canvasLayerFind._hash}
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
      <div>Track Visibility</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>{canvasLayerActionVisibilityTrackFindIndex}</div>
        <Slider size='small' style={{ width: 120 }} value={canvasLayerActionVisibilityTrackFindIndex} onChange={(e, v) => { ImitationPageCanvas.state.function.onCanvasLayerActionVisibilityTracks(canvasLayerFind._hash, v) }} min={0} max={canvasLayerFind.action.length} step={1} />
      </div>
    </Grid>

    {
      canvasLayerFind.action.map(i => {
        return <Grid key={i._hash} item xs={12} style={{ height: 30 }}>
          <Button fullWidth component='div' style={{ justifyContent: 'space-between', alignItems: 'center', padding: '4.5px 8px' }} onClick={(e) => { ImitationPageCanvas.state.store.active.layer = i._hash; ImitationPageCanvas.state.function.update() }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LayersIcon color='primary' fontSize='small' style={{ opacity: ImitationPageCanvas.state.store.active.layer === i._hash ? 1 : 0.2, transition: '1s all' }} />
              <div style={{ margin: '0 8px', fontSize: 12 }}>{i._hash}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <VisibilityIcon color='primary' fontSize='small' style={{ marginRight: 8, opacity: i.visibility ? 1 : 0.2, transition: '1s all' }} onClick={(e) => { e.stopPropagation(); ImitationPageCanvas.state.function.onCanvasLayerActionVisibility(canvasLayerFind._hash, i._hash, !i.visibility) }} />
              <DeleteIcon color='primary' fontSize='small' style={{ marginRight: 8 }} onClick={(e) => { e.stopPropagation(); ImitationPageCanvas.state.function.onCanvasLayerActionRemove(canvasLayerFind._hash, i._hash) }} />
              <EditIcon color='primary' fontSize='small' onClick={(e) => { e.stopPropagation(); ImitationNavigation.state.function.accordionWindowsAppendThrottlePipeTime500('CanvasLayerAction', { canvasLayerHash: canvasLayerFind._hash, canvasLayerActionHash: i._hash }) }} />
            </div>
          </Button>
        </Grid >
      })
    }

  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)