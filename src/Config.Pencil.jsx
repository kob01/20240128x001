import _2dLineV1 from './Config.Pencil.2d-Line-V1'
import _2dStraightLineV1 from './Config.Pencil.2d-StraightLine-V1'
import _2dRectangleV1 from './Config.Pencil.2d-Rectangle-V1'
import _2dSquareV1 from './Config.Pencil.2d-Square-V1'
import _2dCircleV1 from './Config.Pencil.2d-Circle-V1'

const r = []

r.push(_2dLineV1)
r.push(_2dStraightLineV1)
r.push(_2dRectangleV1)
r.push(_2dSquareV1)
r.push(_2dCircleV1)

const init = () => {
  const r_ = r.map(i => {
    return { ...i, setting: structuredClone(i.settingDefault) }
  })

  return r_
}

export default init