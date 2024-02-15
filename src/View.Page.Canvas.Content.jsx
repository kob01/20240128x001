import React from 'react'

import { DragControl } from './View.Component.DragControl'

import Imitation from './utils.imitation'

import { rgba } from './utils.common'

function ContentCanvasRender(props) {
  const canvasLength = Imitation.state['page.canvas'].canvas.length

  const inControl = Imitation.state['page.canvas'].control.hash === props._hash
  const inTranslate = Imitation.state['page.canvas'].view.translate
  const inTranslateAll = Imitation.state['page.canvas'].view.translateAll
  const inPerspective = Imitation.state['page.canvas'].view.perspective

  const canvasFind = Imitation.state['page.canvas.memo'].canvasFind(props._hash)
  const canvasFindIndex = Imitation.state['page.canvas.memo'].canvasFindIndex(props._hash)
  const canvasRefFind = Imitation.state['page.canvas.memo'].canvasRefFind(props._hash)
  const paintCurrentFind = Imitation.state['page.canvas.memo'].paintCurrentFind(Imitation.state['page.canvas'].paint.current)

  const paintCurrentFindRun = paintCurrentFind.paint()

  const [styleBackground, setStyleBackground] = React.useState()

  // const [styleTransform, setStyleTransform] = React.useState()

  // const [styleTransitionProperty, setStyleTransitionProperty] = React.useState()

  const dragControlEnable = inControl && inTranslate === false && inTranslateAll === false && inPerspective === false

  const onChangeDragControl = (params) => {
    const status = params.status

    if (status === 'afterStart') {
      canvasRefFind.rect = canvasRefFind.canvas.getBoundingClientRect()

      const x = params.x
      const y = params.y
      const relativeX = (x - canvasRefFind.rect.left) * Imitation.state['page.canvas'].view.dpr
      const relativeY = (y - canvasRefFind.rect.top) * Imitation.state['page.canvas'].view.dpr

      paintCurrentFindRun(canvasRefFind, Imitation.state['page.canvas'].paint.setting, status, relativeX, relativeY)
    }

    if (status === 'afterMove') {
      const x = params.x
      const y = params.y
      const relativeX = (x - canvasRefFind.rect.left) * Imitation.state['page.canvas'].view.dpr
      const relativeY = (y - canvasRefFind.rect.top) * Imitation.state['page.canvas'].view.dpr

      paintCurrentFindRun(canvasRefFind, Imitation.state['page.canvas'].paint.setting, status, relativeX, relativeY)
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
    if (inPerspective === true && inControl === false) r = { background: rgba(Imitation.state.theme.palette.background.main, 0.1 + canvasFindIndex / (canvasLength - 1) * 0.1) }
    if (inPerspective === false && inControl === true) r = { background: rgba(Imitation.state.theme.palette.background.main, 0.1) }
    setStyleBackground(r)
  }, [inPerspective, inControl, canvasFindIndex, canvasLength, Imitation.state.theme.palette.background.main])

  // React.useEffect(() => {
  //   var r
  //   if (inPerspective === true) r = { transform: `rotateZ(30deg) rotateY(45deg) translateY(${(canvasFindIndex - canvasLength / 2 + 0.5) * 20}px) translateX(${(canvasFindIndex - canvasLength / 2 + 0.5) * 180}px)` }
  //   if (inPerspective === false) r = { transform: `translate(${canvasFind.translateX}px, ${canvasFind.translateY}px)` }
  //   setStyleTransform(r)
  // }, [inPerspective, canvasFind.translateX, canvasFind.translateY, canvasFindIndex, canvasLength])

  // React.useEffect(() => {
  //   var r
  //   if (inPerspective === true) r = { transitionProperty: 'width, height, background, transform' }
  //   if (inPerspective === false && (inTranslate === true || inTranslateAll === true)) r = { transitionProperty: 'width, height, background' }
  //   if (inPerspective === false && (inTranslate === false && inTranslateAll === false)) r = { transitionProperty: 'width, height, background, transform' }
  //   setStyleTransitionProperty(r)
  // }, [inPerspective, inTranslate, inTranslateAll])

  return <DragControl enable={dragControlEnable} onChange={onChangeDragControl}>
    {
      ({ onMouseDown, onTouchStart }) => {
        return <canvas
          style={{
            position: 'absolute',
            width: canvasFind.width / Imitation.state['page.canvas'].view.dpr,
            height: canvasFind.height / Imitation.state['page.canvas'].view.dpr,
            transform: `translateX(${canvasFind.translateX}px) translateY(${canvasFind.translateY}px) translateZ(${(canvasFindIndex - canvasLength / 2 + 0.5) * Imitation.state['page.canvas'].view.perspectiveGap}px)`,
            transitionDuration: '1s',
            transitionProperty: 'width, height, background, transform',
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
  const inTranslate = Imitation.state['page.canvas'].view.translate
  const inTranslateAll = Imitation.state['page.canvas'].view.translateAll
  const inPerspective = Imitation.state['page.canvas'].view.perspective

  const canvasFind = Imitation.state['page.canvas.memo'].canvasFind(Imitation.state['page.canvas'].control.hash)

  const size = Imitation.state['page.canvas.memo'].size()

  const [styleTransform, setStyleTransform] = React.useState()

  const dragControlEnable = inTranslate === true || inTranslateAll === true || inPerspective === true

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

    if (status === 'afterMove' && inPerspective === true) {
      const changedX = params.changedX
      const changedY = params.changedY

      Imitation.state['page.canvas'].view.perspectiveRotateX = Imitation.state['page.canvas'].view.perspectiveRotateX + changedY / 5
      Imitation.state['page.canvas'].view.perspectiveRotateY = Imitation.state['page.canvas'].view.perspectiveRotateY - changedX / 5

      if (Imitation.state['page.canvas'].view.perspectiveRotateX > 360) Imitation.state['page.canvas'].view.perspectiveRotateX = 360
      if (Imitation.state['page.canvas'].view.perspectiveRotateY > 360) Imitation.state['page.canvas'].view.perspectiveRotateY = 360
      if (Imitation.state['page.canvas'].view.perspectiveRotateX < -360) Imitation.state['page.canvas'].view.perspectiveRotateX = -360
      if (Imitation.state['page.canvas'].view.perspectiveRotateY < -360) Imitation.state['page.canvas'].view.perspectiveRotateY = -360

      Imitation.dispatch()
    }
  }

  React.useEffect(() => {
    if (inPerspective === true) setStyleTransform({ transform: `rotateX(${Imitation.state['page.canvas'].view.perspectiveRotateX}deg) rotateY(${Imitation.state['page.canvas'].view.perspectiveRotateY}deg)` })
    if (inPerspective === false) setStyleTransform()
  }, [inPerspective, Imitation.state['page.canvas'].view.perspectiveRotateX, Imitation.state['page.canvas'].view.perspectiveRotateY])

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
            transformStyle: 'preserve-3d',
            background: Imitation.state.theme.palette.primary.main,
            ...size,
          }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <div
            style={{
              width: 0,
              height: 0,
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: '1s all',
              transformStyle: 'preserve-3d',
              ...styleTransform
            }}
          >
            <ContentCanvasRenders />
          </div>
        </div>
      }
    }
  </DragControl>
}

function App() {
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

export default App