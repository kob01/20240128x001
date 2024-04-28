import React from 'react'

import ColorLensIcon from '@mui/icons-material/ColorLens'
import BookIcon from '@mui/icons-material/Book'

import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import SettingsIcon from '@mui/icons-material/Settings'
import LayersIcon from '@mui/icons-material/Layers'
import DrawIcon from '@mui/icons-material/Draw'
import LockIcon from '@mui/icons-material/Lock'

import GlobalPage from './View.Navigation.Map.GlobalPage'
import GlobalTheme from './View.Navigation.Map.GlobalTheme'
import GlobalSetting from './View.Navigation.Map.GlobalSetting'

import CanvasControl from './View.Navigation.Map.CanvasControl'
import CanvasLayers from './View.Navigation.Map.CanvasLayers'
import CanvasLayer from './View.Navigation.Map.CanvasLayer'
import CanvasOperations from './View.Navigation.Map.CanvasOperations'
import CanvasOperation from './View.Navigation.Map.CanvasOperation'
import CanvasPencils from './View.Navigation.Map.CanvasPencils'
import CanvasPencil from './View.Navigation.Map.CanvasPencil'
import CanvasView from './View.Navigation.Map.CanvasView'

const App = [
  { Component: GlobalPage, _hash: 'GlobalPage', summary: 'Page', page: '*', Icon: BookIcon },
  { Component: GlobalTheme, _hash: 'GlobalTheme', summary: 'Theme', page: '*', Icon: ColorLensIcon },
  { Component: GlobalSetting, _hash: 'GlobalSetting', summary: 'Setting', page: '*', Icon: SettingsIcon },

  { Component: CanvasControl, _hash: 'CanvasControl', summary: 'Control', page: 'Canvas', Icon: LockIcon },
  { Component: CanvasLayers, _hash: 'CanvasLayers', summary: 'Layers', page: 'Canvas', Icon: LayersIcon },
  { Component: CanvasLayer, _hash: 'CanvasLayer', summary: 'Layer', page: 'Canvas' },
  { Component: CanvasOperations, _hash: 'CanvasOperations', summary: 'Layer Operations', page: 'Canvas' },
  { Component: CanvasOperation, _hash: 'CanvasOperation', summary: 'Layer Operation', page: 'Canvas' },
  { Component: CanvasPencils, _hash: 'CanvasPencils', summary: 'Pencils', page: 'Canvas', Icon: DrawIcon },
  { Component: CanvasPencil, _hash: 'CanvasPencil', summary: 'Pencil', page: 'Canvas'},
  { Component: CanvasView, _hash: 'CanvasView', summary: 'View', page: 'Canvas', Icon: ViewCarouselIcon },
]

export default App