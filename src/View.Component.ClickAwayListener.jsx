import React from 'react'

const useState = (props) => {
  const clickAwayRef = React.useRef([])

  const positionStart = React.useRef()

  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (window.ontouchstart !== undefined) return

    const mousedown = (e) => {
      positionStart.current = { x: e.pageX, y: e.pageY }
    }

    const mouseup = (e) => {
      if (e.pageX !== positionStart.current.x || e.pageY !== positionStart.current.y) return
      if (clickAwayRef.current.some(i => i.target && i.target.contains(e.target)) === true) return
      setOpen(false)
      if (props.onClick) props.onClick()
    }

    document.addEventListener('mousedown', mousedown)
    document.addEventListener('mouseup', mouseup)

    return () => {
      document.removeEventListener('mousedown', mousedown)
      document.removeEventListener('mouseup', mouseup)
    }
  }, [])

  React.useEffect(() => {
    if (window.ontouchstart === undefined) return

    const touchstart = (e) => {
      positionStart.current = { x: e.targetTouches[0].pageX, y: e.targetTouches[0].pageY }
    }

    const touchend = (e) => {
      if (e.changedTouches[0].pageX !== positionStart.current.x || e.changedTouches[0].pageY !== positionStart.current.y) return
      if (clickAwayRef.current.some(i => i.target && i.target.contains(e.target)) === true) return
      setOpen(false)
      if (props.onClick) props.onClick()
    }

    document.addEventListener('touchstart', touchstart)
    document.addEventListener('touchend', touchend)

    return () => {
      document.removeEventListener('touchstart', touchstart)
      document.removeEventListener('touchend', touchend)
    }
  }, [])

  const pushClickAwayRef = (key, target) => {
    clickAwayRef.current = clickAwayRef.current.filter(i => i.key !== key)
    clickAwayRef.current.push({ key, target })
  }

  return { open, setOpen, pushClickAwayRef }
}

const ClickAwayListener = (props) => { const state = useState(props); return props.children(state); }

const useClickAwayListener = (props) => { const state = useState(props); return state; }

export { ClickAwayListener, useClickAwayListener }