import React from 'react'

function App(props, ref) {
  const { tag = 'div', animation, restore, ...params } = props

  const currentRef = React.useRef()

  const [style, setStyle] = React.useState(animation[0])

  React.useEffect(() => {
    const intersectionObserver = new IntersectionObserver(en => {
      if (en[0].intersectionRatio > 0) setStyle(animation[1])
      if (restore && en[0].intersectionRatio === 0) setStyle(animation[0])
    })

    intersectionObserver.observe(currentRef.current)

    return () => intersectionObserver.disconnect()
  }, [JSON.stringify(props.animation)])

  React.useImperativeHandle(ref, () => {
    return currentRef.current
  }, [])

  return React.createElement(tag, { ...params, style: { ...params.style, ...style }, ref: el => { currentRef.current = el } })
}

export default React.forwardRef(App)