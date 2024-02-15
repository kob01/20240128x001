import Imitation from './utils.imitation'
import { rgba } from './utils.common'

const TooltipSX = () => {
  return {
    PopperProps: {
      sx: {
        '& .MuiTooltip-tooltip':
          { background: Imitation.state.theme.palette.background.main, color: Imitation.state.theme.palette.primary.main }
      }
    }
  }
}

const TextFieldSX = () => {
  return {
    sx: {
      '& input, & .MuiInputBase-multiline': { fontSize: '14px', padding: '12px' },
      // '& label': { fontSize: '12px', lineHeight: 1, padding: 0, background: 'white' },
      // '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', marginTop: '2px', background: 'white' },
      // '& fieldset': { top: 0 },
      // '& fieldset legend': { display: 'none' },
      '& input': {
        color: Imitation.state.theme.palette.primary.main
      },
      '& fieldset': {
        borderColor: rgba(Imitation.state.theme.palette.primary.main, 0.7),
      },
      '& .MuiInputBase-root:hover fieldset': {
        borderColor: Imitation.state.theme.palette.primary.main,
      }
    }
  }
}

const AutocompleteSX = () => {
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

const SelectSX = () => {
  return {
    sx: {
      '& .MuiSelect-select': { fontSize: '14px', padding: '10.5px 12px' },
      // '& label': { fontSize: '12px', lineHeight: 1, padding: 0, background: 'white' },
      // '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', marginTop: '2px', background: 'white' },
      // '& fieldset': { top: 0 },
      // '& fieldset legend': { display: 'none' },
      '& input, & .MuiSelect-select': {
        color: Imitation.state.theme.palette.primary.main
      },
      '& fieldset': {
        borderColor: rgba(Imitation.state.theme.palette.primary.main, 0.7),
      },
      '& .MuiInputBase-root:hover fieldset': {
        borderColor: Imitation.state.theme.palette.primary.main,
      },
      '& svg': {
        fill: Imitation.state.theme.palette.primary.main
      }
    },
    MenuProps: {
      sx: {
        '& .MuiMenuItem-root': { fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }
      }
    }
  }
}

const DrawerSX = () => {
  return {
    sx: {
      '& .MuiPaper-root': {
        background: Imitation.state.theme.palette.background.main,
        boxShadow: `0px 8px 10px -5px ${rgba(Imitation.state.theme.palette.primary.main, 0.2)}, 0px 16px 24px 2px ${rgba(Imitation.state.theme.palette.primary.main, 0.14)}, 0px 6px 30px 5px ${rgba(Imitation.state.theme.palette.primary.main, 0.12)}`,
        color: Imitation.state.theme.palette.primary.main,
      },
    }
  }
}

const DialogSX = () => {
  return {
    sx: {
      '& .MuiPaper-root': {
        background: rgba(Imitation.state.theme.palette.background.main, 0.75),
        boxShadow: `0px 11px 15px -7px ${rgba(Imitation.state.theme.palette.primary.main, 0.2)}, 0px 24px 38px 3px ${rgba(Imitation.state.theme.palette.primary.main, 0.14)}, 0px 9px 46px 8px ${rgba(Imitation.state.theme.palette.primary.main, 0.12)}`,
        color: Imitation.state.theme.palette.primary.main,
      },
      '& .MuiDialogContent-dividers': {
        borderColor: Imitation.state.theme.palette.primary.main,
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

const TabsSX = () => {
  return {
    sx: {
      '&.MuiTabs-root': {
        minHeight: 0,
      },
      '& .MuiTab-root': {
        minHeight: 0,
        fontSize: '14px',
        padding: '12px',
        color: rgba(Imitation.state.theme.palette.primary.main, 0.5),
      },
    }
  }
}

const DividerSX = () => {
  return {
    sx: {
      '&.MuiDivider-root': {
        borderColor: Imitation.state.theme.palette.primary.main
      },
    }
  }
}

const SwitchSX = () => {
  return {
    sx: {
      '& .MuiSwitch-track': {
        backgroundColor: Imitation.state.theme.palette.primary.main,
        opacity: 0.25,
      },

      '& .Mui-checked .MuiSwitch-track': {
        backgroundColor: Imitation.state.theme.palette.primary.main,
        opacity: 0.5,
      },
    }
  }
}

export { TooltipSX, TextFieldSX, AutocompleteSX, SelectSX, DrawerSX, DialogSX, TabsSX, DividerSX, SwitchSX }