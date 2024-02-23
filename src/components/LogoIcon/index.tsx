import { useState } from "react";

import { Stack, Typography } from "@mui/material";

import { LogoIconProps } from "./index.type";

function LogoIcon({ src, alt, height, width, title }: LogoIconProps) {
  const [isError, toggleError] = useState<boolean>(false);

  if (isError || !src) {
    return (
      <Stack
        width={width}
        height={height}
        borderRadius="100%"
        bgcolor="white"
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontSize={12} color="black" fontWeight={600}>
          {title}
        </Typography>
      </Stack>
    );
  }

  return (
    <img src={src} alt={alt} width={width} height={height} onError={() => toggleError(true)} />
  );
}

export default LogoIcon;
