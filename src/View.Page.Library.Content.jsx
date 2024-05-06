import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import { useDragControl as useDragControlMouse } from './View.Component.DragControl.Mouse'
import { useDragControl as useDragControlTouch } from './View.Component.DragControl.Touch'

import { ImitationPageLibrary } from './Imitation'

function Content(props) {
  const source = ImitationPageLibrary.state.store.source
  const sourceLength = ImitationPageLibrary.state.store.source.length
  const renderLength = ImitationPageLibrary.state.store.renderImage.length

  const sourceFind = ImitationPageLibrary.state.memo.sourceFind(props.sourceHash)
  const sourceFindIndex = ImitationPageLibrary.state.memo.sourceFindIndex(props.sourceHash)
  const renderImageFindIndexInLast = ImitationPageLibrary.state.memo.renderImageFindIndexInLast(props._hash)

  const size = React.useMemo(() => {
    if (ImitationPageLibrary.state.store.view.panorama === false) {
      return { width: ImitationPageLibrary.state.store.rect.width - 32, height: ImitationPageLibrary.state.store.rect.height - 32 }
    }
    if (ImitationPageLibrary.state.store.view.panorama === true) {
      return { width: ImitationPageLibrary.state.store.rect.width - 32, height: ImitationPageLibrary.state.store.rect.height - 32 }
    }
  }, [ImitationPageLibrary.state.store.rect, ImitationPageLibrary.state.store.view.panorama])

  const translateXMax = Math.min(ImitationPageLibrary.state.store.rect.width * 0.45, 400)
  const translateXMin = Math.min(ImitationPageLibrary.state.store.rect.width * 0.45, 400) * -1

  const caculateStyleAnimation = () => {
    var r = []

    if (renderImageFindIndexInLast === true) {
      if (props.direction === 0) r = [{ opacity: 0, transform: `translateX(${translateXMin}px)`, transitionProperty: 'none' }, { opacity: 1, transform: 'translateX(0px)' }]
      if (props.direction === 1) r = [{ opacity: 0, transform: `translateX(${translateXMax}px)`, transitionProperty: 'none' }, { opacity: 1, transform: 'translateX(0px)' }]
      if (props.direction === 2) r = [{ opacity: 0 }, { opacity: 1 }]
    }

    if (renderImageFindIndexInLast === false) {
      if (props.direction === 0) r = [{ opacity: 1, transform: 'translateX(0px)' }, { opacity: 0, transform: `translateX(${translateXMax}px)` }]
      if (props.direction === 1) r = [{ opacity: 1, transform: 'translateX(0px)' }, { opacity: 0, transform: `translateX(${translateXMin}px)` }]
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
    ImitationPageLibrary.state.store.renderImage = ImitationPageLibrary.state.store.renderImage.filter(i => i._hash !== props._hash)
    ImitationPageLibrary.state.function.update()
  }

  const onChangeDragControlMouse = (params) => {
    const status = params.status

    const changedX = params.changedX
    const continuedX = params.continuedX
    const continuedY = params.continuedY

    const currentX = styleDragControl ? Number(styleDragControl.match(/[-\d\.]+/)[0]) : 0

    var process = currentX + changedX

    process = Math.min(process, translateXMax * 0.75)
    process = Math.max(process, translateXMin * 0.75)

    if (status === 'afterMove') {
      setStyleDragControl({ transform: `translateX(${process}px)`, transitionProperty: 'none' })
    }

    if (status === 'beforeEnd') {
      const content = { index: undefined, direction: undefined }

      if (process > translateXMax * 0.5) {
        content.index = sourceFindIndex - 1
        content.direction = 0
      }

      if (process < translateXMin * 0.5) {
        content.index = sourceFindIndex + 1
        content.direction = 1
      }

      if (content.index !== undefined && content.direction !== undefined) {
        if (content.index < 0) content.index = sourceLength - 1
        if (content.index > sourceLength - 1) content.index = 0

        content.sourceHash = source[content.index]._hash

        ImitationPageLibrary.state.function.onSwitch(content)
      }

      setStyleDragControl()
    }

    if (status === 'beforeEnd' && continuedX === 0 && continuedY === 0) {
      ImitationPageLibrary.state.store.view.panorama = !ImitationPageLibrary.state.store.view.panorama
      ImitationPageLibrary.state.function.update()
    }
  }

  const { onMouseDown } = useDragControlMouse({ enable: true, onChange: onChangeDragControlMouse })

  const onChangeDragControlTouch = (params) => {
    const status = params.status

    const changedX = params.changedX[0]
    const continuedX = params.continuedX[0]
    const continuedY = params.continuedY[0]

    const currentX = styleDragControl ? Number(styleDragControl.match(/[-\d\.]+/)[0]) : 0

    var process = currentX + changedX

    process = Math.min(process, translateXMax * 0.75)
    process = Math.max(process, translateXMin * 0.75)

    if (status === 'afterMove') {
      setStyleDragControl({ transform: `translateX(${process}px)`, transitionProperty: 'none' })
    }

    if (status === 'beforeEnd') {
      const content = { index: undefined, direction: undefined }

      if (process > translateXMax * 0.5) {
        content.index = sourceFindIndex - 1
        content.direction = 0
      }

      if (process < translateXMin * 0.5) {
        content.index = sourceFindIndex + 1
        content.direction = 1
      }

      if (content.index !== undefined && content.direction !== undefined) {
        if (content.index < 0) content.index = sourceLength - 1
        if (content.index > sourceLength - 1) content.index = 0

        content.sourceHash = source[content.index]._hash

        ImitationPageLibrary.state.function.onSwitch(content)
      }

      setStyleDragControl()
    }

    if (status === 'beforeEnd' && continuedX === 0 && continuedY === 0) {
      ImitationPageLibrary.state.store.view.panorama = !ImitationPageLibrary.state.store.view.panorama
      ImitationPageLibrary.state.function.update()
    }
  }

  const { onTouchStart } = useDragControlTouch({ enable: true, onChange: onChangeDragControlTouch })

  React.useEffect(() => {
    if (renderImageFindIndexInLast === true && timeoutRef.current === undefined && renderLength > 1) timeoutRef.current = setTimeout(() => setStyleAnimation(caculateStyleAnimation()[1]), 1000)
    if (renderImageFindIndexInLast === true && timeoutRef.current === undefined && renderLength === 1) timeoutRef.current = setTimeout(() => setStyleAnimation(caculateStyleAnimation()[1]), 0)
    if (renderImageFindIndexInLast === false) setStyleAnimation(caculateStyleAnimation()[1])
    if (renderImageFindIndexInLast === false && timeoutRef.current !== undefined) clearTimeout(timeoutRef.current)
    if (renderImageFindIndexInLast === false && timeoutRef.current !== undefined) setTimeout(() => removeRender(), 1000)
    if (renderImageFindIndexInLast === false && timeoutRef.current === undefined) removeRender()
  }, [renderImageFindIndexInLast, renderLength])

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
  }, [styleImage, ImitationPageLibrary.state.store.rect.width, ImitationPageLibrary.state.store.rect.height, ImitationPageLibrary.state.store.view.panorama])

  return <div style={{ position: 'absolute', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', transformOrigin: 'center center', borderRadius: 12, overflow: 'hidden', transitionProperty: 'all', transitionDuration: '1s', ...styleAnimation, ...styleDragControl, ...styleWrapper }} onMouseDown={onMouseDown} onTouchStart={onTouchStart}>

    <img style={{ position: 'absolute', transition: '1s all', opacity: (styleImage !== undefined && ImitationPageLibrary.state.store.recting === false) ? 1 : 0, ...styleImage }} src={sourceFind.src} onTransitionEnd={e => e.stopPropagation()} />

    <CircularProgress color='primary' style={{ position: 'absolute', pointerEvents: 'none', transition: '1s all', opacity: (styleImage === undefined || ImitationPageLibrary.state.store.recting === true) ? 1 : 0 }} onTransitionEnd={e => e.stopPropagation()} />

  </div>
}

function App() {
  return <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {
      ImitationPageLibrary.state.store.renderImage.map(i => <Content key={i._hash} {...i} />)
    }
  </div>
}

export default App