import Imitation from './utils.imitation'

const TooltipSX = () => {
  return {
    PopperProps: {
      sx: {
        '& .MuiTooltip-tooltip':
          { background: 'white', color: 'black', fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace', lineHeight: '1.5', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px' }
      }
    }
  }
}

const TextFieldSX = () => {
  return {
    sx: {
      '& input, & .MuiInputBase-multiline': { fontSize: '14px', padding: '12px' },
      '& label': { fontSize: '12px', lineHeight: 1, padding: 0, background: 'white' },
      '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', marginTop: '2px', background: 'white' },
      '& fieldset': { top: 0 },
      '& fieldset legend': { display: 'none' }
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
      '& label': { fontSize: '12px', lineHeight: 1, padding: 0, background: 'white' },
      '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', marginTop: '2px', background: 'white' },
      '& fieldset': { top: 0 },
      '& fieldset legend': { display: 'none' }
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
        boxShadow: `0px 8px 10px -5px ${Imitation.state.theme.palette.primary.main.replace(')', '')} ,0.2), 0px 16px 24px 2px ${Imitation.state.theme.palette.primary.main.replace(')', '')} ,0.14), 0px 6px 30px 5px ${Imitation.state.theme.palette.primary.main.replace(')', '')} ,0.12)`,
        color: Imitation.state.theme.palette.primary.main
      },
    }
  }
}

const DialogSX = () => {
  return {
    sx: {
      '& .MuiPaper-root': {
        background: Imitation.state.theme.palette.background.main,
        boxShadow: `0px 11px 15px -7px ${Imitation.state.theme.palette.primary.main.replace(')', '')} ,0.2), 0px 24px 38px 3px ${Imitation.state.theme.palette.primary.main.replace(')', '')} ,0.14), 0px 9px 46px 8px ${Imitation.state.theme.palette.primary.main.replace(')', '')} ,0.12)`,
        color: Imitation.state.theme.palette.primary.main
      },
    }
  }
}

export { TooltipSX, TextFieldSX, AutocompleteSX, SelectSX, DrawerSX, DialogSX }