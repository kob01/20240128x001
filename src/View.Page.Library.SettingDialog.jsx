import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'

import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'

import Imitation from './utils.imitation'

import { DialogSX, TabsSX, DividerSX } from './utils.mui.sx'

function App() {
  const onClose = () => {
    Imitation.state['page.library'].setting.dialog = false
    Imitation.dispatch()
  }

  return <Dialog open={Imitation.state['page.library'].setting.dialog} sx={{ ...DialogSX().sx, '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => onClose()}>
    <DialogTitle>setting</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>

        <Grid item xs={12}>
          <Tabs {...TabsSX()} value={Imitation.state['page.library'].setting.tab} onChange={(e, v) => { Imitation.state['page.library'].setting.tab = v; Imitation.dispatch(); }}>
            <Tab label='Canvas' value={0} />
            <Tab label='Paint' value={1} />
          </Tabs>
        </Grid>

        <Grid item xs={12}>
          <Divider {...DividerSX()} />
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={undefined} children={<EditIcon />} />
      <Button variant='contained' onClick={onClose} children={<DoneIcon />} />
    </DialogActions>
  </Dialog>
}

export default App