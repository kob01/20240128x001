import React from 'react'
import ReactDOM from 'react-dom'

import App from './View.App'

import Imitation from './utils.imitation'

import icon from '../static/icon.png'

const link = document.createElement('link')
link.rel = 'icon'
link.href = icon
document.head.append(link)

document.body.addEventListener('touchmove', e => e.preventDefault(), { passive: false })
document.body.addEventListener('contextmenu', e => e.preventDefault(), { passive: false })

const styleAppendI = () => {
  const id = '*'

  const style = document.getElementById(id) || document.createElement('style')

  const styleString = [
    `::-webkit-scrollbar { width: 0; height: 0; }`,
    `body { padding: 0; margin: 0; font-size: 14px; }`,
    `body * { font-weight: bold !important; font-family: monospace !important; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }`,
    `img { pointer-events: none; }`,
    `.MuiBackdrop-root { background: none !important; }`,
  ].join(' ')

  style.id = id
  style.innerHTML = styleString

  if (style.parentNode) style.parentNode.removeChild(style)

  document.head.appendChild(style)
}

styleAppendI()

const styleAppendII = () => {
  const id = '**'

  const style = document.getElementById(id) || document.createElement('style')

  const styleString = [
    `body { background: ${Imitation.state.theme.palette.background.main}; color: ${Imitation.state.theme.palette.primary.main}; }`,
  ].join(' ')

  style.id = id
  style.innerHTML = styleString

  if (style.parentNode) style.parentNode.removeChild(style)

  document.head.appendChild(style)
}

styleAppendII()

Imitation.register(styleAppendII, state => JSON.stringify(state.theme))

ReactDOM.render(<App />, document.getElementById('root'))