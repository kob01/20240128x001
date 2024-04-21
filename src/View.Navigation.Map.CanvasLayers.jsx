import React from 'react'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import LayersIcon from '@mui/icons-material/Layers'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App() {
  if (ImitationPageCanvas.state.store.source === undefined) return null

  return <Grid container spacing={0}>
    {
      ImitationPageCanvas.state.store.source.canvas.layer.map(i => {
        return <Grid key={i._hash} item xs={12} style={{ height: 30 }}>
          <Button fullWidth component='div' style={{ justifyContent: 'space-between', alignItems: 'center', padding: '4.5px 8px' }} onClick={(e) => { ImitationPageCanvas.state.store.active.layer = i._hash; ImitationPageCanvas.state.function.update() }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LayersIcon color='primary' fontSize='small' style={{ opacity: ImitationPageCanvas.state.store.active.layer === i._hash ? 1 : 0.2, transition: '1s all' }} />
              <div style={{ margin: '0 8px', fontSize: 12 }}>{i._hash}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <VisibilityIcon color='primary' fontSize='small' style={{ marginRight: 8, opacity: i.visibility ? 1 : 0.2, transition: '1s all' }} onClick={(e) => { e.stopPropagation(); ImitationPageCanvas.state.function.onCanvasLayerVisibility(i._hash, !i.visibility) }} />
              <DeleteIcon color='primary' fontSize='small' style={{ marginRight: 8 }} onClick={(e) => { e.stopPropagation(); ImitationPageCanvas.state.function.onCanvasLayerRemove(i._hash) }} />
              <EditIcon color='primary' fontSize='small' onClick={(e) => { e.stopPropagation(); ImitationNavigation.state.function.accordionWindowsAppendThrottlePipeTime500('CanvasLayer', { canvasLayerHash: i._hash }) }} />
            </div>
          </Button>
        </Grid >
      })
    }

    <Grid item xs={12}>
      <Button fullWidth component='div' onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerCreate() }}>
        <AddIcon color='primary' fontSize='small' />
      </Button>
    </Grid>
  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)