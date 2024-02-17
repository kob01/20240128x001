import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import SaveIcon from '@mui/icons-material/Save'
import DoneIcon from '@mui/icons-material/Done'
import SendIcon from '@mui/icons-material/Send'

import Imitation from './utils.imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX } from './utils.mui.sx'

import { Color, Alpha } from './View.Config.Paint.Component'

const r = []

const linePaint = () => {
  const ref = { inConfig: false }

  return (canvasRef, paintSetting, status, x, y) => {
    if (status === 0 || status === 1) {
      if (ref.inConfig === false) {
        ref.inConfig = true
        canvasRef.context.save()
        canvasRef.context.globalAlpha = paintSetting.alpha
        canvasRef.context.lineWidth = 1
        canvasRef.context.lineCap = 'round'
        canvasRef.context.strokeStyle = paintSetting.color
        canvasRef.context.beginPath()
        canvasRef.context.moveTo(x, y)
      }
    }
    if (status === 1) {
      canvasRef.context.lineTo(x, y)
      canvasRef.context.stroke()
    }
    if (status === 2) {
      if (ref.inConfig === true) {
        ref.inConfig = false
        canvasRef.context.restore()
      }
    }
  }
}

const lineSetting = [Color, Alpha]

const lineDefault = { color: '#000000', alpha: 1 }

const line = { _hash: 0, label: 'Line', paint: linePaint, setting: lineSetting, default: lineDefault }

r.push(line)

export default r