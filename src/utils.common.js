const hash = (n = 16, l = 1) => {
  return new Array(l).fill(undefined).map(i => Array.from(Array(n), () => Math.floor(Math.random() * 36).toString(36)).join('')).join('-').toUpperCase()
}

const rgbaSpilt = (rgba) => {
  const rgbRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d\.]+)\)$/
  const match = rgba.match(rgbRegex)

  const r = match[1]
  const g = match[2]
  const b = match[3]
  const a = match[4]

  return { r, g, b, a }
}

const rgbaReplaceAlpha = (rgb, alpha) => {
  const rgbRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d\.]+)\)$/
  const match = rgb.match(rgbRegex)

  const r = match[1]
  const g = match[2]
  const b = match[3]
  const a = match[4]

  const rgbaString = `rgba(${r}, ${g}, ${b}, ${alpha})`

  return rgbaString
}

const debounce = (fn, time) => {
  var ref

  return (...args) => { clearTimeout(ref); ref = setTimeout(() => fn(...args), time); }
}

const throttleLastRIC = (fn) => {
  var ref

  return (...args) => { ref = () => fn(...args); requestAnimationFrame(ref); }
}

const fixed = (number) => {
  return Number(Number(number).toFixed())
}

const range = (target, min, max) => {
  if (target < min) return min
  if (target > max) return max
  return target
}

const caculatePositionCenter = (wrapper, target, offset) => {
  var sx, sy, swidth, sheight, x, y, width, height
  var ox = offset.x
  var oy = offset.y
  var dx, dsx, dy, dsy

  x = Math.max((wrapper.width - target.width) / 2, 0)
  sx = Math.max((target.width - wrapper.width) / 2, 0)

  if (ox < 0) dx = Math.max((wrapper.width - target.width) / 2, 0) + ox
  if (dx < 0) x = 0
  if (dx < 0) sx = sx - dx

  if (ox > 0) dsx = Math.max((target.width - wrapper.width) / 2, 0) - ox
  if (dsx < 0) sx = 0
  if (dsx < 0) x = x - dsx

  y = Math.max((wrapper.height - target.height) / 2, 0)
  sy = Math.max((target.height - wrapper.height) / 2, 0)

  if (oy < 0) dy = Math.max((wrapper.width - target.width) / 2, 0) + oy
  if (dy < 0) y = 0
  if (dy < 0) sy = sy - dy

  if (oy > 0) dsy = Math.max((target.width - wrapper.width) / 2, 0) - oy
  if (dsy < 0) sy = 0
  if (dsy < 0) y = y - dsy

  swidth = Math.max(wrapper.width - x, target.width - sx)
  sheight = Math.max(wrapper.height - y, target.height - sy)

  width = swidth
  height = sheight

  if (x < 0 || x > wrapper.width || x === wrapper.width) return
  if (y < 0 || y > wrapper.height || y === wrapper.height) return
  if (sx < 0 || sx > target.width || sx === target.width) return
  if (sy < 0 || sy > target.height || sy === target.height) return

  return [sx, sy, swidth, sheight, x, y, width, height]
}

export { hash, rgbaSpilt, rgbaReplaceAlpha, debounce, throttleLastRIC, fixed, range, caculatePositionCenter }
