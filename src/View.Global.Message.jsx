import React from 'react'

import Snackbar from '@mui/material/Snackbar'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

function App() {
  const ref = React.useRef()

  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {

    if (ref.current) clearTimeout(ref.current)

    if (ImitationGlobal.state.store.message !== '') ref.current = setTimeout(() => { ImitationGlobal.state.store.message = ''; ImitationGlobal.state.function.update(); setOpen(false); ref.current = null }, 1500)

    if (ImitationGlobal.state.store.message !== '') setOpen(true)

    if (ImitationGlobal.state.store.message === '') setOpen(false)

  }, [ImitationGlobal.state.store.message])

  return <Snackbar open={open} message={ImitationGlobal.state.store.message} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
}

const dependence = [{ instance: ImitationGlobal, dependence: state => [state.store.message] }]

export default withBindComponentPure(App, dependence)