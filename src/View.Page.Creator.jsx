import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

import ImageIcon from '@mui/icons-material/Image'
import SettingsIcon from '@mui/icons-material/Settings'
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture'

import Animation from './View.Component.Animation'
import useDragControl from './View.Component.useDragControl'

import Imitation from './utils.imitation'
import { DialogSX } from './utils.mui.sx'
import { hash } from './utils.common'
import { source } from './utils.source'
import { parse } from './utils.svg'

Imitation.state['page.creator'] = new Object()

Imitation.state['page.creator'].size = undefined

Imitation.state['page.creator'].source = { key: hash(), svg: [{ key: hash(), tag: 'path', ['d.origin']: [['M'], [0, 0], ['L'], [100, 150], ['L'], [100, 100], ['Z']], fill: 'red' }] }

Imitation.state['page.creator'].current = { key: hash(), type: 1, animation: { action: 0, direction: 2 }, visible: true }

Imitation.state['page.creator'].previous = { key: hash(), type: 1, animation: { action: 0, direction: 2 }, visible: false }

const onSwitch = (content) => {
  if (Imitation.state['page.creator'].current.type === content.type) return
  if (Imitation.state['page.creator'].current.type > content.type) Imitation.state['page.creator'].current.animation.direction = 0
  if (Imitation.state['page.creator'].current.type < content.type) Imitation.state['page.creator'].current.animation.direction = 1

  Imitation.state['page.creator'].previous.key = Imitation.state['page.creator'].current.key
  Imitation.state['page.creator'].previous.type = Imitation.state['page.creator'].current.type
  Imitation.state['page.creator'].previous.animation = { action: 1, direction: Imitation.state['page.creator'].current.animation.direction }
  Imitation.state['page.creator'].previous.visible = true

  Imitation.state['page.creator'].current.key = hash()
  Imitation.state['page.creator'].current.type = content.type
  Imitation.state['page.creator'].current.animation.action = 0
  Imitation.state['page.creator'].current.visible = true

  Imitation.dispatch()
}

Imitation.state['page.creator'].onSwitch = onSwitch

Imitation.state['page.creator']['select.svg'] = undefined


function Tools() {
  const style = { padding: 0, width: 36, height: 36, minWidth: 'auto', transition: '0.5s all', flexShrink: 0 }

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', flexWrap: 'wrap' }}>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} variant='text' style={{ ...style }} onClick={() => onSwitch({ type: 0 })} children={<ImageIcon />} />
      <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} variant='text' style={{ ...style }} onClick={() => onSwitch({ type: 1 })} children={<SettingsIcon />} />
      <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} variant='text' style={{ ...style }} onClick={() => onSwitch({ type: 2 })} children={<PictureInPictureIcon />} />
    </div>

  </div>
}

function Content_1_SvgTag(props) {
  const extra = new Object()

  extra['d.resize'] = props['d.origin']
    .map(i => {
      if (i.length !== 2 || isNaN(i[0]) === true || isNaN(i[1]) === true) return [...i]
      if (i.length === 2 && isNaN(i[0]) === false && isNaN(i[1]) === false) return [i[0] + Imitation.state['page.creator'].size.width / 2, i[1] + Imitation.state['page.creator'].size.height / 2]
    })

  extra['d'] = extra['d.resize'].flat(2).join(' ')

  const onChangeDragControl = (params) => {
    const status = params.status

    if (status === 'afterMove') {
      const changedX = params.changedX
      const changedY = params.changedY

      const svg = Imitation.state['page.creator'].source.svg.find(i => i.hash === props.hash)

      svg['d.origin'] = svg['d.origin']
        .map(i => {
          if (i.length !== 2 || isNaN(i[0]) === true || isNaN(i[1]) === true) return [...i]
          if (i.length === 2 && isNaN(i[0]) === false && isNaN(i[1]) === false) return [i[0] + changedX, i[1] + changedY]
        })

      Imitation.dispatch()
    }
  }

  const { onMouseDown, onTouchStart } = useDragControl({ enable: true, onChange: onChangeDragControl })

  const onClick = (e) => {
    e.stopPropagation()
    Imitation.state['page.creator']['select.svg'] = props.hash
    Imitation.dispatch()
  }

  return <props.tag {...props} {...extra} style={{ cursor: 'pointer' }} onMouseDown={onMouseDown} onTouchStart={onTouchStart} onClick={onClick}></props.tag>
}

function Content_1_SvgTags() {
  return <>
    {
      Imitation.state['page.creator'].source.svg.map(i => <Content_1_SvgTag {...i} />)
    }
  </>
}

function Content_1_SvgPoint(props) {
  const extra = new Object()

  extra['cx'] = props['cx.origin'] + Imitation.state['page.creator'].size.width / 2
  extra['cy'] = props['cy.origin'] + Imitation.state['page.creator'].size.height / 2

  const onChangeDragControl = (params) => {
    const status = params.status

    if (status === 'afterMove') {
      const changedX = params.changedX
      const changedY = params.changedY

      const svg = Imitation.state['page.creator'].source.svg.find(i => i.key !== Imitation.state['page.creator']['select.svg'])

      svg['d.origin'][props.index][0] = svg['d.origin'][props.index][0] + changedX
      svg['d.origin'][props.index][1] = svg['d.origin'][props.index][1] + changedY

      Imitation.dispatch()
    }
  }

  const { onMouseDown, onTouchStart } = useDragControl({ enable: true, onChange: onChangeDragControl })

  return <circle {...props} {...extra} onMouseDown={onMouseDown} onTouchStart={onTouchStart} />
}

function Content_1_SvgPoints() {
  const svg = Imitation.state['page.creator'].source.svg.find(i => i.key !== Imitation.state['page.creator']['select.svg'])

  if (svg !== undefined && svg.tag === 'path') {
    const render = svg['d.origin']
      .map((i, index) => {
        if (i.length !== 2 || isNaN(i[0]) === true || isNaN(i[1]) === true) return
        if (i.length === 2 && isNaN(i[0]) === false && isNaN(i[1]) === false) return { key: svg.key + index, ['cx.origin']: i[0], ['cy.origin']: i[1], fill: svg.fill, r: 4, index: index }
      })
      .filter(i => i)

    return render.map((i) => <Content_1_SvgPoint {...i} />)
  }

  return null
}

function Content_0(props) {
  const [styleBackground, setStyleBackground] = React.useState()

  const [styleAnimation, setStyleAnimation] = React.useState()

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
      const cardRadio = props.size.width / props.size.height

      if (imageRadio >= cardRadio) r.height = '100%'
      if (imageRadio <= cardRadio) r.width = '100%'

      setStyleBackground(r)
    }

    const image = new Image()

    image.src = Imitation.state['page.creator'].source.src

    image.onload = () => onload(image)
  }, [props.size])

  return <div style={{ ...props.size, position: 'absolute', zIndex: 1, overflow: 'hidden', borderRadius: 12, opacity: 0, transformOrigin: 'center bottom', transition: '0.5s all', ...styleAnimation }}>

    {
      styleBackground === undefined ?
        <div style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: Imitation.state.theme.palette.primary.main }}>
          <CircularProgress style={{ color: Imitation.state.theme.palette.background.main }} />
        </div>
        : null
    }

    {
      styleBackground !== undefined ?
        <div style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img style={{ ...styleBackground }} src={Imitation.state['page.creator'].source.src}></img>
        </div>
        : null
    }

    <div style={{ position: 'absolute', zIndex: 3, width: '100%', height: '100%' }}>

      <div></div>

    </div>

  </div >
}

function Content_1(props) {
  const [styleAnimation, setStyleAnimation] = React.useState()

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

  const onClick = (e) => {
    e.stopPropagation()
    Imitation.state['page.creator']['select.svg'] = undefined
    Imitation.dispatch()
  }

  return <div style={{ ...Imitation.state['page.creator'].size, position: 'absolute', zIndex: 1, overflow: 'hidden', borderRadius: 12, opacity: 0, background: Imitation.state.theme.palette.primary.main, transformOrigin: 'center bottom', transition: '0.5s all', ...styleAnimation }} onClick={onClick}>

    <div style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%' }}>
      <svg style={{ width: '100%', height: '100%' }}>
        <Content_1_SvgTags />
        <Content_1_SvgPoints />
      </svg>
    </div>

  </div>
}

function Content_2(props) {
  const [styleBackground, setStyleBackground] = React.useState()

  const [styleAnimation, setStyleAnimation] = React.useState()

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
      const cardRadio = props.size.width / props.size.height

      if (imageRadio >= cardRadio) r.height = '100%'
      if (imageRadio <= cardRadio) r.width = '100%'

      setStyleBackground(r)
    }

    const image = new Image()

    image.src = Imitation.state['page.creator'].source.src

    image.onload = () => onload(image)
  }, [props.size])

  return <div style={{ ...props.size, position: 'absolute', zIndex: 1, overflow: 'hidden', borderRadius: 12, opacity: 0, transformOrigin: 'center bottom', transition: '0.5s all', ...styleAnimation }}>

    {
      styleBackground === undefined ?
        <div style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: Imitation.state.theme.palette.primary.main }}>
          <CircularProgress style={{ color: Imitation.state.theme.palette.background.main }} />
        </div>
        : null
    }

    {
      styleBackground !== undefined ?
        <div style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img style={{ ...styleBackground }} src={Imitation.state['page.creator'].source.src}></img>
        </div>
        : null
    }

    <div style={{ position: 'absolute', zIndex: 3, width: '100%', height: '100%' }}>

      <div></div>

    </div>

  </div >
}

function Content(props) {
  if (props.type === 0) return <Content_0 {...props} />
  if (props.type === 1) return <Content_1 {...props} />
  if (props.type === 2) return <Content_2 {...props} />

  return null
}

function Contents() {
  const ref = React.useRef()

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(en => {
      const width = en[0].contentRect.width
      const height = en[0].contentRect.height

      if (width * 1.5 > height) Imitation.state['page.creator'].size = { width: height / 3 * 2, height: height }
      if (width * 1.5 < height) Imitation.state['page.creator'].size = { width: width, height: width * 1.5 }
      if (width === height / 1.5) Imitation.state['page.creator'].size = { width: width, height: height }

      Imitation.dispatch()
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [])

  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ref={el => ref.current = el}>
    {
      Imitation.state['page.creator'].size !== undefined && Imitation.state['page.creator'].previous.visible === true ? <Content {...Imitation.state['page.creator'].previous} /> : null
    }
    {
      Imitation.state['page.creator'].size !== undefined && Imitation.state['page.creator'].current.visible === true ? <Content {...Imitation.state['page.creator'].current} /> : null
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

  </div>
}

export default Imitation.withBindRender(App, state => [JSON.stringify(state['page.creator'])])