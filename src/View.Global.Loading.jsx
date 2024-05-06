import React from 'react'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

function App() {
  const ref = React.useRef()

  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {

    if (ref.current) clearTimeout(ref.current)

    if (ImitationGlobal.state.store.loading !== 0) setOpen(!open)

    if (ImitationGlobal.state.store.loading === 0) ref.current = setTimeout(() => { setOpen(false); ref.current = null }, 500)

  }, [ImitationGlobal.state.store.loading])

  return <Backdrop open={open} style={{ zIndex: 10000, background: 'none' }}>
    <CircularProgress color='primary' />
  </Backdrop >
}

const dependence = [{ instance: ImitationGlobal, dependence: state => [ImitationGlobal.state.store.loading] }]

export default withBindComponentPure(App, dependence)