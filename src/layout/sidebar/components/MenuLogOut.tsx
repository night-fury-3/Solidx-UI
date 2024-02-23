import { useSelector } from "react-redux";

import { Stack, Typography, useTheme } from "@mui/material";

import LogOut from "assets/icons/LogOut";
import { RootState } from "store";

function MenuLogOut() {
  const theme = useTheme();
  const { isMinimized } = useSelector((state: RootState) => state.menu);

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: "pointer" }}>
      <LogOut />
      {!isMinimized ? <Typography color={theme.palette.text.secondary}>Log Out</Typography> : null}
    </Stack>
  );
}

export default MenuLogOut;
