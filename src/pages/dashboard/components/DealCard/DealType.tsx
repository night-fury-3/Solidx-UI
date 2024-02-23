import { Box, Stack, Typography, useTheme } from "@mui/material";

import { DealTypeProps } from "../../types";
import ExchangeIcon from "assets/icons/Exchange";

function DealType({ id, title, onClick: handleClick, active }: DealTypeProps) {
  const theme = useTheme();

  return (
    <Stack
      px={2}
      py={1.5}
      direction="row"
      alignItems="center"
      spacing={2}
      border={1}
      borderRadius={2}
      borderColor={active ? "#66FCF1" : "#333"}
      sx={{ cursor: "pointer" }}
      onClick={() => {
        handleClick ? handleClick(id) : null;
      }}
    >
      <Box borderRadius={2} bgcolor={theme.palette.background.paper} height={48} px={1} py={1}>
        <ExchangeIcon />
      </Box>
      <Typography>{title}</Typography>
    </Stack>
  );
}

export default DealType;
