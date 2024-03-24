import React from 'react'

import Button from '@mui/material/Button'

import { ImitationPageLibrary } from './Imitation'

import { hash } from './utils.common'

function App() {
  const styleButton = { padding: 0, width: 36, height: 36, minWidth: 'auto', flexShrink: 0, margin: 2 }

  const sourceArray = ImitationPageLibrary.state.store.source
  const sourceLength = ImitationPageLibrary.state.store.source.length

  const sourceFindFirst = ImitationPageLibrary.state.memo.sourceFind(ImitationPageLibrary.state.store.render[0].hashSource)
  const sourceFindIndexFirst = ImitationPageLibrary.state.memo.sourceFindIndex(ImitationPageLibrary.state.store.render[0].hashSource)

  const sourceArrayMap = sourceArray.map((i, index) => ({ ...i, index: index }))
  const sourceArraySort = [...sourceArrayMap.slice(sourceFindIndexFirst + 1, sourceLength), ...sourceArrayMap.slice(0, sourceFindIndexFirst)]

  const max = 4
  const previous = sourceArraySort.slice(-max)
  const next = sourceArraySort.slice(0, max)

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
    {
      previous.map((i, index) => {
        return <Button key={index} variant='text' style={{ ...styleButton }} onClick={() => ImitationPageLibrary.state.function.onSwitch({ hashSource: i._hash, direction: 0 })}>{String(Number(i.index) + 1).padStart(2, '0')}</Button>
      })
    }

    <Button variant='contained' style={{ ...styleButton }} color='primary' onClick={() => ImitationPageLibrary.state.function.onSwitch({ hashSource: sourceFindFirst._hash, direction: 2 })}>{String(Number(sourceFindIndexFirst) + 1).padStart(2, '0')}</Button>

    {
      next.map((i, index) => {
        return <Button key={index} variant='text' style={{ ...styleButton }} onClick={() => ImitationPageLibrary.state.function.onSwitch({ hashSource: i._hash, direction: 1 })}>{String(Number(i.index) + 1).padStart(2, '0')}</Button>
      })
    }
  </div>

}

export default App