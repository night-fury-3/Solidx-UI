import { Badge, Box, useTheme } from "@mui/material";

import NotificationIcon from "assets/icons/Notification";

function Notification() {
  const theme = useTheme();

  return (
    <Badge badgeContent="" color="primary">
      <Box height={42} p={1.5} borderRadius={2.5} bgcolor={theme.palette.background.default}>
        <NotificationIcon />
      </Box>
    </Badge>
  );
}

export default Notification;
