import { useCallback, useState } from "react";

import { Box, Collapse, Divider, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import { DropDownProps } from "./index.type";

function DropDown({ children, title, icon }: DropDownProps) {
  const theme = useTheme();

  const [opened, toggle] = useState<boolean>(false);

  const handleToggling = useCallback(() => {
    toggle((state) => !state);
  }, []);

  return (
    <Box borderRadius={2} bgcolor={theme.palette.background.default}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding={3}
        onClick={handleToggling}
        sx={{ cursor: "pointer" }}
      >
        <Stack direction="row" spacing={2}>
          <Typography fontSize="1.125rem" fontWeight={600}>
            {title}
          </Typography>
          {icon}
        </Stack>
        <IconButton size="small">
          {opened ? (
            <KeyboardArrowUp sx={{ color: "grey" }} />
          ) : (
            <KeyboardArrowDown sx={{ color: "grey" }} />
          )}
        </IconButton>
      </Stack>
      <Collapse in={opened}>
        <Divider />
        <Box padding={3}>{children}</Box>
      </Collapse>
    </Box>
  );
}

export default DropDown;
