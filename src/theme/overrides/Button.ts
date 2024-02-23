import { Theme } from "@mui/material";

function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: "1rem",
          lineHeight: "1.5rem",
          textTransform: "none",
          fontWeight: 500
        },
        contained: {
          background: "linear-gradient(90deg, #66FCF1 0%, #1499E4 100%)",
          boxShadow: "none",
          color: "#111111",
          padding: "13px 24px",
          [theme.breakpoints.down("sm")]: {
            padding: "8px 12px"
          }
        }
      }
    }
  };
}

export default Button;
