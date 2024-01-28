import React from 'react'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import Imitation from './utils.imitation'

function App() {
  const ref = React.useRef()

  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {

    if (ref.current) clearTimeout(ref.current)

    if (Imitation.state.loading !== 0) setOpen(true)

    if (Imitation.state.loading === 0) ref.current = setTimeout(() => { setOpen(false); ref.current = null }, 500)

  }, [Imitation.state.loading])

  return <Backdrop open={open} style={{ zIndex: 10000 }}><CircularProgress color='primary' /></Backdrop>
}

export default Imitation.withBindRender(App, state => [state.loading])