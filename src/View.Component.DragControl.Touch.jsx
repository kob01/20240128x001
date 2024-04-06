import React from 'react'

const useState = (props) => {
  const positionOrigin = React.useRef()
  const positionTarget = React.useRef()

  const [active, setActive] = React.useState(false)

  const onChange = React.useCallback((params) => {
    if (props.onChange) props.onChange(params)
    if (props.onChangeMemo) props.onChangeMemo(params)
  }, [props.onChange])

  const onStart = React.useCallback((e, x, y) => {
    if (props.enable === false) return

    positionOrigin.current = { x, y }
    positionTarget.current = { x, y }

    const changedX = []
    const changedY = []
    const continuedX = []
    const continuedY = []

    x.forEach((x, index) => {
      changedX[index] = 0
      continuedX[index] = 0
    })

    y.forEach((y, index) => {
      changedY[index] = 0
      continuedY[index] = 0
    })

    setActive(true)

    onChange({ e, x, y, status: 'afterStart', changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const onMove = React.useCallback((e, x, y) => {
    if (props.enable === false) return

    if (positionTarget.current === undefined) return

    const changedX = []
    const changedY = []
    const continuedX = []
    const continuedY = []

    x.forEach((x, index) => {
      changedX[index] = x - positionTarget.current.x[index]
      continuedX[index] = positionTarget.current.x[index] - positionOrigin.current.x[index]
    })

    y.forEach((y, index) => {
      changedY[index] = y - positionTarget.current.y[index]
      continuedY[index] = positionTarget.current.y[index] - positionOrigin.current.y[index]
    })

    positionTarget.current = { x, y }

    onChange({ e, x, y, status: 'afterMove', changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const onEnd = React.useCallback((e, x, y) => {
    if (props.enable === false) return

    if (positionTarget.current === undefined) return

    const changedX = []
    const changedY = []
    const continuedX = []
    const continuedY = []

    x.forEach((x, index) => {
      changedX[index] = x - positionTarget.current.x[index]
      continuedX[index] = positionTarget.current.x[index] - positionOrigin.current.x[index]
    })

   y.forEach((y, index) => {
      changedY[index] = y - positionTarget.current.y[index]
      continuedY[index] = positionTarget.current.y[index] - positionOrigin.current.y[index]
    })

    onChange({ e, x, y, status: 'beforeEnd', changedX, changedY, continuedX, continuedY })

    positionOrigin.current = undefined
    positionTarget.current = undefined

    setActive(false)

    onChange({ e, x, y, status: 'afterEnd', changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  React.useEffect(() => {
    if (window.ontouchstart === undefined) return

    const _onMove = (e) => onMove(e, [...e.targetTouches].map(i => i.pageX), [...e.targetTouches].map(i => i.pageY))
    const _onEnd = (e) => onEnd(e, [...e.changedTouches].map(i => i.pageX), [...e.changedTouches].map(i => i.pageY))

    window.addEventListener('touchmove', _onMove, { passive: true })
    window.addEventListener('touchend', _onEnd)

    return () => {
      window.removeEventListener('touchmove', _onMove, { passive: true })
      window.removeEventListener('touchend', _onEnd)
    }
  }, [props.enable, props.onChange])

  const onTouchStart = window.ontouchstart !== undefined ? (e) => onStart(e, [...e.targetTouches].map(i => i.pageX), [...e.targetTouches].map(i => i.pageY)) : undefined

  const r = { active, onTouchStart }

  return r
}

const DragControl = (props) => { const state = useState(props); return props.children(state); }

const useDragControl = (props) => { const state = useState(props); return state; }

export { DragControl, useDragControl }