import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Drawer from '@mui/material/Drawer'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Switch from '@mui/material/Switch'

import EditIcon from '@mui/icons-material/Edit'

import { ImitationGlobal, ImitationPageLibrary, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX } from './utils.mui.sx'

function Content() {
  return <div style={{ width: 360, height: '100%', padding: 16, overflowY: 'auto' }}>
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationPageLibrary.state.store.navigation.content.expand.inforamtion} onChange={(e, v) => { ImitationPageLibrary.state.store.navigation.content.expand.inforamtion = v; ImitationPageLibrary.state.function.update() }}>
          <AccordionSummary>Information</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Size</div>
                <div>1480 * 720</div>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} expanded={ImitationPageLibrary.state.store.navigation.content.expand.action} onChange={(e, v) => { ImitationPageLibrary.state.store.navigation.content.expand.action = v; ImitationPageLibrary.state.function.update() }}>
          <AccordionSummary>Action</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button fullWidth variant='contained' onClick={undefined} children={<EditIcon />} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

    </Grid>
  </div>
}

function App() {
  const onChange = () => {
    ImitationPageLibrary.state.store.navigation.content.open = false
    ImitationPageLibrary.state.function.update()
  }

  if (ImitationGlobal.state.store.navigation.mode === 0) {
    return <Paper {...PaperSX()} style={{ width: ImitationPageLibrary.state.store.navigation.content.open ? 360 : 0, marginLeft: ImitationPageLibrary.state.store.navigation.content.open ? 16 : 0, height: '100%', transitionProperty: 'width, marginLeft, marginRight', transitionDuration: '1s', overflow: 'hidden' }}>
      <Content />
    </Paper>
  }

  if (ImitationGlobal.state.store.navigation.mode === 1) {
    return <Drawer {...DrawerSX()} anchor='right' open={ImitationPageLibrary.state.store.navigation.content.open} onClose={() => onChange()}>
      <Content />
    </Drawer>
  }
}

const dependence = [{ instance: ImitationGlobal, dependence: state => [state.store.navigation.mode] }]

export default withBindComponentPure(App, dependence)