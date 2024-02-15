const r = []

const linePaint = () => {
  const ref = {}

  return (canvasRef, paintSetting, status, x, y) => {
    if (status === 'afterStart') {
      canvasRef.context.globalAlpha = paintSetting.alpha
      canvasRef.context.lineWidth = 1
      canvasRef.context.lineCap = 'round'
      canvasRef.context.strokeStyle = paintSetting.color
      canvasRef.context.beginPath()
      canvasRef.context.moveTo(x, y)
    }
    if (status === 'afterMove') {
      canvasRef.context.lineTo(x, y)
      canvasRef.context.stroke()
    }
  }
}

const line = { _hash: 0, label: 'Line', paint: linePaint }

r.push(line)

export { line }

export default r