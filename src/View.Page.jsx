import React from 'react'

import PageLibrary from './View.Page.Library'
import PageCanvas from './View.Page.Canvas'

import { ImitationGlobal, withBindComponentPure } from './Imitation'

function App() {
  const ref = React.useRef()

  React.useEffect(() => {
    const event = e => e.preventDefault()

    ref.current.addEventListener('touchmove', event)

    return () => {
      ref.current.removeEventListener('touchmove', event)
    }
  }, [])

  return <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }} ref={el => ref.current = el}>

    {
      ImitationGlobal.state.store.page === 'Library' ? <PageLibrary /> : null
    }

    {
      ImitationGlobal.state.store.page === 'Canvas' ? <PageCanvas /> : null
    }

  </div>
}

const dependence = [
  { instance: ImitationGlobal, dependence: state => [ImitationGlobal.state.store.page] }
]

export default withBindComponentPure(App, dependence)