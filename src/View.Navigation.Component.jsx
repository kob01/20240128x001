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
import CloseIcon from '@mui/icons-material/Close'

import { HoverListener } from './View.Component.HoverListener'
import { ClickAwayListener } from './View.Component.ClickAwayListener'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

import { rgba } from './utils.common'

function NavigationItem(props) {
  const onClose = () => {
    ImitationNavigation.state.store.tooltip[props.type[0]][props.type[1]] = false
    ImitationNavigation.state.function.update()
  }

  const onChange = () => {
    Object.keys(ImitationNavigation.state.store.tooltip).forEach(i => Object.keys(ImitationNavigation.state.store.tooltip[i]).forEach(k => i !== props.type[0] || k !== props.type[1] ? ImitationNavigation.state.store.tooltip[i][k] = false : undefined))
    ImitationNavigation.state.store.tooltip[props.type[0]][props.type[1]] = !ImitationNavigation.state.store.tooltip[props.type[0]][props.type[1]]
    ImitationNavigation.state.function.update()
  }

  return <ClickAwayListener onClick={onClose}>
    {
      ({ open, setOpen, pushClickAwayRef }) => {
        return <Grid item>
          <Tooltip
            {...TooltipSX()}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            open={ImitationNavigation.state.store.tooltip[props.type[0]][props.type[1]]}
            onClose={onClose}
            title={
              <Paper {...PaperSX()} style={{ width: 480, maxWidth: ImitationGlobal.state.store.rect.width - 36, height: 'fit-content', maxHeight: ImitationGlobal.state.store.rect.height - 180, padding: 16, overflowY: 'auto', background: 'none' }} ref={el => pushClickAwayRef('paper', el)}>
                {props.children}
              </Paper>
            }
            children={
              <Button onClick={onChange} ref={el => pushClickAwayRef('button', el)}>
                {
                  ImitationNavigation.state.store.tooltip[props.type[0]][props.type[1]] === true ? <CloseIcon /> : null
                }
                {
                  ImitationNavigation.state.store.tooltip[props.type[0]][props.type[1]] === false ? props.text : null
                }
              </Button>
            }
          />
        </Grid>
      }
    }
  </ClickAwayListener>
}

function NavigationAccordion(props) {
  return <HoverListener>
    {
      ({ hover, onMouseEnter, onMouseLeave }) => {
        return <Accordion {...AccordionSX()} style={{ background: hover ? rgba(ImitationGlobal.state.store.theme.palette.background.main, 1) : rgba(ImitationGlobal.state.store.theme.palette.background.main, 0.2), transition: '1s all' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} expanded={ImitationNavigation.state.store.expand[props.type[0]][props.type[1]]} onChange={(e, v) => { ImitationNavigation.state.store.expand[props.type[0]][props.type[1]] = v; ImitationNavigation.state.function.update() }}>
          <AccordionSummary>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ height: 24, marginRight: 8 }}><ChangeHistoryIcon /></div>
              <div>{props.text}</div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {props.children}
          </AccordionDetails>
        </Accordion>
      }
    }
  </HoverListener>
}

export { NavigationItem, NavigationAccordion }