import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import { useDragControl } from './View.Component.DragControl'

import Imitation from './utils.imitation'

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
        Imitation.state['page.library'].view.panorama = !Imitation.state['page.library'].view.panorama
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

  const { onMouseDown, onTouchStart } = useDragControl({ enable: dragControlEnable, onChange: onChangeDragControl })

  const resizeImage = () => {
    var r = {}

    const imageRadio = imageRef.current.width / imageRef.current.height
    const cardRadio = size.width / size.height

    if (Imitation.state['page.library'].view.panorama === true && imageRadio <= cardRadio) r.height = size.height
    if (Imitation.state['page.library'].view.panorama === true && imageRadio >= cardRadio) r.width = size.width
    if (Imitation.state['page.library'].view.panorama === false && imageRadio >= cardRadio) r.height = size.height
    if (Imitation.state['page.library'].view.panorama === false && imageRadio <= cardRadio) r.width = size.width

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
  }, [sourceFind, Imitation.state['page.library'].size, Imitation.state['page.library'].view.panorama])

  React.useEffect(() => {
    if (Imitation.state['page.library'].view.panorama === false) {
      setStyleWrapper(size)
    }
    if (Imitation.state['page.library'].view.panorama === true && styleBackground !== undefined) {
      setStyleWrapper({ width: Math.min(styleBackground.width, size.width), height: Math.min(styleBackground.height, size.height) })
    }
  }, [styleBackground, Imitation.state['page.library'].view.panorama])

  return <div style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', transformOrigin: 'center center', transitionProperty: 'all', transitionDuration: '1s', ...styleAnimation, ...styleDragControl }} onMouseDown={onMouseDown} onTouchStart={onTouchStart} onTransitionEnd={onTransitionEnd}>

    <div style={{ position: 'absolute', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', transitionProperty: 'all', transitionDuration: '1s', borderRadius: 12, background: Imitation.state.theme.palette.primary.main, opacity: styleBackground ? 0 : 1, ...styleWrapper }} onTransitionEnd={e => e.stopPropagation()}>
      <CircularProgress style={{ color: Imitation.state.theme.palette.background.main }} />
    </div>

    <div style={{ position: 'absolute', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', transitionProperty: 'all', transitionDuration: '1s', borderRadius: 12, opacity: styleBackground ? 1 : 0, ...styleWrapper }} onTransitionEnd={e => e.stopPropagation()}>
      <img style={{ transition: '1s all', ...styleBackground }} src={sourceFind.src}></img>
    </div>

  </div>
}

function ContentRenders() {
  return <>
    {
      Imitation.state['page.library'].render.map(i => <ContentRender key={i._hash} {...i} />)
    }
  </>
}

function App() {
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

export default App