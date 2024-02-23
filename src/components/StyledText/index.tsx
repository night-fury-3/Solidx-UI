import { Typography } from "@mui/material";

import { TypographyProps } from "@mui/material";

function StyledText(props: TypographyProps) {
  return (
    <Typography
      sx={{
        background: "linear-gradient(90deg, #66FCF1 0%, #1499E4 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        width: "max-content"
      }}
      {...props}
    >
      {props.children}
    </Typography>
  );
}

export default StyledText;
