import React from 'react'

import ColorLensIcon from '@mui/icons-material/ColorLens'
import PagesIcon from '@mui/icons-material/Pages'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import SettingsIcon from '@mui/icons-material/Settings'
import LayersIcon from '@mui/icons-material/Layers'
import DrawIcon from '@mui/icons-material/Draw'
import LockIcon from '@mui/icons-material/Lock'

import GlobalPage from './View.Navigation.Map.GlobalPage'
import GlobalTheme from './View.Navigation.Map.GlobalTheme'

import CanvasControl from './View.Navigation.Map.CanvasControl'
import CanvasAction from './View.Navigation.Map.CanvasAction'
import CanvasLayers from './View.Navigation.Map.CanvasLayers'
import CanvasLayer from './View.Navigation.Map.CanvasLayer'
import CanvasPaints from './View.Navigation.Map.CanvasPaints'
import CanvasPaint from './View.Navigation.Map.CanvasPaint'
import CanvasView from './View.Navigation.Map.CanvasView'

const App = [
  { Component: GlobalPage, _hash: 'GlobalPage', summary: 'Page', page: '*', Icon: PagesIcon },
  { Component: GlobalTheme, _hash: 'GlobalTheme', summary: 'Theme', page: '*', Icon: ColorLensIcon },

  { Component: CanvasAction, _hash: 'CanvasAction', summary: 'Setting', page: 'Canvas', Icon: SettingsIcon },
  { Component: CanvasControl, _hash: 'CanvasControl', summary: 'Control', page: 'Canvas', Icon: LockIcon },
  { Component: CanvasLayers, _hash: 'CanvasLayers', summary: 'Layers', page: 'Canvas', Icon: LayersIcon },
  { Component: CanvasLayer, _hash: 'CanvasLayer', summary: 'Layer', page: 'Canvas' },
  { Component: CanvasPaints, _hash: 'CanvasPaints', summary: 'Paints', page: 'Canvas', Icon: DrawIcon },
  { Component: CanvasPaint, _hash: 'CanvasPaint', summary: 'Paint', page: 'Canvas'},
  { Component: CanvasView, _hash: 'CanvasView', summary: 'View', page: 'Canvas', Icon: ViewCarouselIcon },
]

export default App