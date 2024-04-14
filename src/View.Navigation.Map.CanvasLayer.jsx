import React from 'react'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CopyAllIcon from '@mui/icons-material/CopyAll'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX } from './utils.mui.sx'

function App(props) {
  const renderWindowsFind = ImitationNavigation.state.memo.renderWindowsFind(props.renderWindowsHash)
  const canvasLayerFind = ImitationPageCanvas.state.memo.canvasLayerFind(renderWindowsFind.property.canvasLayerHash)
  const canvasLayerActionVisibilityTrackFindIndex = ImitationPageCanvas.state.memo.canvasLayerActionVisibilityTrackFindIndex(renderWindowsFind.property.canvasLayerHash, canvasLayerFind ? [canvasLayerFind.action.map(i => i.visibility).join('')] : [''])

  if (canvasLayerFind === undefined) renderWindowsFind.hide = true

  if (canvasLayerFind === undefined) return null

  return <Grid container spacing={2}>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Hash ID</div>
      <div>{canvasLayerFind._hash}</div>
    </Grid>

    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>Visibility</div>
          <div>
            <Switch {...SwitchSX()} checked={canvasLayerFind.visibility} onChange={(e) => { ImitationPageCanvas.state.function.onCanvasLayerVisibility(canvasLayerFind._hash, e.target.checked) }} />
          </div>
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>Copy Layer</div>
          <IconButton onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerCopy(canvasLayerFind._hash) }}><CopyAllIcon color='primary' /></IconButton>
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>Remove Layer</div>
          <IconButton onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerRemove(canvasLayerFind._hash) }}><DeleteIcon color='primary' /></IconButton>
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>Move Up Layer</div>
          <IconButton onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerMove(canvasLayerFind._hash, 0) }}><KeyboardArrowUpIcon color='primary' /></IconButton>
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>Move Down Layer</div>
          <IconButton onClick={() => { ImitationPageCanvas.state.function.onCanvasLayerMove(canvasLayerFind._hash, 1) }}><KeyboardArrowDownIcon color='primary' /></IconButton>
        </Grid>
      </Grid>
    </Grid>

    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Track {canvasLayerActionVisibilityTrackFindIndex}
        </Grid>
        <Grid item xs={12}>
          <Slider value={canvasLayerActionVisibilityTrackFindIndex} onChange={(e, v) => { ImitationPageCanvas.state.function.onCanvasLayerActionVisibilityTracks(canvasLayerFind._hash, v) }} min={0} max={canvasLayerFind.action.length} step={1} />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid container spacing={1}>
            {
              canvasLayerFind.action.map((i, index) => {
                return <Grid item key={i._hash}>
                  <Button variant={i.visibility ? 'contained' : 'outlined'} style={{ padding: 0, width: 36, height: 36, minWidth: 'auto' }} color='primary' onClick={() => ImitationPageCanvas.state.function.onCanvasLayerActionVisibilityTrack(canvasLayerFind._hash, index)}>{String(index + 1).padStart(2, '0')}</Button>
                </Grid>
              })
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  </Grid>
}

const dependence = [
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.update.now] }
]

export default withBindComponentPure(App, dependence)