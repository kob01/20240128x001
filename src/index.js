import React from 'react'
import ReactDOM from 'react-dom'

import App from './View.App'

import { ImitationGlobal } from './Imitation'

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
    `body { padding: 0; margin: 0; font-size: 14px; transition: 1s all; }`,
    `body * { font-weight: bold !important; font-family: monospace !important; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }`,
    `img { pointer-events: none; }`,
    `body, body * { overscroll-behavior: none; }`
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

ImitationGlobal.register(styleAppendII, state => [...Object.values(ImitationGlobal.state.store.theme.palette).map(i => i.main)])

window.addEventListener('wheel', (e) => { if (e.ctrlKey) e.preventDefault() }, { passive: false })
window.addEventListener('touchmove', (e) => { if (e.touches.length > 1) e.preventDefault() }, { passive: false })
window.addEventListener('contextmenu', e => e.preventDefault(), { passive: false })


if (new URLSearchParams(new URL(window.location.href).search).get('vconsole')) {
  const vconsole = document.createElement('script')
  vconsole.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js'
  vconsole.onload = () => new window.VConsole()
  document.head.appendChild(vconsole)
}

if (new URLSearchParams(new URL(window.location.href).search).get('router')) {
  ImitationGlobal.state.store.page = new URLSearchParams(new URL(window.location.href).search).get('router')
}


ReactDOM.render(<App />, document.getElementById('root'))