import { Theme } from "@mui/material";

function Select(theme: Theme) {
  return {
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8
        },
        iconOutlined: {
          fill: theme.palette.primary.main
        }
      }
    }
  };
}

export default Select;
