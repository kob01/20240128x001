import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

import EditIcon from '@mui/icons-material/Edit'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

import Animation from './View.Component.Animation'
import useDragControl from './View.Component.useDragControl'

import Imitation from './utils.imitation'
import { DialogSX } from './utils.mui.sx'
import { hash } from './utils.common'
import { source } from './utils.source'

Imitation.state['page.library'] = new Object()

Imitation.state['page.library'].size = undefined

Imitation.state['page.library'].source = source

Imitation.state['page.library'].current = { key: hash(), index: 0, source: source[0], animation: { action: 0, direction: 2 }, visible: true }

Imitation.state['page.library'].previous = { key: hash(), index: 0, source: source[0], animation: { action: 0, direction: 2 }, visible: false }

Imitation.state['page.library'].filter = { dialog: false }

const onSwitch = (content) => {
  if (Imitation.state['page.library'].current.index === content.index) return

  Imitation.state['page.library'].previous.key = Imitation.state['page.library'].current.key
  Imitation.state['page.library'].previous.index = Imitation.state['page.library'].current.index
  Imitation.state['page.library'].previous.source = Imitation.state['page.library'].source[Imitation.state['page.library'].current.index]
  Imitation.state['page.library'].previous.animation = { action: 1, direction: content.direction }
  Imitation.state['page.library'].previous.visible = true

  Imitation.state['page.library'].current.key = hash()
  Imitation.state['page.library'].current.index = content.index
  Imitation.state['page.library'].current.source = Imitation.state['page.library'].source[content.index]
  Imitation.state['page.library'].current.animation = { action: 0, direction: content.direction }
  Imitation.state['page.library'].current.visible = true

  Imitation.dispatch()
}

Imitation.state['page.library'].onSwitch = onSwitch

function FilterDialog() {
  const close = () => {
    Imitation.state['page.library'].filter.dialog = false
    Imitation.dispatch()
  }

  return <Dialog open={Imitation.state['page.library'].filter.dialog} sx={{ ...DialogSX().sx, '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => close()}>
    <DialogTitle style={{ fontSize: 16 }}>Filter</DialogTitle>
    <DialogContent style={{ fontSize: 14 }}>
      <Grid container spacing={1}>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      {/* <Button variant='contained' onClick={() => { Imitation.assignState({ globalSetting: value.globalSetting, theme: value.theme, canvasAnimationUse: value.canvasAnimationUse }); close(); }}><SaveIcon style={{ marginRight: 4 }} />Save</Button> */}
    </DialogActions>
  </Dialog>
}

function Tools() {
  const sourceLength = Imitation.state['page.library'].source.length

  const sourceArray = new Array(sourceLength).fill().map((i, index) => index)

  const sourceArraySort = [...sourceArray.slice(Imitation.state['page.library'].current.index + 1, sourceLength), ...sourceArray.slice(0, Imitation.state['page.library'].current.index)]

  const max = 4

  const praevious = sourceArraySort.slice(-max)

  const next = sourceArraySort.slice(0, max)

  const style = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '0.5s all', flexShrink: 0 }

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', flexWrap: 'wrap' }}>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {
        praevious.map((i, index) => {
          return <Animation tag={Button} animation={[{ opacity: 0 }, { opacity: 0.25 + index / praevious.length * 0.75 }]} key={'P' + index} variant='text' style={{ ...style }} onClick={() => Imitation.state['page.library'].onSwitch({ index: i, direction: 0 })}>{String(i).padStart(2, '0')}</Animation>
        })
      }

      <Animation tag={Button} animation={[{ opacity: 0 }, { opacity: 1 }]} key={'C'} variant='text' style={{ ...style }} color='primary' onClick={() => Imitation.state['page.library'].onSwitch({ index: Imitation.state['page.library'].current.index, direction: 2 })}>{String(Imitation.state['page.library'].current.index).padStart(2, '0')}</Animation>

      {
        next.map((i, index) => {
          return <Animation tag={Button} animation={[{ opacity: 0 }, { opacity: 1 - index / next.length * 0.75 }]} key={'N' + index} variant='text' style={{ ...style }} onClick={() => Imitation.state['page.library'].onSwitch({ index: i, direction: 1 })}>{String(i).padStart(2, '0')}</Animation>
        })
      }
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} variant='text' style={{ ...style }} onClick={() => { Imitation.state['page.library'].filter.dialog = true; Imitation.dispatch() }} children={<EditIcon />} />
      <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} variant='text' style={{ ...style }} onClick={() => { Imitation.state['page.library'].filter.dialog = true; Imitation.dispatch() }} children={<FilterAltIcon />} />
    </div>

  </div>
}

function Content(props) {
  const [styleBackground, setStyleBackground] = React.useState()

  const [styleAnimation, setStyleAnimation] = React.useState()

  const [styleDragControl, setStyleDragControl] = React.useState()

  const onChangeDragControl = (params) => {
    const status = params.status

    const changedX = params.changedX ? params.changedX : 0

    const currentX = styleDragControl ? Number(styleDragControl.transform.match(/[-\d\.]+/)[0]) : 0

    var process = currentX + changedX / Imitation.state['page.library'].size.width * 2 * 30

    process = Math.min(process, 30)
    process = Math.max(process, 30 * -1)

    if (status === 'afterMove') {
      setStyleDragControl({ transform: `translateX(${process}%)`, transition: 'none' })
    }

    if (status === 'beforeEnd') {
      const content = { index: -1, direction: -1 }

      if (Math.abs(process) > 15 && process > 0) {
        content.index = Imitation.state['page.library'].current.index - 1
        content.direction = 0
      }

      if (Math.abs(process) > 15 && process < 0) {
        content.index = Imitation.state['page.library'].current.index + 1
        content.direction = 1
      }

      if (Math.abs(process) > 15) {
        if (content.index < 0) content.index = Imitation.state['page.library'].source.length - 1
        if (content.index > Imitation.state['page.library'].source.length - 1) content.index = 0

        Imitation.state['page.library'].onSwitch(content)
      }

      setStyleDragControl()
    }
  }

  const { onMouseDown, onTouchStart } = useDragControl({ enable: props.animation.action === 0, onChange: onChangeDragControl })

  React.useEffect(() => {
    var r = []

    if (props.animation.action === 0) {
      if (props.animation.direction === 0) r = [{ opacity: 0, transform: 'translateX(-45%)' }, { opacity: 1, transform: 'translateX(0%)' }]
      if (props.animation.direction === 1) r = [{ opacity: 0, transform: 'translateX(45%)' }, { opacity: 1, transform: 'translateX(0%)' }]
      if (props.animation.direction === 2) r = [{ opacity: 0 }, { opacity: 1 }]

      setStyleAnimation(r[0])

      setTimeout(() => setStyleAnimation(r[1]), 250)
    }

    if (props.animation.action === 1) {
      if (props.animation.direction === 0) r = [{ opacity: 1, transform: 'translateX(0%)' }, { opacity: 0, transform: 'translateX(45%)' }]
      if (props.animation.direction === 1) r = [{ opacity: 1, transform: 'translateX(0%)' }, { opacity: 0, transform: 'translateX(-45%)' }]

      setStyleAnimation(r[1])
    }
  }, [props.animation.action, props.animation.direction])

  React.useEffect(() => {
    const onload = (image) => {
      const r = {}

      const imageRadio = image.width / image.height
      const cardRadio = Imitation.state['page.library'].size.width / Imitation.state['page.library'].size.height

      if (imageRadio >= cardRadio) r.height = '100%'
      if (imageRadio <= cardRadio) r.width = '100%'

      setStyleBackground(r)
    }

    const image = new Image()

    image.src = props.source.src

    image.onload = () => onload(image)
  }, [props.source, Imitation.state['page.library'].size])

  return <div style={{ ...Imitation.state['page.library'].size, position: 'absolute', zIndex: 1, overflow: 'hidden', borderRadius: 12, opacity: 0, background: Imitation.state.theme.palette.primary.main, transformOrigin: 'center bottom', transition: '0.5s all', ...styleAnimation, ...styleDragControl }} onMouseDown={onMouseDown} onTouchStart={onTouchStart}>

    {
      styleBackground === undefined ?
        <div style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress style={{ color: Imitation.state.theme.palette.background.main }} />
        </div>
        : null
    }

    {
      styleBackground !== undefined ?
        <div style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img style={{ ...styleBackground }} src={props.source.src}></img>
        </div>
        : null
    }

    <div style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%' }}>

    </div>

  </div>
}

function Contents() {
  const ref = React.useRef()

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(en => {
      const width = en[0].contentRect.width
      const height = en[0].contentRect.height

      if (width * 1.5 > height) Imitation.state['page.library'].size = { width: height / 3 * 2, height: height }
      if (width * 1.5 < height) Imitation.state['page.library'].size = { width: width, height: width * 1.5 }
      if (width === height / 1.5) Imitation.state['page.library'].size = { width: width, height: height }

      Imitation.dispatch()
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [])

  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ref={el => ref.current = el}>
    {
      Imitation.state['page.library'].size !== undefined && Imitation.state['page.library'].previous.visible === true ? <Content {...Imitation.state['page.library'].previous} /> : null
    }
    {
      Imitation.state['page.library'].size !== undefined && Imitation.state['page.library'].current.visible === true ? <Content {...Imitation.state['page.library'].current} /> : null
    }
  </div>
}

function App() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

    <div style={{ width: '100%', height: 16 }}></div>

    <div style={{ width: '100%', height: 0, flexGrow: 1 }}>
      <Contents />
    </div>

    <div style={{ width: '100%', height: 16 }}></div>

    <div style={{ width: '100%', height: 'fit-content' }}>
      <Tools />
    </div>

    <FilterDialog />

  </div>
}

export default Imitation.withBindRender(App, state => [JSON.stringify(state['page.library'])])