import { ImitationGlobal } from './Imitation'
import { rgbaReplaceAlpha } from './utils.common'

const themeColor = (type, reverse = false) => {
  if (type === 'background') {
    return reverse ? ImitationGlobal.state.store.theme.palette.primary.main : ImitationGlobal.state.store.theme.palette.background.main
  }
  if (type === 'primary') {
    return reverse ? ImitationGlobal.state.store.theme.palette.background.main : ImitationGlobal.state.store.theme.palette.primary.main
  }
}

const PopperSX = (reverse, addition) => {
  const sx = {
    '& .MuiTooltip-tooltip': {
      background: 'none',
      fontSize: '14px',
      maxWidth: 'initial',
      padding: '0px !important',
      margin: '0px !important',
    },
    // '& .MuiTooltip-tooltipPlacementRight': {
    //   marginLeft: '8px !important'
    // },
    // '& .MuiTooltip-tooltipPlacementLeft': {
    //   marginRight: '8px !important'
    // }
  }

  if (addition) addition(sx)

  return sx
}

const TextFieldSX = (reverse, addition) => {
  const sx = {
    '& input, & .MuiInputBase-multiline': {
      fontSize: '14px',
      padding: '12px'
    },
    '& input': {
      color: themeColor('primary', reverse)
    },
    '& fieldset': {
      borderColor: rgbaReplaceAlpha(themeColor('primary', reverse), 0.7),
    },
    '& .MuiInputBase-root:hover fieldset': {
      borderColor: themeColor('primary', reverse),
    },
    // '& label': { fontSize: '12px', lineHeight: 1, padding: 0, background: 'white' },
    // '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', marginTop: '2px', background: 'white' },
    // '& fieldset': { top: 0 },
    // '& fieldset legend': { display: 'none' },
  }

  if (addition) addition(sx)

  return sx
}

const TextFieldSmallSX = (reverse, addition) => {
  const sx = TextFieldSX(reverse)

  sx['& .MuiInputBase-root:hover fieldset'] = { fontSize: '12px', lineHeight: 1, padding: '4px 8px' }

  if (addition) addition(sx)

  return sx
}

const DrawerSX = (reverse, addition) => {
  const sx = {
    '& .MuiDrawer-paper': {
      background: themeColor('background', reverse),
      boxShadow: `0px 8px 10px -5px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.2)}, 0px 16px 24px 2px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.14)}, 0px 6px 30px 5px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.12)}`,
      color: themeColor('primary', reverse),
    },
  }

  if (addition) addition(sx)

  return sx
}

const DialogSX = (reverse, addition) => {
  const sx = {
    '& .MuiDialog-paper': {
      background: themeColor('background', reverse),
      boxShadow: `0px 11px 15px -7px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.2)}, 0px 24px 38px 3px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.14)}, 0px 9px 46px 8px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.12)}`,
      color: themeColor('primary', reverse),
      width: '100%',
      maxWidth: '720px',
      transition: '1s all'
    },
    '& .MuiDialogContent-dividers': {
      borderColor: themeColor('primary', reverse),
    },
    '& .MuiDialogTitle-root': {
      fontSize: '16px'
    },
    '& .MuiDialogContent-root': {
      fontSize: '14px'
    }
  }

  if (addition) addition(sx)

  return sx
}

const DividerSX = (reverse, addition) => {
  const sx = {
    '&.MuiDivider-root': {
      borderColor: themeColor('primary', reverse)
    },
  }

  if (addition) addition(sx)

  return sx
}

const SwitchSX = (reverse, addition) => {
  const sx = {
    '&.MuiSwitch-root .MuiSwitch-track': {
      backgroundColor: themeColor('primary', reverse),
      opacity: 0.2,
    },

    '&.MuiSwitch-root .Mui-checked+.MuiSwitch-track': {
      backgroundColor: themeColor('primary', reverse),
      opacity: 0.6,
    },

    '&.MuiSwitch-root .MuiSwitch-thumb': {
      color: themeColor('primary', reverse),
    }
  }

  if (addition) addition(sx)

  return sx
}

const AccordionSX = (reverse, addition) => {
  const sx = {
    '&.MuiAccordion-root': {
      background: themeColor('background', reverse),
      color: themeColor('primary', reverse),
      boxShadow: `0px 2px 1px -1px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.2)}, 0px 1px 1px 0px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.14)}, 0px 1px 3px 0px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.12)}`,
      borderRadius: '4px',
      margin: '0px',
      transition: '1s all',
    },
    '& .MuiCollapse-root': {
      overflow: 'visible'
    },
    '& .MuiAccordionSummary-root': {
      minHeight: '42px'
    },
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: 'initial'
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      margin: '16px 0'
    },
    '& .MuiAccordionDetails-root': {
      padding: '16px'
    }
  }

  if (addition) addition(sx)

  return sx
}

const PaperSX = (reverse, addition) => {
  const sx = {
    '&.MuiPaper-root': {
      background: themeColor('background', reverse),
      color: themeColor('primary', reverse),
      boxShadow: `0px 2px 1px -1px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.2)}, 0px 1px 1px 0px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.14)}, 0px 1px 3px 0px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.12)}`,
      transition: '1s all',
    }
  }

  if (addition) addition(sx)

  return sx
}

export { PopperSX, TextFieldSX, TextFieldSmallSX, DrawerSX, DialogSX, DividerSX, SwitchSX, AccordionSX, PaperSX }