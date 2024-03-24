import React from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import Message from './View.Global.Message'
import Loading from './View.Global.Loading'
import Page from './View.Page'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

function App() {
  return <ThemeProvider theme={createTheme(ImitationGlobal.state.store.theme)}>
    <Loading />
    <Message />
    <Page />
  </ThemeProvider>
}

const dependence = [{ instance: ImitationGlobal, dependence: state => [...Object.values(state.store.theme.palette).map(i => i.main)] }]

export default withBindComponentPure(App, dependence)