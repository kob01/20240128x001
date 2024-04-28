import React from 'react'

import { useClickAwayListener } from './View.Component.ClickAwayListener'

const useState = (props) => {
  const [open, setOpen] = React.useState(false)

  const onClick = (params) => {
    if (props.onClick) props.onClick({ ...params, open, setOpen })
  }

  const { pushClickAwayRef } = useClickAwayListener({ onClick })

  return { open, setOpen, pushClickAwayRef }
}

const ClickAwayListenerIfOpen = (props) => { const state = useState(props); return props.children(state); }

const useClickAwayListenerIfOpen = (props) => { const state = useState(props); return state; }

export { ClickAwayListenerIfOpen, useClickAwayListenerIfOpen }