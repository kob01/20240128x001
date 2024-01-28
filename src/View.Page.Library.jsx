import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'

import FilterAltIcon from '@mui/icons-material/FilterAlt'

import Animation from './View.Component.Animation'
import useDragControl from './View.Component.useDragControl'

import { DialogSX } from './utils.mui.sx'

import Imitation from './utils.imitation'

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
          return <Animation tag={Button} animation={[{ opacity: 0 }, { opacity: 0.25 + index / praevious.length * 0.75 }]} key={'P' + index} variant='text' style={{ ...style }} onClick={() => { Imitation.state['page.library'].current = { index: i, action: 0, direction: 0 }; Imitation.dispatch() }}>{String(i).padStart(2, '0')}</Animation>
        })
      }

      <Animation tag={Button} animation={[{ opacity: 0 }, { opacity: 1 }]} key={'C'} variant='text' style={{ ...style }} color='primary'>{String(Imitation.state['page.library'].current.index).padStart(2, '0')}</Animation>

      {
        next.map((i, index) => {
          return <Animation tag={Button} animation={[{ opacity: 0 }, { opacity: 1 - index / next.length * 0.75 }]} key={'N' + index} variant='text' style={{ ...style }} onClick={() => { Imitation.state['page.library'].current = { index: i, action: 0, direction: 1 }; Imitation.dispatch() }}>{String(i).padStart(2, '0')}</Animation>
        })
      }
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} variant='text' style={{ ...style }} onClick={() => { Imitation.state['page.library'].filter.dialog = true; Imitation.dispatch() }} children={<FilterAltIcon />} />
    </div>

  </div>
}

function Card(props) {
  const ref = React.useRef()

  const [styleBackground, setStyleBackground] = React.useState()

  const [styleAnimation, setStyleAnimation] = React.useState()

  const [styleDragControl, setStyleDragControl] = React.useState()

  const onChangeDragControl = (params) => {
    const status = params.status

    const changedX = params.changedX ? params.changedX : 0

    const currentX = styleDragControl ? Number(styleDragControl.transform.match(/[-\d\.]+/)[0]) : 0

    var process = currentX + changedX / props.size.width * 2 * 30

    process = Math.min(process, 30)
    process = Math.max(process, 30 * -1)

    if (status === 'afterMove') {
      setStyleDragControl({ transform: `translateX(${process}%)`, transition: 'none' })
    }

    if (status === 'beforeEnd') {
      if (Math.abs(process) > 15 && process > 0) {
        Imitation.state['page.library'].current.index = Imitation.state['page.library'].current.index - 1
        Imitation.state['page.library'].current.direction = 0
      }

      if (Math.abs(process) > 15 && process < 0) {
        Imitation.state['page.library'].current.index = Imitation.state['page.library'].current.index + 1
        Imitation.state['page.library'].current.direction = 1
      }

      if (Math.abs(process) > 15) {
        if (Imitation.state['page.library'].current.index < 0) Imitation.state['page.library'].current.index = Imitation.state['page.library'].source.length - 1
        if (Imitation.state['page.library'].current.index > Imitation.state['page.library'].source.length - 1) Imitation.state['page.library'].current.index = 0

        Imitation.state['page.library'].current.action = 0

        Imitation.dispatch()
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
      if (props.animation.direction !== 0 && props.animation.direction !== 1) r = [{ opacity: 0 }, { opacity: 1 }]

      setStyleAnimation(r[0])

      Imitation.state.loading = Imitation.state.loading + 1
      Imitation.dispatch()

      setTimeout(() => {
        setStyleAnimation(r[1])

        Imitation.state.loading = Imitation.state.loading - 1
        Imitation.dispatch()
      }, 250)
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
      const cardRadio = props.size.width / props.size.height

      if (imageRadio >= cardRadio) r.height = '100%'
      if (imageRadio <= cardRadio) r.width = '100%'

      setStyleBackground(r)
    }

    const image = new Image()

    image.src = props.source.src

    image.onload = () => onload(image)
  }, [props.source, props.size])

  return <div style={{ ...props.size, position: 'absolute', overflow: 'hidden', borderRadius: 12, opacity: 0, transformOrigin: 'center bottom', transition: '0.5s all', ...styleAnimation, ...styleDragControl }} onMouseDown={onMouseDown} onTouchStart={onTouchStart} ref={el => ref.current = el}>

    <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {
        styleBackground ? <img style={{ ...styleBackground }} src={props.source.src}></img> : null
      }
    </div>

    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>

      <div></div>

    </div>

  </div>
}

function Cards() {
  const ref = React.useRef()

  const [size, setSize] = React.useState()

  const [cardArray, setCardArray] = React.useState([])

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(en => {
      const width = en[0].contentRect.width
      const height = en[0].contentRect.height

      if (width * 1.5 > height) setSize({ width: height / 3 * 2, height: height })
      if (width * 1.5 < height) setSize({ width: width, height: width * 1.5 })
      if (width === height / 1.5) setSize({ width: width, height: height })
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [])

  React.useEffect(() => {
    const a = {
      source: cardArray[1] ? cardArray[1].source : undefined,
      action: 1,
      direction: Imitation.state['page.library'].current.direction
    }

    const b = {
      source: Imitation.state['page.library'].source[Imitation.state['page.library'].current.index],
      action: Imitation.state['page.library'].current.action,
      direction: Imitation.state['page.library'].current.direction
    }

    setCardArray([a, b])
  }, [JSON.stringify(Imitation.state['page.library'].current.index)])

  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ref={el => ref.current = el}>
    {
      size && cardArray[0] && cardArray[0].source ? <Card key={cardArray[0].source.key} source={cardArray[0].source} animation={{ action: cardArray[0].action, direction: cardArray[0].direction }} size={size} /> : null
    }
    {
      size && cardArray[1] && cardArray[1].source ? <Card key={cardArray[1].source.key} source={cardArray[1].source} animation={{ action: cardArray[1].action, direction: cardArray[1].direction }} size={size} /> : null
    }
  </div>
}

function App() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

    <div style={{ width: '100%', height: 16 }}></div>

    <div style={{ width: '100%', height: 0, flexGrow: 1 }}>
      <Cards />
    </div>

    <div style={{ width: '100%', height: 16 }}></div>

    <div style={{ width: '100%', height: 'fit-content' }}>
      <Tools />
    </div>

    <FilterDialog />

  </div>
}

export default Imitation.withBindRender(App, state => [JSON.stringify(state['page.library'])])