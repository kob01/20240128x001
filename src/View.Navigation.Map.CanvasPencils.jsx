import React from 'react'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'

import ColorLensIcon from '@mui/icons-material/ColorLens'
import EditIcon from '@mui/icons-material/Edit'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App() {
  if (ImitationPageCanvas.state.store.pencil === undefined) return null

  return <Grid container spacing={0}>
    {
      ImitationPageCanvas.state.store.pencil.map(i => {
        return <Grid key={i._hash} item xs={12} style={{ height: 30 }}>
          <Button fullWidth component='div' style={{ justifyContent: 'space-between', alignItems: 'center', padding: '4.5px 8px' }} onClick={(e) => { ImitationPageCanvas.state.store.active.pencil = i._hash; ImitationPageCanvas.state.function.update() }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ColorLensIcon color='primary' fontSize='small' style={{ opacity: ImitationPageCanvas.state.store.active.pencil === i._hash ? 1 : 0.2, transition: '1s all' }} />
              <div style={{ margin: '0 8px', fontSize: 12 }}>{i.name}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <EditIcon color='primary' fontSize='small' onClick={(e) => { e.stopPropagation(); ImitationNavigation.state.function.accordionWindowsAppendThrottlePipeTime500('CanvasPencil', { pencilHash: i._hash }) }}></EditIcon>
            </div>
          </Button>
        </Grid>
      })
    }
  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)