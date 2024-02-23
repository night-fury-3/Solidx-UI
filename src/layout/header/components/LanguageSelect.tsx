import { Box, useTheme } from "@mui/material";

import ArrowBottom from "assets/icons/ArrowBottom";
import USFlag from "assets/icons/USFlag";

function LanguageSelect() {
  const theme = useTheme();

  return (
    <Box height={42} p={1.5} pr={1} bgcolor={theme.palette.background.default} borderRadius={2.5}>
      <USFlag />
      <ArrowBottom />
    </Box>
  );
}

export default LanguageSelect;
