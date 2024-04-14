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

function View() {
  return <Grid container spacing={2}>

    <Grid item xs={12}>
      <NavigationAccordion text={'View'} type={['library', 'view']}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>Panorama</div>
            <div>
              <Switch {...SwitchSX()} checked={ImitationPageLibrary.state.store.view.panorama} onChange={(e) => { ImitationPageLibrary.state.store.view.panorama = e.target.checked; ImitationPageLibrary.state.function.update(); }} />
            </div>
          </Grid>
        </Grid>
      </NavigationAccordion>
    </Grid>

  </Grid>
}

function Information() {
  return <Grid container spacing={2}>

    <Grid item xs={12}>
      <NavigationAccordion text={'Information'} type={['library', 'information']}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>Size</div>
            <div>1480 * 720</div>
          </Grid>
        </Grid>
      </NavigationAccordion>
    </Grid>

    <Grid item xs={12}>
      <NavigationAccordion text={'Action'} type={['library', 'action']}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button fullWidth style={{ position: 'relative', justifyContent: 'flex-start' }} onClick={() => { }}><EditIcon style={{ marginRight: 8 }} />Edit</Button>
          </Grid>
        </Grid>
      </NavigationAccordion>
    </Grid>

  </Grid>
}

function Pagination() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', flexShrink: 0, margin: 2 }

  const sourceArray = ImitationPageLibrary.state.store.source
  const sourceLength = ImitationPageLibrary.state.store.source.length

  const sourceFindFirst = ImitationPageLibrary.state.memo.sourceFind(ImitationPageLibrary.state.store.renderImage[0].sourceHash)
  const sourceFindIndexFirst = ImitationPageLibrary.state.memo.sourceFindIndex(ImitationPageLibrary.state.store.renderImage[0].sourceHash)

  const sourceArrayMap = sourceArray.map((i, index) => ({ ...i, index: index }))
  const sourceArraySort = [...sourceArrayMap.slice(sourceFindIndexFirst + 1, sourceLength), ...sourceArrayMap.slice(0, sourceFindIndexFirst)]

  const max = 4
  const previous = sourceArraySort.slice(-max)
  const next = sourceArraySort.slice(0, max)

  return <Grid container spacing={2}>

    <Grid item xs={12}>
      <NavigationAccordion text={'Pagination'} type={['library', 'pagination']}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              {
                previous.map((i, index) => {
                  return <Button key={index} variant='text' style={{ ...styleButton }} onClick={() => ImitationPageLibrary.state.function.onSwitch({ sourceHash: i._hash, direction: 0 })}>{String(Number(i.index) + 1).padStart(2, '0')}</Button>
                })
              }

              <Button variant='contained' style={{ ...styleButton }} color='primary' onClick={() => ImitationPageLibrary.state.function.onSwitch({ sourceHash: sourceFindFirst._hash, direction: 2 })}>{String(Number(sourceFindIndexFirst) + 1).padStart(2, '0')}</Button>

              {
                next.map((i, index) => {
                  return <Button key={index} variant='text' style={{ ...styleButton }} onClick={() => ImitationPageLibrary.state.function.onSwitch({ sourceHash: i._hash, direction: 1 })}>{String(Number(i.index) + 1).padStart(2, '0')}</Button>
                })
              }
            </div>
          </Grid>
        </Grid>
      </NavigationAccordion>
    </Grid>

  </Grid>
}

function App() {
  return <>
    {
      ImitationNavigation.state.store.type === 'Library.View' ? <View /> : null
    }
    {
      ImitationNavigation.state.store.type === 'Library.Information' ? <Information /> : null
    }
    {
      ImitationNavigation.state.store.type === 'Library.Pagination' ? <Pagination /> : null
    }
  </>
}

const dependence = [
  { instance: ImitationPageLibrary, dependence: state => [state.update.now] }
]

export default withBindComponentPure(App, dependence)