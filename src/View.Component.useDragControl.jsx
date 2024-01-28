import React from 'react'

const useDragControl = (props) => {
  const position = React.useRef()
  const position_ = React.useRef()
  const position__ = React.useRef()

  const [active, setActive] = React.useState(false)

  const onChange = React.useCallback((params) => {
    if (props.onChange) props.onChange(params)
    if (props.onChangeMemo) props.onChangeMemo(params)
  }, [props.onChange])

  const onStart = React.useCallback((x, y) => {
    if (props.enable === false) return

    position.current = [x, y]
    position_.current = null
    position__.current = [x, y]

    setActive(true)

    onChange({ status: 'afterStart' })
  }, [props.enable, props.onChange])

  const onMove = React.useCallback((x, y) => {
    if (props.enable === false) return

    if (position__.current === undefined) return

    const changedX = x - position__.current[0]
    const changedY = y - position__.current[1]
    const continuedX = position__.current[0] - position.current[0]
    const continuedY = position__.current[1] - position.current[1]

    position__.current = [x, y]

    onChange({ status: 'afterMove', changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const onEnd = React.useCallback(() => {
    if (props.enable === false) return

    if (position__.current === undefined) return

    const continuedX = position__.current[0] - position.current[0]
    const continuedY = position__.current[1] - position.current[1]

    onChange({ status: 'beforeEnd', continuedX, continuedY })

    position.current = undefined
    position_.current = position__.current
    position__.current = undefined

    setActive(false)

    if (props.onChange) onChange({ status: 'afterEnd', continuedX, continuedY })
  }, [props.enable, props.onChange])

  React.useEffect(() => {
    const _onMove = (e) => onMove(e.pageX, e.pageY)
    const _onEnd = (e) => onEnd()

    window.addEventListener('mousemove', _onMove, { passive: true })
    window.addEventListener('mouseup', _onEnd)

    return () => {
      window.removeEventListener('mousemove', _onMove, { passive: true })
      window.removeEventListener('mouseup', _onEnd)
    }
  }, [props.enable, props.onChange])

  React.useEffect(() => {
    const _onMove = (e) => onMove(e.targetTouches[0].pageX, e.targetTouches[0].pageY)
    const _onEnd = (e) => onEnd()

    window.addEventListener('touchmove', _onMove, { passive: true })
    window.addEventListener('touchend', _onEnd)

    return () => {
      window.removeEventListener('touchmove', _onMove, { passive: true })
      window.removeEventListener('touchend', _onEnd)
    }
  }, [props.enable, props.onChange])

  const onMouseDown = (e) => onStart(e.pageX, e.pageY)
  const onTouchStart = (e) => onStart(e.targetTouches[0].pageX, e.targetTouches[0].pageY)

  const r = { active, onMouseDown, onTouchStart }

  return r
}

export default useDragControl