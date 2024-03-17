import React from 'react'

const useState = (props) => {
  const { animation } = props

  const [style, setStyle] = React.useState(animation[0])

  React.useEffect(() => setTimeout(() => setStyle(animation[1]), props.time), [])

  return { style }
}

const AnimationTime = (props) => { const state = useState(props); return props.children(state); }

const useAnimationTime = (props) => { const state = useState(props); return state; }

const opacityAnimation = [{ opacity: 0 }, { opacity: 1 }]

export { AnimationTime, useAnimationTime, opacityAnimation }