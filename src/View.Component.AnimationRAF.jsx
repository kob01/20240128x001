import React from 'react'

const useState = (props) => {
  const ref = React.useRef()

  const [style, setStyle] = React.useState(props.animation[0])

  React.useEffect(() => {
    ref.current = requestAnimationFrame(() => setStyle(props.animation[1]))

    return () => cancelAnimationFrame(ref.current)
  }, [])

  return { style }
}

const AnimationRAF = (props) => { const state = useState(props); return props.children(state); }

const useAnimationRAF = (props) => { const state = useState(props); return state; }

const opacityAnimation = [{ opacity: 0 }, { opacity: 1 }]

export { AnimationRAF, useAnimationRAF, opacityAnimation }