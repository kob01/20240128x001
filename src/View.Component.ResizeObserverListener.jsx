import React from 'react'

const useState = (props) => {
  const targetRef = React.useRef([])

  const [update, setUpdate] = React.useState(performance.now())

  React.useEffect(() => {
    return () => targetRef.current.forEach(i => i.observer.disconnect())
  }, [])

  const pushResizeTarget = (target) => {
    if (target && targetRef.current.map(i => i.target).includes(target) === false) {
      var count = 0

      const observer = new window.ResizeObserver(entry => {
        if (count > 0) setUpdate(performance.now())
        if (count > 0 && props.onChange) props.onChange({ target, entry })
        count = count + 1
      })

      observer.observe(target)

      targetRef.current.push({ target, observer })
    }

    targetRef.current.filter(i => document.contains(i.target) === false).forEach(i => i.observer.disconnect())

    targetRef.current = targetRef.current.filter(i => document.contains(i.target))
  }

  const r = { pushResizeTarget }

  return r
}

const ResizeObserverListener = (props) => { const state = useState(props); return props.children(state); }

const useResizeObserverListener = (props) => { const state = useState(props); return state; }

export { ResizeObserverListener, useResizeObserverListener }