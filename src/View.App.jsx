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

export default withBindComponentPure(App, [{ instance: ImitationGlobal, dependence: state => [JSON.stringify(state.store.theme)] }])