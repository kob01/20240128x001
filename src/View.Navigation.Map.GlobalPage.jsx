import React from 'react'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import MapIcon from '@mui/icons-material/Map'
import SendIcon from '@mui/icons-material/Send'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

function App() {
  return <Grid container spacing={0}>
    <Grid item xs={12}>
      <Button fullWidth component='div' style={{ justifyContent: 'space-between', alignItems: 'center', padding: '4.5px 8px' }} onClick={(e) => { ImitationGlobal.state.store.page = 'Library'; ImitationGlobal.state.function.update() }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MapIcon color='primary' fontSize='small' style={{ opacity: ImitationGlobal.state.store.page === 'Library' ? 1 : 0.2, transition: '1s all' }} />
          <div style={{ margin: '0 8px', fontSize: 12 }}>Library</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SendIcon color='primary' fontSize='small' />
        </div>
      </Button>
    </Grid>
    <Grid item xs={12}>
      <Button fullWidth component='div' style={{ justifyContent: 'space-between', alignItems: 'center', padding: '4.5px 8px' }} onClick={(e) => { ImitationGlobal.state.store.page = 'Canvas'; ImitationGlobal.state.function.update() }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MapIcon color='primary' fontSize='small' style={{ opacity: ImitationGlobal.state.store.page === 'Canvas' ? 1 : 0.2, transition: '1s all' }} />
          <div style={{ margin: '0 8px', fontSize: 12 }}>Canvas</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SendIcon color='primary' fontSize='small' />
        </div>
      </Button>
    </Grid>
  </Grid>
}

const dependence = [
  { instance: ImitationGlobal, dependence: state => [ImitationGlobal.state.store.page] }
]

export default withBindComponentPure(App, dependence)