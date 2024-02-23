import { Theme } from "@mui/material";

function Typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        h4: {
          fontSize: "2.125rem",
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.5rem"
          }
        }
      }
    }
  };
}

export default Typography;
