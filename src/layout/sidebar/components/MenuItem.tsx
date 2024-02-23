import { useSelector } from "react-redux";

import { Box, useTheme } from "@mui/material";

import { RootState } from "store";

import type { MenuItemProps } from "../types";

function MenuItem({ children, noPointEvent, isActive }: MenuItemProps) {
  const theme = useTheme();
  const { isMinimized } = useSelector((state: RootState) => state.menu);

  return (
    <Box
      padding={1.5}
      width={!isMinimized ? 248 : 56}
      sx={{
        borderRadius: 3,
        background: `linear-gradient(90deg, ${theme.palette.primary.main} -150%, ${theme.palette.primary.main}00 50%)`,
        backgroundSize: "200% 100%",
        backgroundPositionX: isActive ? "10%" : "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundPositionX: noPointEvent ? "100%" : "0%"
        }
      }}
    >
      {children}
    </Box>
  );
}

export default MenuItem;
