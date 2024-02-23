import { Theme } from "@mui/material";

function CssBaseline(theme: Theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: theme.palette.background.default,
          margin: 0,
          padding: 0
        }
      }
    }
  };
}

export default CssBaseline;
