import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'

import ImageIcon from '@mui/icons-material/Image'
import SettingsIcon from '@mui/icons-material/Settings'
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture'
import CloseIcon from '@mui/icons-material/Close'
import EditNoteIcon from '@mui/icons-material/EditNote'
import SaveIcon from '@mui/icons-material/Save'
import DoneIcon from '@mui/icons-material/Done'
import ColorizeIcon from '@mui/icons-material/Colorize'
import AllOutIcon from '@mui/icons-material/AllOut'
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'
import ControlCameraIcon from '@mui/icons-material/ControlCamera'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'
import { DragControl } from './View.Component.DragControl'

import Imitation from './utils.imitation'
import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX } from './utils.mui.sx'
import { hash, rgba } from './utils.common'
import { source } from './utils.source'
import { parse } from './utils.svg'

import a from './a.json'

const c = [
  { _hash: hash(), width: 1000, height: 1000, translateX: 0, translateY: 0, pixel: a },
  { _hash: hash(), width: 500, height: 500, translateX: 0, translateY: 0, pixel: a },
]

Imitation.state['page.canvas'] = new Object()

Imitation.state['page.canvas'].size = undefined

Imitation.state['page.canvas'].source = { _hash: 1, canvas: c }

Imitation.state['page.canvas'].canvas = c

Imitation.state['page.canvas'].control = { hash: c[0]._hash }

Imitation.state['page.canvas'].setting = new Object()

Imitation.state['page.canvas'].setting.dialog = false

Imitation.state['page.canvas'].setting.tab = 0

Imitation.state['page.canvas'].paint = new Object()

Imitation.state['page.canvas'].paint.color = '#000000'

Imitation.state['page.canvas'].paint.alpha = 1

Imitation.state['page.canvas'].dpr = 2

Imitation.state['page.canvas'].translate = false

Imitation.state['page.canvas'].translateAll = false

Imitation.state['page.canvas'].fullview = false

Imitation.state['page.canvas'].perspective = false

Imitation.state['page.canvas'].opacity = false

Imitation.state['page.canvas.ref'] = new Object()

Imitation.state['page.canvas.ref'].canvas = Imitation.state['page.canvas'].canvas.map(i => ({ _hash: i._hash }))

Imitation.state['page.canvas.function'] = new Object()

Imitation.state['page.canvas.function'].onSave = () => {
  const canvasRef = Imitation.state['page.canvas.ref'].canvas.find(i => i._hash === Imitation.state['page.canvas'].control.hash)

  const imageData = canvasRef.context.getImageData(0, 0, canvasRef.canvas.width, canvasRef.canvas.height)

  const pixelData = imageData.data

  var pixelArray = []

  pixelData.forEach((i, index) => {
    const arrayIndex = Math.floor(index / 4)

    if (pixelArray[arrayIndex] === undefined) {
      const x = arrayIndex % canvasRef.canvas.width
      const y = Math.floor(arrayIndex / canvasRef.canvas.width)
      pixelArray[arrayIndex] = { x, y, color: [] }
    }

    if (pixelArray[arrayIndex] !== undefined) pixelArray[arrayIndex].color.push(i)

    if (pixelArray[arrayIndex].color[3]) pixelArray[arrayIndex].color[3] = pixelArray[arrayIndex].color[3] / 255
  })

  pixelArray = pixelArray.filter(i => i.color[0] !== 0 || i.color[1] !== 0 || i.color[2] !== 0 || i.color[3] !== 0)

  navigator.clipboard.writeText(JSON.stringify(pixelArray))
}

Imitation.state['page.canvas.function'].onSwitch = (content) => {
  if (Imitation.state['page.canvas'].control.hash === content.hash) return

  Imitation.state['page.canvas'].control.hash = content.hash

  Imitation.dispatch()
}

Imitation.state['page.canvas.memo'] = new Object()

Imitation.state['page.canvas.memo'].size = (dep = []) => React.useMemo(() => {
  var size = undefined

  const sizeInFullview = { width: Imitation.state['page.canvas'].size.width, height: Imitation.state['page.canvas'].size.height }
  const sizeInOverview = { width: Imitation.state['page.canvas'].size.overviewWidth, height: Imitation.state['page.canvas'].size.overviewHeight }

  if (Imitation.state['page.canvas'].fullview === true) size = sizeInFullview
  if (Imitation.state['page.canvas'].fullview === false) size = sizeInOverview

  return size
}, [...dep, Imitation.state['page.canvas'].size, Imitation.state['page.canvas'].fullview])

Imitation.state['page.canvas.memo'].canvasFind = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.canvas'].canvas.find(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.canvas'].canvas])

Imitation.state['page.canvas.memo'].canvasFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.canvas'].canvas.findIndex(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.canvas'].canvas])

Imitation.state['page.canvas.memo'].canvasRefFind = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.canvas.ref'].canvas.find(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.canvas.ref'].canvas])

Imitation.state['page.canvas.memo'].canvasRefFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.canvas.ref'].canvas.findIndex(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.canvas.ref'].canvas])

function SettingDialog() {
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
            <Tab label='Canvas' value={0} />
            <Tab label='Paint' value={1} />
            <Tab label='Current Layer' value={2} />
          </Tabs>
        </Grid>

        <Grid item xs={12}>
          <Divider {...DividerSX()} />
        </Grid>

        {
          Imitation.state['page.canvas'].setting.tab === 0 ?
            <>
              <Grid item xs={12}>
                Dpr {Imitation.state['page.canvas'].dpr}
              </Grid>

              <Grid item xs={12}>
                <div style={{ position: 'relative' }}>
                  <Slider value={Imitation.state['page.canvas'].dpr} onChange={(e, v) => { Imitation.state['page.canvas'].dpr = v; Imitation.dispatch(); }} min={0} max={8} step={0.1} />
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
                  <Switch {...SwitchSX()} checked={Imitation.state['page.canvas'].translate} onChange={(e) => { Imitation.state['page.canvas'].translateAll = false; Imitation.state['page.canvas'].translate = e.target.checked; Imitation.dispatch(); }} />
                </div>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Translate All</div>
                <div>
                  <Switch {...SwitchSX()} checked={Imitation.state['page.canvas'].translateAll} onChange={(e) => { Imitation.state['page.canvas'].translate = false; Imitation.state['page.canvas'].translateAll = e.target.checked; Imitation.dispatch(); }} />
                </div>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Perspective</div>
                <div>
                  <Switch {...SwitchSX()} checked={Imitation.state['page.canvas'].perspective} onChange={(e) => { Imitation.state['page.canvas'].perspective = e.target.checked; Imitation.dispatch(); }} />
                </div>
              </Grid>
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
                  <TextField {...TextFieldSX()} value={Imitation.state['page.canvas'].paint.color} onChange={e => { Imitation.state['page.canvas'].paint.color = e.target.value; Imitation.dispatch(); }} fullWidth autoComplete='off' />
                  <TextField {...TextFieldSX()} value={Imitation.state['page.canvas'].paint.color} onChange={e => { Imitation.state['page.canvas'].paint.color = e.target.value; Imitation.dispatch(); }} fullWidth autoComplete='off' type='color' style={{ width: 64, position: 'absolute', top: 0, bottom: 0, right: 0, margin: 'auto' }} />
                </div>
              </Grid>

              <Grid item xs={12}>
                Alpha {Imitation.state['page.canvas'].paint.alpha}
              </Grid>

              <Grid item xs={12}>
                <div style={{ position: 'relative' }}>
                  <Slider value={Imitation.state['page.canvas'].paint.alpha} onChange={(e, v) => { Imitation.state['page.canvas'].paint.alpha = v; Imitation.dispatch(); }} min={0} max={1} step={0.1} />
                </div>
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

function ToolsAction() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '1s all', flexShrink: 0, margin: 2 }

  const styleButtonActive = (boolean) => ({ transform: boolean ? 'rotate(45deg)' : undefined })

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AnimationRAF animation={opacityAnimation}>
        {
          ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => { Imitation.state['page.canvas'].setting.dialog = true; Imitation.dispatch(); }} children={<SettingsIcon />} />
        }
      </AnimationRAF>

      <AnimationRAF animation={opacityAnimation}>
        {
          ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => { Imitation.state['page.canvas'].fullview = !Imitation.state['page.canvas'].fullview; Imitation.dispatch(); }} children={<AllOutIcon style={{ ...styleButtonActive(Imitation.state['page.canvas'].fullview), transitionDuration: '1s', transitionProperty: 'transform' }} />} />
        }
      </AnimationRAF>
    </div>

  </div>
}

function ToolsPagination() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '1s all', flexShrink: 0, margin: 2 }

  const canvasArray = Imitation.state['page.canvas'].canvas
  const canvasLength = Imitation.state['page.canvas'].canvas.length

  const canvasFind = Imitation.state['page.canvas.memo'].canvasFind(Imitation.state['page.canvas'].control.hash)
  const canvasFindIndex = Imitation.state['page.canvas.memo'].canvasFindIndex(Imitation.state['page.canvas'].control.hash)

  const canvasArrayMap = canvasArray.map((i, index) => ({ ...i, index: index }))
  const canvasArraySort = [...canvasArrayMap.slice(canvasFindIndex + 1, canvasLength), ...canvasArrayMap.slice(0, canvasFindIndex)]

  const max = 4
  const previous = canvasArraySort.slice(-max)
  const next = canvasArraySort.slice(0, max)

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {
      previous.map((i, index) => {
        return <AnimationRAF animation={opacityAnimation} key={'previous' + index}>
          {
            ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => Imitation.state['page.canvas.function'].onSwitch({ hash: i._hash, direction: 0 })}>{String(Number(i.index) + 1).padStart(2, '0')}</Button>
          }
        </AnimationRAF>
      })
    }

    <AnimationRAF animation={opacityAnimation}>
      {
        ({ style }) => <Button variant='contained' style={{ ...styleButton, ...style, transition: '1s all' }} color='primary' onClick={() => Imitation.state['page.canvas.function'].onSwitch({ hash: canvasFind._hash, direction: 2 })}>{String(Number(canvasFindIndex) + 1).padStart(2, '0')}</Button>
      }
    </AnimationRAF>

    {
      next.map((i, index) => {
        return <AnimationRAF animation={opacityAnimation} key={'next' + index}>
          {
            ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => Imitation.state['page.canvas.function'].onSwitch({ hash: i._hash, direction: 1 })}>{String(Number(i.index) + 1).padStart(2, '0')}</Button>
          }
        </AnimationRAF>
      })
    }
  </div>

}

function Tools() {
  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap' }}>
    <ToolsPagination />
    <ToolsAction />
  </div>
}

function ContentCanvasRender(props) {
  const canvasLength = Imitation.state['page.canvas'].canvas.length

  const inControl = Imitation.state['page.canvas'].control.hash === props._hash
  const inTranslate = Imitation.state['page.canvas'].translate
  const inTranslateAll = Imitation.state['page.canvas'].translateAll
  const inPerspective = Imitation.state['page.canvas'].perspective

  const canvasFind = Imitation.state['page.canvas.memo'].canvasFind(props._hash)
  const canvasFindIndex = Imitation.state['page.canvas.memo'].canvasFindIndex(props._hash)
  const canvasRefFind = Imitation.state['page.canvas.memo'].canvasRefFind(props._hash)

  const [styleBackground, setStyleBackground] = React.useState()

  const [styleTransform, setStyleTransform] = React.useState()

  const [styleTransitionProperty, setStyleTransitionProperty] = React.useState()

  const dragControlEnable = inControl && inTranslate === false && inTranslateAll === false && inPerspective === false

  const onChangeDragControl = (params) => {
    const status = params.status

    if (status === 'afterStart') {
      canvasRefFind.rect = canvasRefFind.canvas.getBoundingClientRect()

      const x = params.x
      const y = params.y
      const relativeX = (x - canvasRefFind.rect.left) * Imitation.state['page.canvas'].dpr
      const relativeY = (y - canvasRefFind.rect.top) * Imitation.state['page.canvas'].dpr

      canvasRefFind.context.globalAlpha = Imitation.state['page.canvas'].paint.alpha
      canvasRefFind.context.lineWidth = 1
      canvasRefFind.context.lineCap = 'round'
      canvasRefFind.context.strokeStyle = Imitation.state['page.canvas'].paint.color

      canvasRefFind.context.beginPath()
      canvasRefFind.context.moveTo(relativeX, relativeY)
    }

    if (status === 'afterMove') {
      const x = params.x
      const y = params.y
      const relativeX = (x - canvasRefFind.rect.left) * Imitation.state['page.canvas'].dpr
      const relativeY = (y - canvasRefFind.rect.top) * Imitation.state['page.canvas'].dpr

      canvasRefFind.context.lineTo(relativeX, relativeY)
      canvasRefFind.context.stroke()
    }
  }

  React.useEffect(() => {
    canvasRefFind.context = canvasRefFind.canvas.getContext('2d')
  }, [])

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(en => {
      if (canvasRefFind.canvas) canvasRefFind.rect = canvasRefFind.canvas.getBoundingClientRect()
    })

    resizeObserver.observe(canvasRefFind.canvas)
    resizeObserver.observe(document.body)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  React.useEffect(() => {
    canvasFind.pixel.forEach(i => {
      canvasRefFind.context.fillStyle = i.color
      canvasRefFind.context.fillRect(i.x, i.y, 1, 1)
    })
  }, [])

  React.useEffect(() => {
    var r
    if (inPerspective === true && inControl === true) r = { background: rgba(Imitation.state.theme.palette.background.main, 0.4) }
    if (inPerspective === true && inControl === false) r = { background: rgba(Imitation.state.theme.palette.background.main, 0.1 + canvasFindIndex / (canvasLength - 1) * 0.2) }
    if (inPerspective === false && inControl === true) r = { background: rgba(Imitation.state.theme.palette.background.main, 0.1) }
    setStyleBackground(r)
  }, [inPerspective, inControl, canvasFindIndex, canvasLength, Imitation.state.theme.palette.background.main])

  React.useEffect(() => {
    var r
    if (inPerspective === true) r = { transform: `rotateY(60deg) rotateZ(30deg) translate(${(canvasFindIndex - canvasLength / 2 + 0.5) * 120}px` }
    if (inPerspective === false) r = { transform: `translate(${canvasFind.translateX}px, ${canvasFind.translateY}px)` }
    setStyleTransform(r)
  }, [inPerspective, canvasFind.translateX, canvasFind.translateY, canvasFindIndex, canvasLength])

  React.useEffect(() => {
    var r
    if (inPerspective === false && inTranslate === true || inTranslateAll === true) r = { transitionProperty: 'width, height, background' }
    if (inPerspective === false && inTranslate === false && inTranslateAll === false) r = { transitionProperty: 'width, height, background, transform' }
    setStyleTransitionProperty(r)
  }, [inPerspective, inTranslate, inTranslateAll])

  return <DragControl enable={dragControlEnable} onChange={onChangeDragControl}>
    {
      ({ onMouseDown, onTouchStart }) => {
        return <canvas
          style={{
            position: 'absolute',
            width: canvasFind.width / Imitation.state['page.canvas'].dpr,
            height: canvasFind.height / Imitation.state['page.canvas'].dpr,
            transitionDuration: '1s',
            ...styleTransform,
            ...styleTransitionProperty,
            ...styleBackground
          }}
          width={canvasFind.width}
          height={canvasFind.height}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          ref={el => canvasRefFind.canvas = el}
        />
      }
    }
  </DragControl>
}

function ContentCanvasRenders() {
  const canvasFind = Imitation.state['page.canvas.memo'].canvasFind(Imitation.state['page.canvas'].control.hash)

  const other = Imitation.state['page.canvas'].canvas.filter(i => i !== canvasFind)

  const render = [...other, canvasFind]

  return <>
    {
      render.map(i => <ContentCanvasRender key={i._hash} {...i} />)
    }
  </>
}

function ContentCanvasWrapper() {
  const inTranslate = Imitation.state['page.canvas'].translate
  const inTranslateAll = Imitation.state['page.canvas'].translateAll
  const inPerspective = Imitation.state['page.canvas'].perspective

  const canvasFind = Imitation.state['page.canvas.memo'].canvasFind(Imitation.state['page.canvas'].control.hash)

  const size = Imitation.state['page.canvas.memo'].size()

  console.log(size)

  const dragControlEnable = inTranslate === true || inTranslateAll === true && inPerspective === false

  const onChangeDragControl = (params) => {
    const status = params.status

    if (status === 'afterMove' && inTranslate === true) {
      const changedX = params.changedX
      const changedY = params.changedY

      canvasFind.translateX = canvasFind.translateX + changedX
      canvasFind.translateY = canvasFind.translateY + changedY

      Imitation.dispatch()
    }

    if (status === 'afterMove' && inTranslateAll === true) {
      const changedX = params.changedX
      const changedY = params.changedY

      Imitation.state['page.canvas'].canvas.forEach(i => {
        i.translateX = i.translateX + changedX
        i.translateY = i.translateY + changedY
      })

      Imitation.dispatch()
    }
  }

  return <DragControl enable={dragControlEnable} onChange={onChangeDragControl}>
    {
      ({ onMouseDown, onTouchStart }) => {
        return <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            overflow: 'hidden',
            transition: '1s all',
            styleTransform: 'preserve-3d',
            background: Imitation.state.theme.palette.primary.main,
            ...size,
          }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <ContentCanvasRenders />
        </div>
      }
    }
  </DragControl>
}

function Content() {
  const ref = React.useRef()

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(en => {
      Imitation.state['page.canvas'].size = { width: en[0].contentRect.width, height: en[0].contentRect.height }

      const size = Imitation.state['page.canvas'].size

      if (size.width * 1.5 >= size.height) size.overviewHeight = size.height
      if (size.width * 1.5 <= size.height) size.overviewWidth = size.width

      if (size.overviewWidth === undefined) size.overviewWidth = size.overviewHeight / 3 * 2
      if (size.overviewHeight === undefined) size.overviewHeight = size.overviewWidth * 1.5

      Imitation.dispatch()
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [])

  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ref={el => ref.current = el}>
    {
      Imitation.state['page.canvas'].size !== undefined && Imitation.state['page.canvas'].size.width !== 0 && Imitation.state['page.canvas'].size.height !== 0 ? <ContentCanvasWrapper /> : null
    }
  </div>
}

function App() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

    <div style={{ width: '100%', height: 0, flexGrow: 1 }}>
      <Content />
    </div>

    <div style={{ width: '100%', height: 16 }}></div>

    <div style={{ width: '100%', height: 'fit-content' }}>
      <Tools />
    </div>

    <div style={{ width: '100%', height: 4 }}></div>

    <SettingDialog />

  </div>
}

export default Imitation.withBindRender(App, state => [JSON.stringify(state['page.canvas'])])