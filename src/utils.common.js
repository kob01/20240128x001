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

  return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => fn(...args), time); }
}

const fixed = (number) => {
  return Number(Number(number).toFixed())
}

const canvasDrawImageCenter = (canvas, context, image) => {
  var sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight

  if (canvas.width > image.width) {
    sx = (canvas.width - image.width) / 2
    sWidth = image.width
    dx = 0
    dWidth = image.width
  }

  if (canvas.width === image.width) {
    sx = 0
    sWidth = image.width
    dx = 0
    dWidth = image.width
  }

  if (canvas.width < image.width) {
    sx = 0
    sWidth = canvas.width + image.width / 2
    dx = (image.width - canvas.width) / 2
    dWidth = canvas.width + image.width / 2
  }

  if (canvas.height > image.height) {
    sy = (canvas.height - image.height) / 2
    sHeight = image.height
    dy = 0
    dHeight = image.height
  }

  if (canvas.height === image.height) {
    sy = 0
    sHeight = image.height
    dy = 0
    dHeight = image.height
  }

  if (canvas.height < image.height) {
    sy = 0
    sHeight = canvas.height + image.height / 2
    dy = (image.height - canvas.height) / 2
    dHeight = canvas.height + image.height / 2
  }

  context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
}

export { hash, rgba, throttle, fixed, canvasDrawImageCenter }
