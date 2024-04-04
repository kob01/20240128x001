import React from 'react'

const useState = () => {
  const [hover, setHover] = React.useState(false)

  const onMouseEnter = () => {
    setHover(true)
  }

  const onMouseLeave = () => {
    setHover(false)
  }

  return { hover, setHover, onMouseEnter, onMouseLeave }
}

const HoverListener = (props) => { const state = useState(props); return props.children(state); }

const useHoverListener = (props) => { const state = useState(props); return state; }

export { HoverListener, useHoverListener }