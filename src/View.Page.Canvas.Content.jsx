import React from 'react'

import { useDragControl } from './View.Component.DragControl'
import { useKeyboardRecord } from './View.Component.KeyboardRecord'

import Imitation from './utils.imitation'

import { rgba, fixed } from './utils.common'

function ContentCanvasRender(props) {
  const canvasLength = Imitation.state['page.canvas'].canvas.length

  const inControl = Imitation.state['page.canvas'].control.hash === props._hash
  const inPerspective = Imitation.state['page.canvas'].view.perspective

  const canvasFind = Imitation.state['page.canvas.memo'].canvasFind(props._hash)
  const canvasFindIndex = Imitation.state['page.canvas.memo'].canvasFindIndex(props._hash)
  const canvasRefFind = Imitation.state['page.canvas.memo'].canvasRefFind(props._hash)

  const [styleBackground, setStyleBackground] = React.useState()

  const [styleTransform, setStyleTransform] = React.useState()

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

  React.useEffect(() => {
    if (inPerspective === true) setStyleTransform({ transform: `translateX(${canvasFind.translateX}px) translateY(${canvasFind.translateY}px) translateZ(${(canvasFindIndex - canvasLength / 2 + 0.5) * Imitation.state['page.canvas'].view.perspectiveGap}px) scale(${canvasFind.scale})` })
    if (inPerspective === false) setStyleTransform({ transform: `translateX(${canvasFind.translateX}px) translateY(${canvasFind.translateY}px) translateZ(0px) scale(${canvasFind.scale})` })
  }, [inPerspective, canvasFindIndex, canvasLength, canvasFind.translateX, canvasFind.translateY, canvasFind.scale, Imitation.state['page.canvas'].view.perspectiveGap])

  return <canvas
    style={{ position: 'absolute', width: canvasFind.width, height: canvasFind.height, transitionDuration: '1s', transitionProperty: 'width, height, background, transform', ...styleTransform, ...styleBackground }}
    width={canvasFind.width}
    height={canvasFind.height}
    ref={el => canvasRefFind.canvas = el}
  />
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
  const inTranslateLayer = Imitation.state['page.canvas'].view.translateLayer
  const inTranslateAll = Imitation.state['page.canvas'].view.translateAll
  const inPerspective = Imitation.state['page.canvas'].view.perspective

  const canvasFind = Imitation.state['page.canvas.memo'].canvasFind(Imitation.state['page.canvas'].control.hash)
  const canvasRefFind = Imitation.state['page.canvas.memo'].canvasRefFind(Imitation.state['page.canvas'].control.hash)
  const paintFind = Imitation.state['page.canvas.memo'].paintFind(Imitation.state['page.canvas'].paint.current)

  const paintFindRun = React.useMemo(() => paintFind.paint(), [paintFind])

  const size = Imitation.state['page.canvas.memo'].size()

  const dragControlType = React.useRef()

  const { code } = useKeyboardRecord({ enable: true })

  const inSpace = code.includes('Space')

  const [styleTransform, setStyleTransform] = React.useState()

  const [styleTransformStyle, setStyleTransformStyle] = React.useState()

  const onChangeDragControl = (params) => {
    const status = params.status

    if (status === 'afterStart' && dragControlType.current === undefined && (inTranslateLayer === false && inTranslateAll === false && inPerspective === false && inSpace === false)) {
      dragControlType.current = 0
    }
    if (status === 'afterStart' && dragControlType.current === undefined && (inTranslateLayer === true && inSpace === false)) {
      dragControlType.current = 1
    }
    if (status === 'afterStart' && dragControlType.current === undefined && (inTranslateAll === true || inSpace === true)) {
      dragControlType.current = 2
    }
    if (status === 'afterStart' && dragControlType.current === undefined && (inPerspective === true && inSpace === false)) {
      dragControlType.current = 3
    }

    if (status === 'afterStart' && dragControlType.current === 0) {
      dragControlType.current = 0

      canvasRefFind.rect = canvasRefFind.canvas.getBoundingClientRect()

      const x = params.x
      const y = params.y
      const relativeX = (x - canvasRefFind.rect.left) / canvasFind.scale
      const relativeY = (y - canvasRefFind.rect.top) / canvasFind.scale

      paintFindRun(canvasRefFind, Imitation.state['page.canvas'].paint.setting, 0, fixed(relativeX), fixed(relativeY))
    }

    if (status === 'afterMove' && dragControlType.current === 0) {
      const x = params.x
      const y = params.y
      const relativeX = (x - canvasRefFind.rect.left) / canvasFind.scale
      const relativeY = (y - canvasRefFind.rect.top) / canvasFind.scale

      paintFindRun(canvasRefFind, Imitation.state['page.canvas'].paint.setting, 1, fixed(relativeX), fixed(relativeY))
    }

    if (status === 'afterEnd' && dragControlType.current === 0) {
      paintFindRun(canvasRefFind, Imitation.state['page.canvas'].paint.setting, 2)
    }

    if (status === 'afterMove' && dragControlType.current === 1) {
      dragControlType.current = 1

      const changedX = params.changedX
      const changedY = params.changedY

      canvasFind.translateX = canvasFind.translateX + changedX
      canvasFind.translateY = canvasFind.translateY + changedY

      canvasFind.translateX = fixed(canvasFind.translateX)
      canvasFind.translateY = fixed(canvasFind.translateY)

      Imitation.dispatch()
    }

    if (status === 'afterMove' && dragControlType.current === 2) {
      dragControlType.current = 2

      const changedX = params.changedX
      const changedY = params.changedY

      Imitation.state['page.canvas'].canvas.forEach(i => {
        i.translateX = i.translateX + changedX
        i.translateY = i.translateY + changedY

        i.translateX = fixed(i.translateX)
        i.translateY = fixed(i.translateY)
      })

      Imitation.dispatch()
    }

    if (status === 'afterMove' && dragControlType.current === 3) {
      dragControlType.current = 3

      const changedX = params.changedX
      const changedY = params.changedY

      Imitation.state['page.canvas'].view.perspectiveRotateX = Imitation.state['page.canvas'].view.perspectiveRotateX - changedY / 5
      Imitation.state['page.canvas'].view.perspectiveRotateY = Imitation.state['page.canvas'].view.perspectiveRotateY + changedX / 5

      Imitation.state['page.canvas'].view.perspectiveRotateX = fixed(Imitation.state['page.canvas'].view.perspectiveRotateX - changedY / 5)
      Imitation.state['page.canvas'].view.perspectiveRotateY = fixed(Imitation.state['page.canvas'].view.perspectiveRotateY + changedX / 5)

      if (Imitation.state['page.canvas'].view.perspectiveRotateX > 360) Imitation.state['page.canvas'].view.perspectiveRotateX = 360
      if (Imitation.state['page.canvas'].view.perspectiveRotateY > 360) Imitation.state['page.canvas'].view.perspectiveRotateY = 360
      if (Imitation.state['page.canvas'].view.perspectiveRotateX < -360) Imitation.state['page.canvas'].view.perspectiveRotateX = -360
      if (Imitation.state['page.canvas'].view.perspectiveRotateY < -360) Imitation.state['page.canvas'].view.perspectiveRotateY = -360

      Imitation.dispatch()
    }

    if (status === 'afterEnd') {
      dragControlType.current = undefined
    }
  }

  const { onMouseDown, onTouchStart } = useDragControl({ enable: true, onChange: onChangeDragControl })

  React.useEffect(() => {
    if (inPerspective === true) setStyleTransform({ transform: `rotateX(${Imitation.state['page.canvas'].view.perspectiveRotateX}deg) rotateY(${Imitation.state['page.canvas'].view.perspectiveRotateY}deg)` })
    if (inPerspective === false) setStyleTransform()
  }, [inPerspective, Imitation.state['page.canvas'].view.perspectiveRotateX, Imitation.state['page.canvas'].view.perspectiveRotateY])

  React.useEffect(() => {
    if (inPerspective === true) setStyleTransformStyle({ transformStyle: 'preserve-3d', perspective: 10000000 })
    if (inPerspective === false) setStyleTransformStyle({ transformStyle: 'preserve-3d', perspective: 10000000 })
  }, [inPerspective,])

  return <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 12, overflow: 'hidden', transition: '1s all', background: Imitation.state.theme.palette.primary.main, ...styleTransformStyle, ...size }} onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
    <div style={{ width: 0, height: 0, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: '1s all', ...styleTransformStyle, ...styleTransform }}>
      <ContentCanvasRenders />
    </div>
  </div>
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