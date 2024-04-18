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

const ButtonSX = (reverse) => {
  return {
    PopperProps: {
      sx: {
        '&.MuiButton-root': {
          background: themeColor('primary', reverse),
          color: themeColor('background', reverse),
        }
      }
    }
  }
}

const TooltipSX = (reverse) => {
  return {
    PopperProps: {
      sx: {
        '& .MuiTooltip-tooltip': {
          background: 'none',
          maxWidth: 'initial',
          fontSize: '14px',
          padding: '8px 16px !important',
          marginBottom: '16px !important'
        }
      }
    }
  }
}

const TooltipSXNavigation = (reverse) => {
  return {
    PopperProps: {
      sx: {
        '&.MuiTooltip-popper': {
          bottom: '16px !important'
        },
        '& .MuiTooltip-tooltip': {
          background: 'none',
          maxWidth: 'initial',
          fontSize: '14px',
          padding: '8px 16px !important',
          marginBottom: '24px !important'
        }
      }
    }
  }
}

const TextFieldSX = (reverse) => {
  return {
    sx: {
      '& input, & .MuiInputBase-multiline': { fontSize: '14px', padding: '12px' },
      // '& label': { fontSize: '12px', lineHeight: 1, padding: 0, background: 'white' },
      // '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', marginTop: '2px', background: 'white' },
      // '& fieldset': { top: 0 },
      // '& fieldset legend': { display: 'none' },
      '& input': {
        color: themeColor('primary', reverse)
      },
      '& fieldset': {
        borderColor: rgbaReplaceAlpha(themeColor('primary', reverse), 0.7),
      },
      '& .MuiInputBase-root:hover fieldset': {
        borderColor: themeColor('primary', reverse),
      }
    }
  }
}

const AutocompleteSX = (reverse) => {
  return {
    sx: {
      '& input': { fontSize: '14px' },
      '& .MuiOutlinedInput-root': { padding: '4.5px', paddingLeft: '8px' },
      '& label': { fontSize: '14px', lineHeight: 1, padding: 0, background: 'white' },
      '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', marginTop: '2px', background: 'white' },
      '& fieldset': { top: 0 },
      '& fieldset legend': { display: 'none' }
    },
    componentsProps: {
      popper: {
        sx: {
          '& .MuiAutocomplete-option': { fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }
        }
      },
      paper: {
        sx: {
          '& .MuiAutocomplete-noOptions': { fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace', padding: '12px' }
        }
      }
    }
  }
}

const SelectSX = (reverse) => {
  return {
    sx: {
      '& .MuiSelect-select': { fontSize: '14px', padding: '10.5px 12px' },
      // '& label': { fontSize: '12px', lineHeight: 1, padding: 0, background: 'white' },
      // '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', marginTop: '2px', background: 'white' },
      // '& fieldset': { top: 0 },
      // '& fieldset legend': { display: 'none' },
      '& input, & .MuiSelect-select': {
        color: themeColor('primary', reverse)
      },
      '& fieldset': {
        borderColor: rgbaReplaceAlpha(themeColor('primary', reverse), 0.7),
      },
      '& .MuiInputBase-root:hover fieldset': {
        borderColor: themeColor('primary', reverse),
      },
      '& svg': {
        fill: themeColor('primary', reverse)
      }
    },
    MenuProps: {
      sx: {
        '& .MuiMenuItem-root': { fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }
      }
    }
  }
}

const DrawerSX = (reverse) => {
  return {
    sx: {
      '& .MuiDrawer-paper': {
        background: themeColor('background', reverse),
        boxShadow: `0px 8px 10px -5px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.2)}, 0px 16px 24px 2px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.14)}, 0px 6px 30px 5px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.12)}`,
        color: themeColor('primary', reverse),
      },
    }
  }
}

const DialogSX = (reverse) => {
  return {
    sx: {
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
  }
}

const TabsSX = (reverse) => {
  return {
    sx: {
      '&.MuiTabs-root': {
        minHeight: 0,
      },
      '& .MuiTab-root': {
        minHeight: 0,
        fontSize: '14px',
        padding: '12px',
        color: rgbaReplaceAlpha(themeColor('primary', reverse), 0.5),
      },
    }
  }
}

const DividerSX = (reverse) => {
  return {
    sx: {
      '&.MuiDivider-root': {
        borderColor: themeColor('primary', reverse)
      },
    }
  }
}

const SwitchSX = (reverse) => {
  return {
    sx: {
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
  }
}

const AccordionSX = (reverse) => {
  return {
    sx: {
      '&.MuiAccordion-root': {
        background: themeColor('background', reverse),
        color: themeColor('primary', reverse),
        boxShadow: `0px 2px 1px -1px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.2)}, 0px 1px 1px 0px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.14)}, 0px 1px 3px 0px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.12)}`,
        borderRadius: '4px',
        margin: '0px',
        transition: '1s all',
      }
    }
  }
}

const PaperSX = (reverse) => {
  return {
    sx: {
      '&.MuiPaper-root': {
        background: themeColor('background', reverse),
        color: themeColor('primary', reverse),
        boxShadow: `0px 2px 1px -1px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.2)}, 0px 1px 1px 0px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.14)}, 0px 1px 3px 0px ${rgbaReplaceAlpha(themeColor('primary', reverse), 0.12)}`,
        transition: '1s all',
      }
    }
  }
}

export { ButtonSX, TooltipSX, TextFieldSX, AutocompleteSX, SelectSX, DrawerSX, DialogSX, TabsSX, DividerSX, SwitchSX, AccordionSX, PaperSX, TooltipSXNavigation }