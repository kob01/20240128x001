import { ImitationGlobal } from './Imitation'

if (new URLSearchParams(new URL(window.location.href).search).get('vconsole')) {
    const vconsole = document.createElement('script')
    vconsole.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js'
    vconsole.onload = () => new window.VConsole()
    document.head.appendChild(vconsole)
}

if (new URLSearchParams(new URL(window.location.href).search).get('router')) {
  ImitationGlobal.state.store.page = new URLSearchParams(new URL(window.location.href).search).get('router')
}
