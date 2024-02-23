import { Button, ButtonProps, useMediaQuery, useTheme } from "@mui/material";

import StyledText from "components/StyledText";

function StyledOutlineButton({ children, ...props }: ButtonProps) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Button
      variant="outlined"
      sx={{
        position: "relative",
        "&:hover": {
          border: 0
        },
        border: 0,
        padding: 0
      }}
      {...props}
    >
      <svg
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute" }}
      >
        <rect
          x="0.5"
          y="0.5"
          width="99%"
          height="98.5%"
          rx="7.5"
          stroke="url(#paint0_linear_1_513)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1_513"
            x1="0"
            y1="28"
            x2="233"
            y2="28"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#66FCF1" />
            <stop offset="1" stopColor="#1499E4" />
          </linearGradient>
        </defs>
      </svg>
      <StyledText px={2} py={smDown ? "8px" : "13px"}>
        {children}
      </StyledText>
    </Button>
  );
}

export default StyledOutlineButton;
