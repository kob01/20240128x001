const hash = (n = 16, l = 1) => {
  return new Array(l).fill(undefined).map(i => Array.from(Array(n), () => Math.floor(Math.random() * 36).toString(36)).join('')).join('-').toUpperCase()
}

const requestIdleCallbackProcess = async (process) => {
  const r = await new Promise(r => {
    const loop = async () => {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(async idle => {
          while (idle.timeRemaining() > 2 && process.done === false) await process.next()
          if (process.done === false) loop()
          if (process.done === true) r()
        })
      }
      if (!window.requestIdleCallback) {
        while (process.done === false) await process.next()
        if (process.done === false) loop()
        if (process.done === true) r()
      }
    }

    loop()
  })

  return r
}

const getResizePageRate = () => {
  const base = window.ontouchstart === undefined ? 1200 : 800

  const rate = Math.min(window.innerWidth / base, window.innerHeight / base, 1)

  return rate
}

const resizePage = () => {
  const base = window.ontouchstart === undefined ? 1200 : 800

  const rate = Math.min(window.innerWidth / base, window.innerHeight / base, 1)

  const body = document.getElementsByTagName('body')[0]

  body.style.width = window.innerWidth / rate + 'px'
  body.style.height = window.innerHeight / rate + 'px'
  body.style.position = 'absolute'
  body.style.left = (window.innerWidth / rate - window.innerWidth) / 2 * -1 + 'px'
  body.style.top = (window.innerHeight / rate - window.innerHeight) / 2 * -1 + 'px'
  body.style.transform = `scale(${rate})`
  body.style.transformOrigin = `center center`
  body.style.transition = '0.5s transform'
}

export { hash, requestIdleCallbackProcess, getResizePageRate, resizePage }
