import { Stack, useTheme } from "@mui/material";

import Logo from "assets/icons/Logo";
import MobileDrawerButton from "./components/MobileDrawerButton";

function MobileHeader() {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      bgcolor={theme.palette.background.paper}
      px={3}
      py={2}
      width="100%"
      sx={{ borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
    >
      <Logo />
      <MobileDrawerButton />
    </Stack>
  );
}

export default MobileHeader;
