import { Badge, Box, useTheme } from "@mui/material";

import SMS from "assets/icons/SMS";

function Mails() {
  const theme = useTheme();

  return (
    <Badge badgeContent="" color="primary">
      <Box height={42} p={1.5} borderRadius={2.5} bgcolor={theme.palette.background.default}>
        <SMS />
      </Box>
    </Badge>
  );
}

export default Mails;
