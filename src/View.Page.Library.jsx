import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'

import EditIcon from '@mui/icons-material/Edit'
import AllOutIcon from '@mui/icons-material/AllOut'
import SettingsIcon from '@mui/icons-material/Settings'
import DoneIcon from '@mui/icons-material/Done'

import { AnimationRAF, opacityAnimation } from './View.Component.AnimationRAF'
import { DragControl } from './View.Component.DragControl'

import Imitation from './utils.imitation'
import { DialogSX, TabsSX, DividerSX } from './utils.mui.sx'
import { hash, throttle } from './utils.common'
import { source } from './utils.source'

Imitation.state['page.library'] = new Object()

Imitation.state['page.library'].size = undefined

Imitation.state['page.library'].source = source

Imitation.state['page.library'].render = [{ _hash: hash(), hash: source[0]._hash, direction: 2 }]

Imitation.state['page.library'].setting = new Object()

Imitation.state['page.library'].setting.dialog = false

Imitation.state['page.library'].setting.tab = 0

Imitation.state['page.library'].fullview = false

Imitation.state['page.library.function'] = new Object()

Imitation.state['page.library.function'].onSwitch = (content) => {
  if (Imitation.state['page.library'].render[Imitation.state['page.library'].render.length - 1].hash === content.hash) return

  const last = Imitation.state['page.library'].render[Imitation.state['page.library'].render.length - 1]

  last.direction = content.direction

  const r = { _hash: hash(), hash: content.hash, direction: content.direction }

  Imitation.state['page.library'].render.push(r)

  Imitation.state['page.library'].render = [...Imitation.state['page.library'].render]

  Imitation.dispatch()
}

Imitation.state['page.library.memo'] = new Object()

Imitation.state['page.library.memo'].size = (dep = []) => React.useMemo(() => {
  var size = undefined

  const sizeInFullview = { width: Imitation.state['page.library'].size.width, height: Imitation.state['page.library'].size.height }
  const sizeInOverview = { width: Imitation.state['page.library'].size.overviewWidth, height: Imitation.state['page.library'].size.overviewHeight }

  if (Imitation.state['page.library'].fullview === true) size = sizeInFullview
  if (Imitation.state['page.library'].fullview === false) size = sizeInOverview

  return size
}, [...dep, Imitation.state['page.library'].size, Imitation.state['page.library'].fullview])

Imitation.state['page.library.memo'].sourceFind = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.library'].source.find(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.library'].source])

Imitation.state['page.library.memo'].sourceFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.library'].source.findIndex(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.library'].source])

Imitation.state['page.library.memo'].renderFind = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.library'].render.find(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.library'].render])

Imitation.state['page.library.memo'].renderFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.library'].render.findIndex(i => i._hash === _hash)
}, [...dep, _hash, Imitation.state['page.library'].render])

Imitation.state['page.library.memo'].renderFindIndexInLast = (_hash, dep = []) => React.useMemo(() => {
  return Imitation.state['page.library'].render.findIndex(i => i._hash === _hash) === Imitation.state['page.library'].render.length - 1
}, [...dep, _hash, Imitation.state['page.library'].render])


function SettingDialog() {
  const onClose = () => {
    Imitation.state['page.library'].setting.dialog = false
    Imitation.dispatch()
  }

  return <Dialog open={Imitation.state['page.library'].setting.dialog} sx={{ ...DialogSX().sx, '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => onClose()}>
    <DialogTitle>setting</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>

        <Grid item xs={12}>
          <Tabs {...TabsSX()} value={Imitation.state['page.library'].setting.tab} onChange={(e, v) => { Imitation.state['page.library'].setting.tab = v; Imitation.dispatch(); }}>
            <Tab label='Canvas' value={0} />
            <Tab label='Paint' value={1} />
          </Tabs>
        </Grid>

        <Grid item xs={12}>
          <Divider {...DividerSX()} />
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={undefined} children={<EditIcon />} />
      <Button variant='contained' onClick={onClose} children={<DoneIcon />} />
    </DialogActions>
  </Dialog>
}

function ToolsAction() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '1s all', flexShrink: 0, margin: 2 }

  const styleButtonActive = (boolean) => ({ transform: boolean ? 'rotate(45deg)' : undefined })

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <AnimationRAF animation={opacityAnimation}>
      {
        ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => { Imitation.state['page.library'].setting.dialog = true; Imitation.dispatch(); }} children={<SettingsIcon />} />
      }
    </AnimationRAF>

    <AnimationRAF animation={opacityAnimation}>
      {
        ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => { Imitation.state['page.library'].fullview = !Imitation.state['page.library'].fullview; Imitation.dispatch(); }} children={<AllOutIcon style={{ ...styleButtonActive(Imitation.state['page.library'].fullview), transitionDuration: '1s', transitionProperty: 'transform' }} />} />
      }
    </AnimationRAF>
  </div>
}

function ToolsPagination() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '1s all', flexShrink: 0, margin: 2 }

  const sourceArray = Imitation.state['page.library'].source
  const sourceLength = Imitation.state['page.library'].source.length

  const sourceFindFirst = Imitation.state['page.library.memo'].sourceFind(Imitation.state['page.library'].render[0].hash)
  const sourceFindIndexFirst = Imitation.state['page.library.memo'].sourceFindIndex(Imitation.state['page.library'].render[0].hash)

  const sourceArrayMap = sourceArray.map((i, index) => ({ ...i, index: index }))
  const sourceArraySort = [...sourceArrayMap.slice(sourceFindIndexFirst + 1, sourceLength), ...sourceArrayMap.slice(0, sourceFindIndexFirst)]

  const max = 4
  const previous = sourceArraySort.slice(-max)
  const next = sourceArraySort.slice(0, max)

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {
      previous.map((i, index) => {
        return <AnimationRAF animation={opacityAnimation} key={'previous' + index}>
          {
            ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => Imitation.state['page.library.function'].onSwitch({ hash: i._hash, direction: 0 })}>{String(Number(i.index) + 1).padStart(2, '0')}</Button>
          }
        </AnimationRAF>
      })
    }

    <AnimationRAF animation={opacityAnimation}>
      {
        ({ style }) => <Button variant='contained' style={{ ...styleButton, ...style, transition: '1s all' }} color='primary' onClick={() => Imitation.state['page.library.function'].onSwitch({ hash: sourceFindFirst._hash, direction: 2 })}>{String(Number(sourceFindIndexFirst) + 1).padStart(2, '0')}</Button>
      }
    </AnimationRAF>

    {
      next.map((i, index) => {
        return <AnimationRAF animation={opacityAnimation} key={'next' + index}>
          {
            ({ style }) => <Button variant='text' style={{ ...styleButton, ...style, transition: '1s all' }} onClick={() => Imitation.state['page.library.function'].onSwitch({ hash: i._hash, direction: 1 })}>{String(Number(i.index) + 1).padStart(2, '0')}</Button>
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

function ContentRender(props) {
  const source = Imitation.state['page.library'].source
  const sourceLength = Imitation.state['page.library'].source.length
  const renderLength = Imitation.state['page.library'].render.length

  const sourceFind = Imitation.state['page.library.memo'].sourceFind(props.hash)
  const sourceFindIndex = Imitation.state['page.library.memo'].sourceFindIndex(props.hash)
  const renderFindIndex = Imitation.state['page.library.memo'].renderFindIndex(props._hash)
  const renderFindIndexInLast = Imitation.state['page.library.memo'].renderFindIndexInLast(props._hash)

  const size = Imitation.state['page.library.memo'].size()

  const translateX = Imitation.state['page.library'].size.overviewWidth * 0.45

  const caculateStyleAnimation = () => {
    var r = []

    if (renderFindIndexInLast === true) {
      if (props.direction === 0) r = [{ opacity: 0, transform: `translateX(-${translateX}px)`, transitionProperty: 'none' }, { opacity: 1, transform: 'translateX(0px)' }]
      if (props.direction === 1) r = [{ opacity: 0, transform: `translateX(${translateX}px)`, transitionProperty: 'none' }, { opacity: 1, transform: 'translateX(0px)' }]
      if (props.direction === 2) r = [{ opacity: 0 }, { opacity: 1 }]
    }

    if (renderFindIndexInLast === true && renderLength > 1) r[1].transitionDelay = '1s'

    if (renderFindIndexInLast === false) {
      if (props.direction === 0) r = [{ opacity: 1, transform: 'translateX(0px)' }, { opacity: 0, transform: `translateX(${translateX}px)` }]
      if (props.direction === 1) r = [{ opacity: 1, transform: 'translateX(0px)' }, { opacity: 0, transform: `translateX(-${translateX}px)` }]
    }

    return r
  }

  const imageRef = React.useRef()

  const [dragControlEnable, setDragControlEnable] = React.useState(false)

  const [styleBackground, setStyleBackground] = React.useState()

  const [styleDragControl, setStyleDragControl] = React.useState()

  const [styleAnimation, setStyleAnimation] = React.useState(caculateStyleAnimation()[0])

  const [styleWrapper, setStyleWrapper] = React.useState(size)

  const onChangeDragControl = (params) => {
    const status = params.status

    const changedX = params.changedX ? params.changedX : 0

    const currentX = styleDragControl ? Number(styleDragControl.transform.match(/[-\d\.]+/)[0]) : 0

    var process = currentX + changedX

    process = Math.min(process, translateX * 0.75)
    process = Math.max(process, translateX * 0.75 * -1)

    if (status === 'afterMove') {
      setStyleDragControl({ transform: `translateX(${process}px)`, transitionProperty: 'none' })
    }

    if (status === 'beforeEnd') {
      const content = { index: -1, direction: -1 }

      if (Math.abs(process) > translateX * 0.5 && process > 0) {
        content.index = sourceFindIndex - 1
        content.direction = 0
      }

      if (Math.abs(process) > translateX * 0.5 && process < 0) {
        content.index = sourceFindIndex + 1
        content.direction = 1
      }

      if (Math.abs(process) > translateX * 0.5) {
        if (content.index < 0) content.index = sourceLength - 1
        if (content.index > sourceLength - 1) content.index = 0

        content.hash = source[content.index]._hash

        Imitation.state['page.library.function'].onSwitch(content)
      }

      setStyleDragControl()
    }

    if (status === 'beforeEnd') {
      const continuedX = params.continuedX
      const continuedY = params.continuedY

      if (continuedX === 0 && continuedY === 0) {
        Imitation.state['page.library'].fullview = !Imitation.state['page.library'].fullview
        Imitation.dispatch()
      }
    }
  }

  const onTransitionEnd = () => {
    if (renderFindIndexInLast === true) {
      setDragControlEnable(true)
    }
    if (renderFindIndexInLast === false) {
      Imitation.state['page.library'].render.splice(renderFindIndex, 1)
      Imitation.dispatch()
    }
  }

  const resizeImage = () => {
    var r = {}

    const imageRadio = imageRef.current.width / imageRef.current.height
    const cardRadio = size.width / size.height

    if (Imitation.state['page.library'].fullview === true && imageRadio <= cardRadio) r.height = size.height
    if (Imitation.state['page.library'].fullview === true && imageRadio >= cardRadio) r.width = size.width
    if (Imitation.state['page.library'].fullview === false && imageRadio >= cardRadio) r.height = size.height
    if (Imitation.state['page.library'].fullview === false && imageRadio <= cardRadio) r.width = size.width

    if (r.width === undefined) r.width = r.height * imageRadio
    if (r.height === undefined) r.height = r.width / imageRadio

    setStyleBackground(r)
  }

  React.useEffect(() => {
    if (renderFindIndexInLast === true) requestAnimationFrame(() => setStyleAnimation(caculateStyleAnimation()[1]))
    if (renderFindIndexInLast === false) setStyleAnimation(caculateStyleAnimation()[1])
  }, [renderLength])

  React.useEffect(() => {
    if (imageRef.current !== undefined && sourceFind.src === imageRef.current.src) {
      resizeImage()
    }
    if (imageRef.current === undefined || sourceFind.src !== imageRef.current.src) {
      imageRef.current = new Image()
      imageRef.current.src = sourceFind.src
      imageRef.current.addEventListener('load', resizeImage)
    }
  }, [sourceFind, Imitation.state['page.library'].size, Imitation.state['page.library'].fullview])

  React.useEffect(() => {
    if (Imitation.state['page.library'].fullview === false) {
      setStyleWrapper(size)
    }
    if (Imitation.state['page.library'].fullview === true && styleBackground !== undefined) {
      setStyleWrapper({ width: Math.min(styleBackground.width, size.width), height: Math.min(styleBackground.height, size.height) })
    }
  }, [styleBackground, Imitation.state['page.library'].fullview])

  return <DragControl enable={dragControlEnable} onChange={onChangeDragControl}>
    {
      ({ onMouseDown, onTouchStart }) => {
        return <div style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', transformOrigin: 'center center', transitionProperty: 'all', transitionDuration: '1s', ...styleAnimation, ...styleDragControl }} onMouseDown={onMouseDown} onTouchStart={onTouchStart} onTransitionEnd={onTransitionEnd}>

          <div style={{ position: 'absolute', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', transitionProperty: 'all', transitionDuration: '1s', borderRadius: 12, background: Imitation.state.theme.palette.primary.main, opacity: styleBackground ? 0 : 1, ...styleWrapper }} onTransitionEnd={e => e.stopPropagation()}>
            <CircularProgress style={{ color: Imitation.state.theme.palette.background.main }} />
          </div>

          <div style={{ position: 'absolute', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', transitionProperty: 'all', transitionDuration: '1s', borderRadius: 12, opacity: styleBackground ? 1 : 0, ...styleWrapper }} onTransitionEnd={e => e.stopPropagation()}>
            <img style={{ transition: '1s all', ...styleBackground }} src={sourceFind.src}></img>
          </div>

        </div>
      }
    }
  </DragControl>
}

function ContentRenders() {
  return <>
    {
      Imitation.state['page.library'].render.map(i => <ContentRender key={i._hash} {...i} />)
    }
  </>
}

function Content() {
  const ref = React.useRef()

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(en => {
      Imitation.state['page.library'].size = { width: en[0].contentRect.width, height: en[0].contentRect.height }

      const size = Imitation.state['page.library'].size

      if (size.width * 1.5 >= size.height) size.overviewHeight = size.height
      if (size.width * 1.5 <= size.height) size.overviewWidth = size.width

      if (size.overviewWidth === undefined) size.overviewWidth = size.overviewHeight / 3 * 2
      if (size.overviewHeight === undefined) size.overviewHeight = size.overviewWidth * 1.5

      Imitation.dispatch()
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [])

  return <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ref={el => ref.current = el}>
    {
      Imitation.state['page.library'].size !== undefined && Imitation.state['page.library'].size.width !== 0 && Imitation.state['page.library'].size.height !== 0 ? <ContentRenders /> : null
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

    <SettingDialog />

    <div style={{ width: '100%', height: 4 }}></div>
  </div>
}

export default Imitation.withBindRender(App, state => [JSON.stringify(state['page.library'])])