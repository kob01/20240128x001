import React from 'react'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Tooltip from '@mui/material/Tooltip'

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'
import EditIcon from '@mui/icons-material/Edit'

import { NavigationItem, NavigationAccordion } from './View.Navigation.Component'

import { ImitationGlobal, ImitationNavigation, ImitationPageLibrary, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App() {
  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Panorama</div>
      <div>
        <Switch {...SwitchSX()} checked={ImitationPageLibrary.state.store.view.panorama} onChange={(e) => { ImitationPageLibrary.state.store.view.panorama = e.target.checked; ImitationPageLibrary.state.function.update(); }} />
      </div>
    </Grid>
  </Grid>
}

const dependence = [
  { instance: ImitationPageLibrary, dependence: state => [state.store.view.panorama] }
]

export default withBindComponentPure(App, dependence)