import { Theme } from "@mui/material";

function TextField(theme: Theme) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover fieldset": {
            borderColor: `${theme.palette.primary.main} !important`
          }
        },
        notchedOutline: {
          borderColor: `${theme.palette.primary.main}90`
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&:before, &:after": {
            border: "none !important"
          }
        }
      }
    }
  };
}

export default TextField;
