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

    const changedX = 0
    const changedY = 0
    const continuedX = 0
    const continuedY = 0

    setActive(true)

    onChange({ e, x, y, status: 'afterStart', changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const onMove = React.useCallback((e, x, y) => {
    if (props.enable === false) return

    if (positionTarget.current === undefined) return

    const changedX = x - positionTarget.current.x
    const changedY = y - positionTarget.current.y
    const continuedX = positionTarget.current.x - positionOrigin.current.x
    const continuedY = positionTarget.current.y - positionOrigin.current.y

    positionTarget.current = { x, y }

    onChange({ e, x, y, status: 'afterMove', changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const onEnd = React.useCallback((e, x, y) => {
    if (props.enable === false) return

    if (positionTarget.current === undefined) return

    const changedX = x - positionTarget.current.x
    const changedY = y - positionTarget.current.y
    const continuedX = positionTarget.current.x - positionOrigin.current.x
    const continuedY = positionTarget.current.y - positionOrigin.current.y

    onChange({ e, x, y, status: 'beforeEnd', changedX, changedY, continuedX, continuedY })

    positionOrigin.current = undefined
    positionTarget.current = undefined

    setActive(false)

    onChange({ e, x, y, status: 'afterEnd', changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  React.useEffect(() => {
    if (window.ontouchstart !== undefined) return

    const _onMove = (e) => onMove(e, e.pageX, e.pageY)
    const _onEnd = (e) => onEnd(e, e.pageX, e.pageY)

    window.addEventListener('mousemove', _onMove, { passive: true })
    window.addEventListener('mouseup', _onEnd)

    return () => {
      window.removeEventListener('mousemove', _onMove, { passive: true })
      window.removeEventListener('mouseup', _onEnd)
    }
  }, [props.enable, props.onChange])

  const onMouseDown = (e) => window.ontouchstart === undefined ? onStart(e, e.pageX, e.pageY) : undefined

  const r = { active, onMouseDown }

  return r
}

const DragControl = (props) => { const state = useState(props); return props.children(state); }

const useDragControl = (props) => { const state = useState(props); return state; }

export { DragControl, useDragControl }