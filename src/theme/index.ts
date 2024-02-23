import { createTheme } from "@mui/material";
import Components from "./overrides";

export default function Theme() {
  const theme = createTheme({
    typography: {
      body1: {
        color: "white"
      }
    },
    breakpoints: {
      values: {
        xl: 1440,
        lg: 1280,
        md: 960,
        sm: 540,
        xs: 0
      }
    },
    palette: {
      background: {
        default: "#121212",
        paper: "#252525"
      },
      common: {
        black: "#000000",
        white: "#FFFFFF"
      },
      primary: { main: "#66FCF1" },
      text: {
        disabled: "#A7A7A7",
        primary: "#FFFFFF",
        secondary: "#8D9092"
      },
      divider: "#2E2E2E"
    },
    components: {
      MuiSelect: {
        styleOverrides: {
          iconOutlined: {
            fill: "#66FCF1"
          }
        }
      }
    }
  });

  // @ts-expect-error type
  theme.components = Components(theme);

  return theme;
}
