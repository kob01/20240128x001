import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import { useDragControl } from './View.Component.DragControl'

import { ImitationPageLibrary } from './Imitation'

function Content(props) {
  const source = ImitationPageLibrary.state.store.source
  const sourceLength = ImitationPageLibrary.state.store.source.length
  const renderLength = ImitationPageLibrary.state.store.render.length

  const size = ImitationPageLibrary.state.memo.size()
  const sourceFind = ImitationPageLibrary.state.memo.sourceFind(props.hashSource)
  const sourceFindIndex = ImitationPageLibrary.state.memo.sourceFindIndex(props.hashSource)
  const renderFindIndexInLast = ImitationPageLibrary.state.memo.renderFindIndexInLast(props._hash)

  const caculateStyleAnimation = () => {
    var r = []

    if (renderFindIndexInLast === true) {
      if (props.direction === 0) r = [{ opacity: 0, transform: `translateX(-${size.overview.width * 0.45}px)`, transitionProperty: 'none' }, { opacity: 1, transform: 'translateX(0px)' }]
      if (props.direction === 1) r = [{ opacity: 0, transform: `translateX(${size.overview.width * 0.45}px)`, transitionProperty: 'none' }, { opacity: 1, transform: 'translateX(0px)' }]
      if (props.direction === 2) r = [{ opacity: 0 }, { opacity: 1 }]
    }

    if (renderFindIndexInLast === false) {
      if (props.direction === 0) r = [{ opacity: 1, transform: 'translateX(0px)' }, { opacity: 0, transform: `translateX(${size.overview.width * 0.45}px)` }]
      if (props.direction === 1) r = [{ opacity: 1, transform: 'translateX(0px)' }, { opacity: 0, transform: `translateX(-${size.overview.width * 0.45}px)` }]
    }

    return r
  }

  const imageRef = React.useRef()
  const timeoutRef = React.useRef()

  const [styleDragControl, setStyleDragControl] = React.useState()
  const [styleAnimation, setStyleAnimation] = React.useState(caculateStyleAnimation()[0])
  const [styleImage, setStyleImage] = React.useState()
  const [styleWrapper, setStyleWrapper] = React.useState({ width: size.width, height: size.height })

  const removeRender = () => {
    ImitationPageLibrary.state.store.render = ImitationPageLibrary.state.store.render.filter(i => i._hash !== props._hash)
    ImitationPageLibrary.state.function.update()
  }

  const onChangeDragControl = (params) => {
    const status = params.status

    const changedX = params.changedX ? params.changedX : 0

    const currentX = styleDragControl ? Number(styleDragControl.transform.match(/[-\d\.]+/)[0]) : 0

    var process = currentX + changedX

    process = Math.min(process, size.overview.width * 0.45 * 0.75)
    process = Math.max(process, size.overview.width * 0.45 * 0.75 * -1)

    if (status === 'afterMove') {
      setStyleDragControl({ transform: `translateX(${process}px)`, transitionProperty: 'none' })
    }

    if (status === 'beforeEnd') {
      const content = { index: -1, direction: -1 }

      if (Math.abs(process) > size.overview.width * 0.45 * 0.5 && process > 0) {
        content.index = sourceFindIndex - 1
        content.direction = 0
      }

      if (Math.abs(process) > size.overview.width * 0.45 * 0.5 && process < 0) {
        content.index = sourceFindIndex + 1
        content.direction = 1
      }

      if (Math.abs(process) > size.overview.width * 0.45 * 0.5) {
        if (content.index < 0) content.index = sourceLength - 1
        if (content.index > sourceLength - 1) content.index = 0

        content.hashSource = source[content.index]._hash

        ImitationPageLibrary.state.function.onSwitch(content)
      }

      setStyleDragControl()
    }

    if (status === 'beforeEnd') {
      const continuedX = params.continuedX
      const continuedY = params.continuedY

      if (continuedX === 0 && continuedY === 0) {
        ImitationPageLibrary.state.store.view.panorama = !ImitationPageLibrary.state.store.view.panorama
        ImitationPageLibrary.state.function.update()
      }
    }
  }

  const { onMouseDown, onTouchStart } = useDragControl({ enable: true, onChange: onChangeDragControl })

  React.useEffect(() => {
    if (renderFindIndexInLast === true && timeoutRef.current === undefined && renderLength > 1) timeoutRef.current = setTimeout(() => setStyleAnimation(caculateStyleAnimation()[1]), 1000)
    if (renderFindIndexInLast === true && timeoutRef.current === undefined && renderLength === 1) timeoutRef.current = setTimeout(() => setStyleAnimation(caculateStyleAnimation()[1]), 0)
    if (renderFindIndexInLast === false) setStyleAnimation(caculateStyleAnimation()[1])
    if (renderFindIndexInLast === false && timeoutRef.current !== undefined) clearTimeout(timeoutRef.current)
    if (renderFindIndexInLast === false && timeoutRef.current !== undefined) setTimeout(() => removeRender(), 1000)
    if (renderFindIndexInLast === false && timeoutRef.current === undefined) removeRender()
  }, [renderFindIndexInLast, renderLength])

  React.useEffect(() => {
    const resizeImage = () => {
      var r = {}

      const imageRadio = imageRef.current.width / imageRef.current.height
      const cardRadio = size.width / size.height

      if (ImitationPageLibrary.state.store.view.panorama === true && imageRadio <= cardRadio) r.height = size.height
      if (ImitationPageLibrary.state.store.view.panorama === true && imageRadio >= cardRadio) r.width = size.width
      if (ImitationPageLibrary.state.store.view.panorama === false && imageRadio >= cardRadio) r.height = size.height
      if (ImitationPageLibrary.state.store.view.panorama === false && imageRadio <= cardRadio) r.width = size.width

      if (r.width === undefined) r.width = r.height * imageRadio
      if (r.height === undefined) r.height = r.width / imageRadio

      setStyleImage(r)
      setStyleWrapper({ width: Math.min(r.width, size.width), height: Math.min(r.height, size.height) })
    }

    if (imageRef.current !== undefined && sourceFind.src === imageRef.current.src) {
      resizeImage()
    }
    if (imageRef.current === undefined || sourceFind.src !== imageRef.current.src) {
      imageRef.current = new Image()
      imageRef.current.src = sourceFind.src
      imageRef.current.addEventListener('load', resizeImage)
      // setTimeout(resizeImage, 2000)
    }
  }, [sourceFind, ImitationPageLibrary.state.store.rect, ImitationPageLibrary.state.store.view.panorama])

  React.useEffect(() => {
    if (ImitationPageLibrary.state.store.view.panorama === false || styleImage === undefined) {
      setStyleWrapper({ width: size.width, height: size.height })
    }
    if (ImitationPageLibrary.state.store.view.panorama === true && styleImage !== undefined) {
      setStyleWrapper({ width: Math.min(styleImage.width, size.width), height: Math.min(styleImage.height, size.height) })
    }
  }, [styleImage, size, ImitationPageLibrary.state.store.view.panorama])

  return <div style={{ position: 'absolute', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', transformOrigin: 'center center', borderRadius: 12, overflow: 'hidden', transitionProperty: 'all', transitionDuration: '1s', ...styleAnimation, ...styleDragControl, ...styleWrapper }} onMouseDown={onMouseDown} onTouchStart={onTouchStart}>

    <img style={{ position: 'absolute', transition: '1s all', opacity: (styleImage !== undefined && ImitationPageLibrary.state.store.recting === false) ? 1 : 0, ...styleImage }} src={sourceFind.src} onTransitionEnd={e => e.stopPropagation()} />

    <CircularProgress color='primary' style={{ position: 'absolute', transition: '1s all', opacity: (styleImage === undefined || ImitationPageLibrary.state.store.recting === true) ? 1 : 0 }} onTransitionEnd={e => e.stopPropagation()} />

  </div>
}

function App() {
  return <>
    {
      ImitationPageLibrary.state.store.render.map(i => <Content key={i._hash} {...i} />)
    }
  </>
}

export default App