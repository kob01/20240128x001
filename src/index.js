import React from 'react'
import ReactDOM from 'react-dom'

import App from './View.App'

import { ImitationGlobal } from './Imitation'

import './index.dev'

import icon from '../static/icon.png'

const link = document.createElement('link')
link.rel = 'icon'
link.href = icon
document.head.append(link)

const styleAppendI = () => {
  const id = '*'

  const style = document.getElementById(id) || document.createElement('style')

  const styleString = [
    `svg { -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }`,
    `::-webkit-scrollbar { width: 0; height: 0; }`,
    `body { padding: 0; margin: 0; font-size: 14px; }`,
    `body * { font-weight: bold !important; font-family: monospace !important; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }`,
    `img { pointer-events: none; }`,
    `body { overscroll-behavior: none; }`,
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
    `body { background: ${ImitationGlobal.state.store.theme.palette.background.main}; color: ${ImitationGlobal.state.store.theme.palette.primary.main}; }`,
  ].join(' ')

  style.id = id
  style.innerHTML = styleString

  if (style.parentNode) style.parentNode.removeChild(style)

  document.head.appendChild(style)
}

styleAppendII()

ImitationGlobal.register(styleAppendII, state => [...Object.values(state.store.theme.palette).map(i => i.main)])

document.addEventListener('wheel', e => { if (e.wheelDelta === 240 || e.wheelDelta === -240) e.preventDefault() }, { passive: false })
// document.addEventListener('touchstart', e => e.preventDefault(), { passive: false})
// document.addEventListener('touchmove', e => e.preventDefault(), { passive: false })
document.addEventListener('contextmenu', e => e.preventDefault(), { passive: false })

ReactDOM.render(<App />, document.getElementById('root'))