import React from 'react'

import IconButton from '@mui/material/IconButton'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Divider from '@mui/material/Divider'

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'
import CloseIcon from '@mui/icons-material/Close'

import NavigationMap from './View.Navigation.Map'

import { useDragControl as useDragControlMouse } from './View.Component.DragControl.Mouse'
import { useDragControl as useDragControlTouch } from './View.Component.DragControl.Touch'

import { ImitationGlobal, ImitationNavigation, withBindComponentPure } from './Imitation'

import { DialogSX, TextFieldSX, TabsSX, DividerSX, SwitchSX, SelectSX, DrawerSX, AccordionSX, PaperSX, TooltipSX, TooltipSXNavigation } from './utils.mui.sx'

import { throttleLastRAF } from './utils.common'

function NavigationRenderItem(props) {
  const renderWindowsFind = ImitationNavigation.state.memo.renderWindowsFind(props._hash)

  const content = NavigationMap.find(i => i._hash === renderWindowsFind.renderWindowsHash)

  const renderWindowsFixTranslateThrottleLastRAF = React.useCallback(throttleLastRAF(ImitationNavigation.state.function.renderWindowsFixTranslate), [])

  const [expand, setExpand] = React.useState(true)

  const [transitionProperty, setTransitionProperty] = React.useState('background, box-shadow, opacity, transform')

  const style = React.useMemo(() => {
    if (renderWindowsFind.load === true) {
      return {
        transform: `scale(1) translate(${renderWindowsFind.translateX}px, ${renderWindowsFind.translateY}px)`,
        opacity: 1
      }
    }
    if (renderWindowsFind.load === false) {
      return {
        transform: `scale(0) translate(0px, 0px)`,
        opacity: 0
      }
    }
  }, [renderWindowsFind.load, renderWindowsFind.translateX, renderWindowsFind.translateY])

  const onChangeDragControlMouse = (params) => {
    const status = params.status

    const changedX = params.changedX
    const changedY = params.changedY
    const continuedX = params.continuedX
    const continuedY = params.continuedY

    if (status === 'afterMove') {
      renderWindowsFind.translateX = renderWindowsFind.translateX + changedX
      renderWindowsFind.translateY = renderWindowsFind.translateY + changedY
      renderWindowsFixTranslateThrottleLastRAF(renderWindowsFind._hash)
    }

    if (status === 'afterEnd') {
      if (continuedX === 0 && continuedY === 0) setExpand(!expand)
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
      renderWindowsFind.translateX = renderWindowsFind.translateX + changedX
      renderWindowsFind.translateY = renderWindowsFind.translateY + changedY
      renderWindowsFixTranslateThrottleLastRAF(renderWindowsFind._hash)
    }

    if (status === 'afterEnd') {
      if (continuedX === 0 && continuedY === 0) setExpand(!expand)
    }

    if (status === 'afterStart') setTransitionProperty('background, box-shadow, opacity')
    if (status === 'afterEnd') setTransitionProperty('background, box-shadow, opacity, transform')
  }

  const { onTouchStart } = useDragControlTouch({ enable: true, onChange: onChangeDragControlTouch })

  const onMouseDownAccordion = window.ontouchstart === undefined ? () => ImitationNavigation.state.function.renderWindowsActive(renderWindowsFind._hash) : null
  const onTouchStartAccordion = window.ontouchstart !== undefined ? () => ImitationNavigation.state.function.renderWindowsActive(renderWindowsFind._hash) : null

  React.useEffect(() => {
    if (ImitationGlobal.state.store.rect === undefined) return

    if (renderWindowsFind.load === true) {
      renderWindowsFixTranslateThrottleLastRAF(renderWindowsFind._hash)
    }

    if (renderWindowsFind.load === false) {
      if (ImitationNavigation.state.store.renderWindow.length === 1) {
        renderWindowsFind.translateX = (renderWindowsFind.accordionRef.offsetWidth - ImitationGlobal.state.store.rect.width + 32) / 2
        renderWindowsFind.translateY = (renderWindowsFind.accordionRef.offsetHeight - ImitationGlobal.state.store.rect.height + 32) / 2
        renderWindowsFind.zIndex = 1
        renderWindowsFind.load = true
      }
      if (ImitationNavigation.state.store.renderWindow.length > 1) {
        const zIndexFind = ImitationNavigation.state.store.renderWindow.filter(i => i._hash !== renderWindowsFind._hash).reduce((t, i) => t.zIndex > i.zIndex ? t : i, { zIndex: 0 })

        const xAlignMax = (ImitationGlobal.state.store.rect.width - renderWindowsFind.accordionRef.offsetWidth - 32) / 2
        const xAlignMin = (renderWindowsFind.accordionRef.offsetWidth - ImitationGlobal.state.store.rect.width + 32) / 2
        const yAlignMax = (ImitationGlobal.state.store.rect.height - renderWindowsFind.accordionRef.offsetHeight - 32) / 2
        const yAlignMin = (renderWindowsFind.accordionRef.offsetHeight - ImitationGlobal.state.store.rect.height + 32) / 2

        const xAlignRight = zIndexFind.translateX - zIndexFind.accordionRef.offsetWidth / 2 + renderWindowsFind.accordionRef.offsetWidth / 2 + 32
        const xAlignLeft = zIndexFind.translateX + zIndexFind.accordionRef.offsetWidth / 2 - renderWindowsFind.accordionRef.offsetWidth / 2 - 32
        const yAlignBottom = zIndexFind.translateY - zIndexFind.accordionRef.offsetHeight / 2 + renderWindowsFind.accordionRef.offsetHeight / 2 + 32
        const yAlignTop = zIndexFind.translateY + zIndexFind.accordionRef.offsetHeight / 2 - renderWindowsFind.accordionRef.offsetHeight / 2 - 32

        if (xAlignLeft > xAlignMin) renderWindowsFind.translateX = xAlignLeft
        if (xAlignRight < xAlignMax) renderWindowsFind.translateX = xAlignRight
        if (yAlignTop > yAlignMin) renderWindowsFind.translateY = yAlignTop
        if (yAlignBottom < yAlignMax) renderWindowsFind.translateY = yAlignBottom

        if (renderWindowsFind.translateX === undefined) renderWindowsFind.translateX = 0
        if (renderWindowsFind.translateY === undefined) renderWindowsFind.translateY = 0

        renderWindowsFind.zIndex = zIndexFind.zIndex + 1
        renderWindowsFind.load = true
      }

      renderWindowsFixTranslateThrottleLastRAF(renderWindowsFind._hash)
    }
  }, [ImitationGlobal.state.store.rect])

  React.useEffect(() => {
    if (content.page !== '*' && content.page !== ImitationGlobal.state.store.page && content.page.includes(ImitationGlobal.state.store.page) === false) {
      ImitationNavigation.state.function.renderWindowsRemove(props._hash)
    }
  }, [ImitationGlobal.state.store.page])

  React.useEffect(() => {
    if (renderWindowsFind.hide === true) {
      ImitationNavigation.state.function.renderWindowsRemove(props._hash)
    }
  }, [renderWindowsFind.hide])

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      renderWindowsFixTranslateThrottleLastRAF(renderWindowsFind._hash)
    })

    resizeObserver.observe(renderWindowsFind.accordionRef)

    return () => resizeObserver.disconnect()
  }, [])

  React.useEffect(() => {
    const event = e => e.preventDefault()

    renderWindowsFind.accordionSummaryRef.addEventListener('touchmove', event)

    return () => {
      if (renderWindowsFind.accordionSummaryRef) {
        renderWindowsFind.accordionSummaryRef.removeEventListener('touchmove', event)
      }
    }
  }, [])

  return <Accordion {...AccordionSX()} style={{ width: 320, maxWidth: ImitationGlobal.state.store.rect.width - 32, height: 'fit-content', maxHeight: ImitationGlobal.state.store.rect.height - 96, overflowY: 'auto', position: 'absolute', zIndex: renderWindowsFind.zIndex, transitionProperty: transitionProperty, transitionDuration: '1s', ...style }} expanded={expand} onMouseDown={onMouseDownAccordion} onTouchStart={onTouchStartAccordion} ref={el => renderWindowsFind.accordionRef = el}>
    <AccordionSummary
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      expandIcon={
        <IconButton onClick={() => ImitationNavigation.state.function.renderWindowsRemove(props._hash)} onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()}>
          <CloseIcon color='primary' />
        </IconButton>
      }
      children={
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 0, marginRight: 8, width: expand ? 0 : 24, transition: '1s all' }}>
            <ChangeHistoryIcon style={{ position: 'absolute', transform: `scale(${expand ? 0 : 1})`, transition: '1s all' }} />
            <ChangeHistoryIcon style={{ position: 'absolute', transform: `scale(${expand ? 0 : 1}) rotate(180deg)`, transition: '1s all' }} />
          </div>
          <div >{content.summary}</div>
        </div>
      }
      ref={el => renderWindowsFind.accordionSummaryRef = el}
    />

    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Divider {...DividerSX()} style={{ width: expand ? 'calc(100% -  32px)' : 0, transition: '1s all' }} />
      <ChangeHistoryIcon style={{ position: 'absolute', transform: `scale(${expand ? 1 : 0}) rotate(180deg)`, transition: '1s all' }} />
    </div>

    <AccordionDetails
      style={{ fontSize: 12 }}
      children={
        <content.Component renderWindowsHash={renderWindowsFind._hash} />
      }
    />

    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
      <Divider {...DividerSX()} style={{ width: expand ? 'calc(100% -  32px)' : 0, transition: '1s all' }} />
      <ChangeHistoryIcon style={{ position: 'absolute', transform: `scale(${expand ? 1 : 0})`, transition: '1s all' }} />
    </div>
  </Accordion>
}

function App() {
  return <div style={{ position: 'absolute', zIndex: 900, width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0, margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {
      ImitationNavigation.state.store.renderWindow.map((i => <NavigationRenderItem key={i._hash} {...i} />))
    }
  </div>
}

const dependence = [
  { instance: ImitationNavigation, dependence: state => [ImitationNavigation.state.update.renderWindow] },
  { instance: ImitationGlobal, dependence: state => [ImitationGlobal.state.store.rect, ImitationGlobal.state.store.recting, ImitationGlobal.state.store.page] }
]

export default withBindComponentPure(App, dependence)