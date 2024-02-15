import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import SaveIcon from '@mui/icons-material/Save'
import DoneIcon from '@mui/icons-material/Done'

import Imitation from './utils.imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX } from './utils.mui.sx'

function App() {
  const canvasFind = Imitation.state['page.canvas.memo'].canvasFind(Imitation.state['page.canvas'].control.hash)

  const onClose = () => {
    Imitation.state['page.canvas'].setting.dialog = false
    Imitation.dispatch()
  }

  return <Dialog open={Imitation.state['page.canvas'].setting.dialog} sx={{ ...DialogSX().sx, '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={onClose}>
    <DialogTitle>Setting</DialogTitle>
    <DialogContent dividers>

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Tabs {...TabsSX()} value={Imitation.state['page.canvas'].setting.tab} onChange={(e, v) => { Imitation.state['page.canvas'].setting.tab = v; Imitation.dispatch(); }}>
            <Tab label='View' value={0} />
            <Tab label='Paint' value={1} />
            <Tab label='Canvas Layer' value={2} />
          </Tabs>
        </Grid>

        <Grid item xs={12}>
          <Divider {...DividerSX()} />
        </Grid>

        {
          Imitation.state['page.canvas'].setting.tab === 0 ?
            <>
              <Grid item xs={12}>
                Dpr {Imitation.state['page.canvas'].view.dpr}
              </Grid>
              <Grid item xs={12}>
                <div style={{ position: 'relative' }}>
                  <Slider value={Imitation.state['page.canvas'].view.dpr} onChange={(e, v) => { Imitation.state['page.canvas'].view.dpr = v; Imitation.dispatch(); }} min={0} max={8} step={0.1} />
                </div>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Fullview</div>
                <div>
                  <Switch {...SwitchSX()} checked={Imitation.state['page.canvas'].fullview} onChange={(e) => { Imitation.state['page.canvas'].fullview = e.target.checked; Imitation.dispatch(); }} />
                </div>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Translate</div>
                <div>
                  <Switch {...SwitchSX()} checked={Imitation.state['page.canvas'].view.translate} onChange={(e) => { Imitation.state['page.canvas'].view.translateAll = false; Imitation.state['page.canvas'].view.translate = e.target.checked; Imitation.dispatch(); }} disabled={Imitation.state['page.canvas'].view.perspective === true} />
                </div>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Translate All</div>
                <div>
                  <Switch {...SwitchSX()} checked={Imitation.state['page.canvas'].view.translateAll} onChange={(e) => { Imitation.state['page.canvas'].view.translate = false; Imitation.state['page.canvas'].view.translateAll = e.target.checked; Imitation.dispatch(); }} disabled={Imitation.state['page.canvas'].view.perspective === true} />
                </div>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Perspective</div>
                <div>
                  <Switch {...SwitchSX()} checked={Imitation.state['page.canvas'].view.perspective} onChange={(e) => { Imitation.state['page.canvas'].view.perspective = e.target.checked; Imitation.dispatch(); }} disabled={Imitation.state['page.canvas'].view.translate === true || Imitation.state['page.canvas'].view.translateAll === true} />
                </div>
              </Grid>

              {
                Imitation.state['page.canvas'].view.perspective === true ?
                  <>
                    <Grid item xs={12}>
                      Perspective Gap {Imitation.state['page.canvas'].view.perspectiveGap}
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ position: 'relative' }}>
                        <Slider value={Imitation.state['page.canvas'].view.perspectiveGap} onChange={(e, v) => { Imitation.state['page.canvas'].view.perspectiveGap = v; Imitation.dispatch(); }} min={0} max={200} step={1} />
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      Perspective Rotate X {Imitation.state['page.canvas'].view.perspectiveRotateX}
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ position: 'relative' }}>
                        <Slider value={Imitation.state['page.canvas'].view.perspectiveRotateX} onChange={(e, v) => { Imitation.state['page.canvas'].view.perspectiveRotateX = v; Imitation.dispatch(); }} min={-360} max={360} step={1} />
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      Perspective Rotate Y {Imitation.state['page.canvas'].view.perspectiveRotateY}
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ position: 'relative' }}>
                        <Slider value={Imitation.state['page.canvas'].view.perspectiveRotateY} onChange={(e, v) => { Imitation.state['page.canvas'].view.perspectiveRotateY = v; Imitation.dispatch(); }} min={-360} max={360} step={1} />
                      </div>
                    </Grid>
                  </>
                  : null
              }
            </>
            : null
        }

        {
          Imitation.state['page.canvas'].setting.tab === 1 ?
            <>
              <Grid item xs={12}>
                Color
              </Grid>
              <Grid item xs={12}>
                <div style={{ position: 'relative' }}>
                  <TextField {...TextFieldSX()} value={Imitation.state['page.canvas'].paint.setting.color} onChange={e => { Imitation.state['page.canvas'].paint.setting.color = e.target.value; Imitation.dispatch(); }} fullWidth autoComplete='off' />
                  <TextField {...TextFieldSX()} value={Imitation.state['page.canvas'].paint.setting.color} onChange={e => { Imitation.state['page.canvas'].paint.setting.color = e.target.value; Imitation.dispatch(); }} fullWidth autoComplete='off' type='color' style={{ width: 64, position: 'absolute', top: 0, bottom: 0, right: 0, margin: 'auto' }} />
                </div>
              </Grid>

              <Grid item xs={12}>
                Alpha {Imitation.state['page.canvas'].paint.setting.alpha}
              </Grid>
              <Grid item xs={12}>
                <div style={{ position: 'relative' }}>
                  <Slider value={Imitation.state['page.canvas'].paint.setting.alpha} onChange={(e, v) => { Imitation.state['page.canvas'].paint.setting.alpha = v; Imitation.dispatch(); }} min={0} max={1} step={0.1} />
                </div>
              </Grid>

              <Grid item xs={12}>
                Current
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={SelectSX().sx} fullWidth>
                  <Select {...SelectSX()} value={Imitation.state['page.canvas'].paint.current} onChange={e => { Imitation.state['page.canvas'].paint.current = v; Imitation.dispatch(); }}>
                    {
                      Imitation.state['page.canvas'].paint.options.map(i => {
                        return <MenuItem value={i._hash} key={i._hash}>{i.label}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
            </>
            : null
        }

        {
          Imitation.state['page.canvas'].setting.tab === 2 ?
            <>
              <Grid item xs={12}>
                Width
              </Grid>
              <Grid item xs={12}>
                <div style={{ position: 'relative' }}>
                  <TextField {...TextFieldSX()} value={canvasFind.width} onChange={e => { canvasFind.width = e.target.value; Imitation.dispatch(); }} fullWidth autoComplete='off' />
                </div>
              </Grid>

              <Grid item xs={12}>
                Height
              </Grid>
              <Grid item xs={12}>
                <div style={{ position: 'relative' }}>
                  <TextField {...TextFieldSX()} value={canvasFind.height} onChange={e => { canvasFind.height = e.target.value; Imitation.dispatch(); }} fullWidth autoComplete='off' />
                </div>
              </Grid>
            </>
            : null
        }

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => Imitation.state['page.canvas.function'].onSave()} children={<SaveIcon />} />
      <Button variant='contained' onClick={onClose} children={<DoneIcon />} />
    </DialogActions>
  </Dialog>
}

export default App