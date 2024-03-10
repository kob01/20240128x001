import React from 'react'

const useState = (props) => {
  const positionOrigin = React.useRef()
  const positionTarget = React.useRef()

  const [active, setActive] = React.useState(false)

  const onChange = React.useCallback((params) => {
    if (props.onChange) props.onChange(params)
    if (props.onChangeMemo) props.onChangeMemo(params)
  }, [props.onChange])

  const onStart = React.useCallback((e, x, y, xs, ys) => {
    if (props.enable === false) return

    positionOrigin.current = { x, y, xs, ys }
    positionTarget.current = { x, y, xs, ys }

    setActive(true)

    onChange({ e, x, y, xs, ys, status: 'afterStart' })
  }, [props.enable, props.onChange])

  const onMove = React.useCallback((e, x, y, xs, ys) => {
    if (props.enable === false) return

    if (positionTarget.current === undefined) return

    const changedX = x - positionTarget.current.x
    const changedY = y - positionTarget.current.y
    const continuedX = positionTarget.current.x - positionOrigin.current.x
    const continuedY = positionTarget.current.y - positionOrigin.current.y

    positionTarget.current = { x, y }

    onChange({ e, x, y, status: 'afterMove', changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const onEnd = React.useCallback((e) => {
    if (props.enable === false) return

    if (positionTarget.current === undefined) return

    const continuedX = positionTarget.current.x - positionOrigin.current.x
    const continuedY = positionTarget.current.y - positionOrigin.current.y

    onChange({ e, status: 'beforeEnd', continuedX, continuedY })

    positionOrigin.current = undefined
    positionTarget.current = undefined

    setActive(false)

    if (props.onChange) onChange({ status: 'afterEnd', continuedX, continuedY })
  }, [props.enable, props.onChange])

  React.useEffect(() => {
    if (window.ontouchstart !== undefined) return

    const _onMove = (e) => onMove(e, e.pageX, e.pageY)
    const _onEnd = (e) => onEnd(e)

    window.addEventListener('mousemove', _onMove, { passive: true })
    window.addEventListener('mouseup', _onEnd)

    return () => {
      window.removeEventListener('mousemove', _onMove, { passive: true })
      window.removeEventListener('mouseup', _onEnd)
    }
  }, [props.enable, props.onChange])

  React.useEffect(() => {
    if (window.ontouchstart === undefined) return

    const _onMove = (e) => onMove(e, e.targetTouches[0].pageX, e.targetTouches[0].pageY, [...e.targetTouches].map(i => i.pageX), [...e.targetTouches].map(i => i.pageY))
    const _onEnd = (e) => onEnd(e)

    window.addEventListener('touchmove', _onMove, { passive: true })
    window.addEventListener('touchend', _onEnd)

    return () => {
      window.removeEventListener('touchmove', _onMove, { passive: true })
      window.removeEventListener('touchend', _onEnd)
    }
  }, [props.enable, props.onChange])

  const onMouseDown = window.ontouchstart === undefined ? (e) => onStart(e, e.pageX, e.pageY) : undefined
  const onTouchStart = window.ontouchstart !== undefined ? (e) => onStart(e, e.targetTouches[0].pageX, e.targetTouches[0].pageY, [...e.targetTouches].map(i => i.pageX), [...e.targetTouches].map(i => i.pageY)) : undefined

  const r = { active, onMouseDown, onTouchStart }

  return r
}

const DragControl = (props) => { const state = useState(props); return props.children(state); }

const useDragControl = (props) => { const state = useState(props); return state; }

export { DragControl, useDragControl }