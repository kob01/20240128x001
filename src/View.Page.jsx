import React from 'react'

import PageLibrary from './View.Page.Library'
import PageCanvas from './View.Page.Canvas'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

function App() {
  return <>

    {
      ImitationGlobal.state.store.page === 'Library' ? <PageLibrary /> : null
    }

    {
      ImitationGlobal.state.store.page === 'Canvas' ? <PageCanvas /> : null
    }

  </>
}

const dependence = [{ instance: ImitationGlobal, dependence: state => [state.store.page] }]

export default withBindComponentPure(App, dependence)