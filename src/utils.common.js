const hash = (n = 16, l = 1) => {
  return new Array(l).fill(undefined).map(i => Array.from(Array(n), () => Math.floor(Math.random() * 36).toString(36)).join('')).join('-').toUpperCase()
}

const rgba = (rgb, a) => {
  const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/
  const match = rgb.match(rgbRegex)

  const r = match[1]
  const g = match[2]
  const b = match[3]

  const rgbaString = `rgba(${r}, ${g}, ${b}, ${a})`

  return rgbaString
}

const throttle = (fn, time) => {
  var timeout

  return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => fn(args), time); }
}

const fixed = (number) => {
  return Number(Number(number).toFixed())
}

export { hash, rgba, throttle, fixed }
