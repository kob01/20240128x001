import React from 'react'

import Snackbar from '@mui/material/Snackbar'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

import { hash } from './utils.common'

function App() {
  
  const ref = React.useRef([])

  React.useEffect(() => {
    ImitationGlobal.state.store.message.forEach(i => {
      if (ref.current.find(i_ => i_.messsageHash === i._hash) === undefined) {
        const timeHash = hash()

        const r = {
          _hash: timeHash,
          messsageHash: i._hash,
          timeout: setTimeout(() => { ImitationGlobal.state.function.messageRemove(i._hash); ref.current = ref.current.filter(i => i._hash !== timeHash); }, 2500)
        }

        ref.current.push(r)
      }
    })
  }, [ImitationGlobal.state.store.message])

  React.useEffect(() => {
    return () => ref.current.forEach(i => clearTimeout(i))
  }, [])

  return ImitationGlobal.state.store.message.map(((i, index) => {
    return <Snackbar key={i._hash} open={true} message={i.message} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} style={{ top: 32 + index * 64, transition: '1s all' }} />
  }))
}

const dependence = [{ instance: ImitationGlobal, dependence: state => [ImitationGlobal.state.store.message] }]

export default withBindComponentPure(App, dependence)