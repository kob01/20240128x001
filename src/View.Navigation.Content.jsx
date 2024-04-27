import React from 'react'

import IconButton from '@mui/material/IconButton'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'
import CloseIcon from '@mui/icons-material/Close'

import NavigationMap from './View.Navigation.Map'

import { useDragControl as useDragControlMouse } from './View.Component.DragControl.Mouse'
import { useDragControl as useDragControlTouch } from './View.Component.DragControl.Touch'

import { ImitationGlobal, ImitationNavigation, ImitationPageCanvas, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX, TooltipSXNavigation } from './utils.mui.sx'

import { throttleLastRAF } from './utils.common'

function NavigationRenderItem(props) {
  const accordionWindowsFind = ImitationNavigation.state.memo.accordionWindowsFind(props._hash)
  const accordionWindowsRefFind = ImitationNavigation.state.memo.accordionWindowsRefFind(props._hash)

  const content = NavigationMap.find(i => i._hash === accordionWindowsFind.accordionWindowsHash)

  const accordionWindowsFixTranslateThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationNavigation.state.function.accordionWindowsFixTranslate), [])

  const [transitionProperty, setTransitionProperty] = React.useState('background, box-shadow, opacity, transform')

  const style = React.useMemo(() => {
    if (accordionWindowsFind.load === true) {
      return {
        transform: `scale(1) translate(${accordionWindowsFind.translateX}px, ${accordionWindowsFind.translateY}px)`,
        opacity: 1
      }
    }
    if (accordionWindowsFind.load === false) {
      return {
        transform: `scale(0) translate(0px, 0px)`,
        opacity: 0
      }
    }
  }, [accordionWindowsFind.load, accordionWindowsFind.translateX, accordionWindowsFind.translateY])

  const onChangeDragControlMouse = (params) => {
    const status = params.status

    const changedX = params.changedX
    const changedY = params.changedY
    const continuedX = params.continuedX
    const continuedY = params.continuedY

    if (status === 'afterMove') {
      accordionWindowsFind.translateX = accordionWindowsFind.translateX + changedX
      accordionWindowsFind.translateY = accordionWindowsFind.translateY + changedY
      accordionWindowsFixTranslateThrottleLastRAF(accordionWindowsFind._hash)
    }

    if (status === 'afterEnd') {
      if (continuedX === 0 && continuedY === 0) {
        accordionWindowsFind.expand = !accordionWindowsFind.expand
        ImitationNavigation.state.function.update()
      }
    }

    if (status === 'afterStart') setTransitionProperty('background, box-shadow, opacity')
    if (status === 'afterEnd') setTransitionProperty('background, box-shadow, opacity, transform')
  }

  const { onMouseDown } = useDragControlMouse({ enable: true, onChange: onChangeDragControlMouse })

  const onChangeDragControlTouch = (params) => {
    const status = params.status

    const changedX = params.changedX[0]
    const changedY = params.changedY[0]
    const continuedX = params.continuedX[0]
    const continuedY = params.continuedY[0]

    if (status === 'afterMove') {
      accordionWindowsFind.translateX = accordionWindowsFind.translateX + changedX
      accordionWindowsFind.translateY = accordionWindowsFind.translateY + changedY
      accordionWindowsFixTranslateThrottleLastRAF(accordionWindowsFind._hash)
    }

    if (status === 'afterEnd') {
      if (continuedX === 0 && continuedY === 0) {
        accordionWindowsFind.expand = !accordionWindowsFind.expand
        ImitationNavigation.state.function.update()
      }
    }

    if (status === 'afterStart') setTransitionProperty('background, box-shadow, opacity')
    if (status === 'afterEnd') setTransitionProperty('background, box-shadow, opacity, transform')
  }

  const { onTouchStart } = useDragControlTouch({ enable: true, onChange: onChangeDragControlTouch })

  const onMouseDownAccordion = window.ontouchstart === undefined ? () => ImitationNavigation.state.function.accordionWindowsActive(accordionWindowsFind._hash) : null
  const onTouchStartAccordion = window.ontouchstart !== undefined ? () => ImitationNavigation.state.function.accordionWindowsActive(accordionWindowsFind._hash) : null

  React.useEffect(() => {
    if (ImitationGlobal.state.store.rect === undefined) return

    if (accordionWindowsFind.load === true) {
      accordionWindowsFixTranslateThrottleLastRAF(accordionWindowsFind._hash)
    }

    if (accordionWindowsFind.load === false) {
      if (ImitationNavigation.state.store.accordionWindow.length === 1 && (accordionWindowsFind.translateX === undefined && accordionWindowsFind.translateY === undefined)) {
        accordionWindowsFind.translateX = (accordionWindowsRefFind.accordionRef.offsetWidth - ImitationGlobal.state.store.rect.width + 32) / 2
        accordionWindowsFind.translateY = (accordionWindowsRefFind.accordionRef.offsetHeight - ImitationGlobal.state.store.rect.height + 32) / 2
        accordionWindowsFind.zIndex = 1
        accordionWindowsFind.load = true
      }
      if (ImitationNavigation.state.store.accordionWindow.length > 1 && (accordionWindowsFind.translateX === undefined && accordionWindowsFind.translateY === undefined && accordionWindowsFind.zIndex === undefined)) {
        const zIndexFind = ImitationNavigation.state.store.accordionWindow.filter(i => i._hash !== accordionWindowsFind._hash).reduce((t, i) => t.zIndex > i.zIndex ? t : i, { zIndex: 0 })
        const zIndexRefFind = ImitationNavigation.state.store.ref.accordionWindow.find(i => i.accordionWindowHash === zIndexFind._hash)

        const xAlignMax = (ImitationGlobal.state.store.rect.width - accordionWindowsRefFind.accordionRef.offsetWidth - 32) / 2
        const xAlignMin = (accordionWindowsRefFind.accordionRef.offsetWidth - ImitationGlobal.state.store.rect.width + 32) / 2
        const yAlignMax = (ImitationGlobal.state.store.rect.height - accordionWindowsRefFind.accordionRef.offsetHeight - 32) / 2
        const yAlignMin = (accordionWindowsRefFind.accordionRef.offsetHeight - ImitationGlobal.state.store.rect.height + 32) / 2

        const xAlignRight = zIndexFind.translateX - zIndexRefFind.accordionRef.offsetWidth / 2 + accordionWindowsRefFind.accordionRef.offsetWidth / 2 + 32
        const xAlignLeft = zIndexFind.translateX + zIndexRefFind.accordionRef.offsetWidth / 2 - accordionWindowsRefFind.accordionRef.offsetWidth / 2 - 32
        const yAlignBottom = zIndexFind.translateY - zIndexRefFind.accordionRef.offsetHeight / 2 + accordionWindowsRefFind.accordionRef.offsetHeight / 2 + 32
        const yAlignTop = zIndexFind.translateY + zIndexRefFind.accordionRef.offsetHeight / 2 - accordionWindowsRefFind.accordionRef.offsetHeight / 2 - 32

        if (xAlignLeft > xAlignMin) accordionWindowsFind.translateX = xAlignLeft
        if (xAlignRight < xAlignMax) accordionWindowsFind.translateX = xAlignRight
        if (yAlignTop > yAlignMin) accordionWindowsFind.translateY = yAlignTop
        if (yAlignBottom < yAlignMax) accordionWindowsFind.translateY = yAlignBottom

        if (accordionWindowsFind.translateX === undefined) accordionWindowsFind.translateX = 0
        if (accordionWindowsFind.translateY === undefined) accordionWindowsFind.translateY = 0

        accordionWindowsFind.zIndex = zIndexFind.zIndex + 1
        accordionWindowsFind.load = true
      }

      if (ImitationNavigation.state.store.accordionWindow.length > 1 && accordionWindowsFind.translateX !== undefined && accordionWindowsFind.translateY !== undefined && accordionWindowsFind.zIndex !== undefined) {
        accordionWindowsFind.load = true
      }

      accordionWindowsFixTranslateThrottleLastRAF(accordionWindowsFind._hash)
    }
  }, [ImitationGlobal.state.store.rect])

  React.useEffect(() => {
    if (content.page !== '*' && content.page !== ImitationGlobal.state.store.page && content.page.includes(ImitationGlobal.state.store.page) === false) {
      ImitationNavigation.state.function.accordionWindowsRemove(props._hash)
    }
  }, [ImitationGlobal.state.store.page])

  React.useEffect(() => {
    if (accordionWindowsFind.hide === true) {
      ImitationNavigation.state.function.accordionWindowsRemove(props._hash)
    }
  }, [accordionWindowsFind.hide])

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      accordionWindowsFixTranslateThrottleLastRAF(accordionWindowsFind._hash)
    })

    resizeObserver.observe(accordionWindowsRefFind.accordionRef)

    return () => resizeObserver.disconnect()
  }, [])

  React.useEffect(() => {
    const event = e => e.preventDefault()

    accordionWindowsRefFind.accordionSummaryRef.addEventListener('touchmove', event)

    return () => {
      if (accordionWindowsRefFind.accordionSummaryRef) {
        accordionWindowsRefFind.accordionSummaryRef.removeEventListener('touchmove', event)
      }
    }
  }, [])

  return <Accordion {...AccordionSX()} style={{ width: 320, maxWidth: ImitationGlobal.state.store.rect.width - 32, height: 'fit-content', maxHeight: ImitationGlobal.state.store.rect.height - 96, overflowY: 'auto', position: 'absolute', zIndex: accordionWindowsFind.zIndex, transitionProperty: transitionProperty, transitionDuration: '1s', ...style }} expanded={accordionWindowsFind.expand} onMouseDown={onMouseDownAccordion} onTouchStart={onTouchStartAccordion} ref={el => accordionWindowsRefFind.accordionRef = el}>
    <AccordionSummary
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      expandIcon={
        <IconButton onClick={() => ImitationNavigation.state.function.accordionWindowsRemove(props._hash)} onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()}>
          <CloseIcon color='primary' />
        </IconButton>
      }
      children={
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 0, marginRight: 8, width: accordionWindowsFind.expand ? 0 : 24, transition: '1s all' }}>
            <ChangeHistoryIcon style={{ position: 'absolute', transform: `scale(${accordionWindowsFind.expand ? 0 : 1})`, transition: '1s all' }} />
            <ChangeHistoryIcon style={{ position: 'absolute', transform: `scale(${accordionWindowsFind.expand ? 0 : 1}) rotate(180deg)`, transition: '1s all' }} />
          </div>
          <div >{content.summary} {accordionWindowsFind.zIndex}</div>
        </div>
      }
      ref={el => accordionWindowsRefFind.accordionSummaryRef = el}
    />

    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Divider {...DividerSX()} style={{ width: accordionWindowsFind.expand ? 'calc(100% -  32px)' : 0, transition: '1s all' }} />
      <ChangeHistoryIcon fontSize='small' style={{ position: 'absolute', transform: `scale(${accordionWindowsFind.expand ? 1 : 0}) rotate(180deg)`, transition: '1s all' }} />
    </div>

    <AccordionDetails
      style={{ fontSize: 12, overflowX: 'hidden' }}
      children={
        <>
          {
            content.page === 'Canvas' && ImitationPageCanvas.state.store.source === undefined ?
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size={24} color='primary' style={{ margin: 'auto' }} />
              </div>
              : null
          }
          {
            content.page !== 'Canvas' || ImitationPageCanvas.state.store.source !== undefined ?
              <content.Component accordionWindowsHash={accordionWindowsFind._hash} />
              : null
          }
        </>
      }
    />

    {/* <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
      <Divider {...DividerSX()} style={{ width: accordionWindowsFind.expand ? 'calc(100% -  32px)' : 0, transition: '1s all' }} />
      <ChangeHistoryIcon fontSize='small' style={{ position: 'absolute', transform: `scale(${accordionWindowsFind.expand ? 1 : 0})`, transition: '1s all' }} />
    </div> */}
  </Accordion>
}

function NavigationRenderItemMemo(props) {
  const accordionWindowsFind = ImitationNavigation.state.memo.accordionWindowsFind(props._hash)

  const render = React.useMemo(
    () => {
      return <NavigationRenderItem {...props} />
    },
    [
      ...Object.values(accordionWindowsFind),
      ImitationGlobal.state.store.rect,
      ImitationGlobal.state.store.page,
      ...Object.values(ImitationGlobal.state.store.theme.palette).map(i => i.main)
    ]
  )

  return render
}

function App() {
  return <div style={{ position: 'absolute', zIndex: 900, width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0, margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {
      ImitationNavigation.state.store.accordionWindow.map((i => <NavigationRenderItemMemo key={i._hash} {...i} />))
    }
  </div>
}

const dependence = [
  { instance: ImitationNavigation, dependence: state => [ImitationNavigation.state.update.accordionWindow] },
  { instance: ImitationGlobal, dependence: state => [ImitationGlobal.state.store.rect, ImitationGlobal.state.store.recting, ImitationGlobal.state.store.page] },
  { instance: ImitationPageCanvas, dependence: state => [ImitationPageCanvas.state.store.source] },
]

export default withBindComponentPure(App, dependence)