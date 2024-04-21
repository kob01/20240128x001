import _2dLineV1 from './View.Config.Pencil.2d-Line-V1'
import _2dStraightLineV1 from './View.Config.Pencil.2d-StraightLine-V1'
import _2dRectangleV1 from './View.Config.Pencil.2d-Rectangle-V1'

const r = []

r.push(_2dLineV1)
r.push(_2dStraightLineV1)
r.push(_2dRectangleV1)

const init = () => {
  const r_ = r.map(i => {
    return { ...i, setting: structuredClone(i.settingDefault) }
  })

  return r_
}

export default init