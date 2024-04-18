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
  return <Grid container spacing={1}>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Create Layer</div>
      <IconButton onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerCreate() }}><AddIcon color='primary' /></IconButton>
    </Grid>

    <Grid item xs={12}>
      <Grid container spacing={0}>
        {
          ImitationPageCanvas.state.store.source.canvas.layer.map(i => {
            return <Grid key={i._hash} item xs={12}>
              <Button fullWidth style={{ justifyContent: 'space-between', alignItems: 'center' }} component='div' onClick={(e) => { ImitationPageCanvas.state.store.active.layer = i._hash; ImitationPageCanvas.state.function.update() }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton size='small' style={{ opacity: ImitationPageCanvas.state.store.active.layer === i._hash ? 1 : 0.2, transition: '1s all' }}>
                    <LayersIcon color='primary' fontSize='small' />
                  </IconButton>
                  <div style={{ margin: '0 4px' }}>{i._hash}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton size='small' style={{ opacity: i.visibility ? 1 : 0.2, transition: '1s all' }} onClick={(e) => { e.stopPropagation(); ImitationPageCanvas.state.function.onCanvasLayerVisibility(i._hash, !i.visibility) }}>
                    <VisibilityIcon color='primary' fontSize='small' />
                  </IconButton>
                  <IconButton size='small' onClick={(e) => { e.stopPropagation(); ImitationPageCanvas.state.function.onCanvasLayerRemove(i._hash) }}>
                    <DeleteIcon color='primary' fontSize='small' />
                  </IconButton>
                  <IconButton size='small' onClick={(e) => { e.stopPropagation(); ImitationNavigation.state.function.renderWindowsAppend('CanvasLayer', { canvasLayerHash: i._hash }) }}>
                    <EditIcon color='primary' fontSize='small' />
                  </IconButton>
                </div>
              </Button>
            </Grid>
          })
        }
      </Grid>
    </Grid>

  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)