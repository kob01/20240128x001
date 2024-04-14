import React from 'react'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import MapIcon from '@mui/icons-material/Map'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

function App() {
  return <Grid container spacing={0}>
    <Grid item xs={12}>
      <Button fullWidth style={{ justifyContent: 'flex-start', alignItems: 'center' }} component='div' onClick={(e) => { ImitationGlobal.state.store.page = 'Library'; ImitationGlobal.state.function.update() }}>
        <IconButton size='small' style={{ opacity: ImitationGlobal.state.store.page === 'Library' ? 1 : 0.2, transition: '1s all' }}>
          <MapIcon color='primary' fontSize='small' />
        </IconButton>
        <div style={{ margin: '0 4px' }}>Library</div>
      </Button>
    </Grid>
    <Grid item xs={12}>
      <Button fullWidth style={{ justifyContent: 'flex-start', alignItems: 'center' }} component='div' onClick={(e) => { ImitationGlobal.state.store.page = 'Canvas'; ImitationGlobal.state.function.update() }}>
        <IconButton size='small' style={{ opacity: ImitationGlobal.state.store.page === 'Canvas' ? 1 : 0.2, transition: '1s all' }}>
          <MapIcon color='primary' fontSize='small' />
        </IconButton>
        <div style={{ margin: '0 4px' }}>Canvas</div>
      </Button>
    </Grid>
  </Grid>
}

const dependence = [
  { instance: ImitationGlobal, dependence: state => [ImitationGlobal.state.store.page] }
]

export default withBindComponentPure(App, dependence)