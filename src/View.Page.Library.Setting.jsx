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
  return <div style={{ width: 360, height: '100%', padding: 16 }}>
    <Grid container spacing={1}>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} defaultExpanded={true}>
          <AccordionSummary>View</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Panorama</div>
                <div>
                  <Switch {...SwitchSX()} checked={ImitationPageLibrary.state.store.view.panorama} onChange={(e) => { ImitationPageLibrary.state.store.view.panorama = e.target.checked; ImitationPageLibrary.state.function.update(); }} />
                </div>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Accordion {...AccordionSX()} defaultExpanded={true}>
          <AccordionSummary>Action</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
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
    ImitationPageLibrary.state.store.setting.open = false
    ImitationPageLibrary.state.function.update()
  }

  if (ImitationGlobal.state.store.navigation.mode === 0) {
    return <Paper {...PaperSX()} style={{ width: ImitationPageLibrary.state.store.setting.open ? 360 : 0, marginRight: ImitationPageLibrary.state.store.setting.open ? 16 : 0, height: '100%', transitionProperty: 'width, margin', transitionDuration: '1s', overflow: 'hidden' }}>
      <Content />
    </Paper>
  }

  if (ImitationGlobal.state.store.navigation.mode === 1) {
    return <Drawer {...DrawerSX()} anchor='left' open={ImitationPageLibrary.state.store.setting.open} onClose={() => onChange()}>
      <Content />
    </Drawer>
  }
}

export default withBindComponentPure(App, [{ instance: ImitationGlobal, dependence: state => [state.store.navigation.mode] }, { instance: ImitationPageLibrary, dependence: state => [state.store.update] }])