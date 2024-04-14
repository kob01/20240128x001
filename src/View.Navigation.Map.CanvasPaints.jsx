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

  return <Grid container spacing={2}>

    <Grid item xs={12}>
      <Grid container spacing={0}>
        {
          ImitationPageCanvas.state.store.paint.option.map(i => {
            return <Grid key={i._hash} item xs={12}>
              <Button fullWidth style={{ justifyContent: 'space-between', alignItems: 'center' }} component='div' onClick={(e) => { ImitationPageCanvas.state.store.paint.current = i._hash; ImitationPageCanvas.state.function.update() }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton size='small' style={{ opacity: ImitationPageCanvas.state.store.paint.current === i._hash ? 1 : 0.2, transition: '1s all' }}>
                    <ColorLensIcon color='primary' fontSize='small' />
                  </IconButton>
                  <div style={{ margin: '0 4px' }}>{i.name}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton size='small' onClick={(e) => { e.stopPropagation(); ImitationNavigation.state.function.renderWindowsAppend('CanvasPaint', { paintOptionHash: i._hash }) }}>
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