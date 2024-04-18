import React from 'react'

const useState = (props) => {
  const [code, setCode] = React.useState([])

  const onKeydown = (e) => {
    if (props.enable === false) return
    setCode(pre => Array.from(new Set([...pre, e.code])).length === pre.length ? pre : Array.from(new Set([...pre, e.code])))
  }

  const onKeyup = (e) => {
    if (props.enable === false) return
    setCode(pre => pre.filter(i => i !== e.code))
  }

  React.useEffect(() => {
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('keyup', onKeyup)

    return () => {
      window.removeEventListener('keydown', onKeydown)
      window.removeEventListener('keyup', onKeyup)
    }
  }, [props.enable])

  const r = { code }

  return r
}

const KeyboardRecord = (props) => { const state = useState(props); return props.children(state); }

const useKeyboardRecord = (props) => { const state = useState(props); return state; }

export { KeyboardRecord, useKeyboardRecord }