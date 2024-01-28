import React from 'react'

import Snackbar from '@mui/material/Snackbar'

import Imitation from './utils.imitation'

function App() {
  const ref = React.useRef()

  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {

    if (ref.current) clearTimeout(ref.current)

    if (Imitation.state.loading !== '') ref.current = setTimeout(() => { Imitation.assignState({ message: '' }); setOpen(false); ref.current = null }, 1500)

    if (Imitation.state.loading === '') setOpen(false)

  }, [Imitation.state.message])

  return <Snackbar open={open} message={Imitation.state.message} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
}

export default Imitation.withBindRender(App, state => [state.message])