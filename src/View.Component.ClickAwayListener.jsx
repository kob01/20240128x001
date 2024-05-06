import React from 'react'

const useState = (props) => {
  const targetRef = React.useRef([])

  const positionStart = React.useRef()

  React.useEffect(() => {
    if (window.ontouchstart !== undefined) return

    const mousedown = (e) => {
      positionStart.current = { x: e.pageX, y: e.pageY, inContain: targetRef.current.some(i => i.target.contains(e.target)) }
      const inContainStart = positionStart.current.inContain
      if (props.onClick) props.onClick({ inStay: undefined, inContainStart, inContainEnd: undefined })
    }

    const mouseup = (e) => {
      if (!positionStart.current) return
      const inStay = e.pageX === positionStart.current.x && e.pageY === positionStart.current.y
      const inContainStart = positionStart.current.inContain
      const inContainEnd = targetRef.current.some(i => i.target.contains(e.target))
      if (props.onClick) props.onClick({ inStay, inContainStart, inContainEnd })
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
      positionStart.current = { x: e.targetTouches[0].pageX, y: e.targetTouches[0].pageY, inContain: targetRef.current.some(i => i.target.contains(e.target)) }
    }

    const touchend = (e) => {
      if (!positionStart.current) return
      const inStay = e.changedTouches[0].pageX === positionStart.current.x && e.changedTouches[0].pageY === positionStart.current.y
      const inContainStart = positionStart.current.inContain
      const inContainEnd = targetRef.current.some(i => i.target.contains(e.target))
      if (props.onClick) props.onClick({ inStay, inContainStart, inContainEnd })
    }

    document.addEventListener('touchstart', touchstart)
    document.addEventListener('touchend', touchend)

    return () => {
      document.removeEventListener('touchstart', touchstart)
      document.removeEventListener('touchend', touchend)
    }
  }, [])

  const pushIgnoreTarget = (target) => {
    if (target && targetRef.current.map(i => i.target).includes(target) === false) {
      targetRef.current.push({ target })
    }
    
    targetRef.current = targetRef.current.filter(i => document.contains(i.target))
  }

  return { pushIgnoreTarget }
}

const ClickAwayListener = (props) => { const state = useState(props); return props.children(state); }

const useClickAwayListener = (props) => { const state = useState(props); return state; }

export { ClickAwayListener, useClickAwayListener }