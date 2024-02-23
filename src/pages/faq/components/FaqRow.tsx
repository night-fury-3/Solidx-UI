import { useCallback, useState } from "react";

import { Box, Collapse, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import { FaqRowProps } from "../types";

const FaqRow = ({ question, answer }: FaqRowProps) => {
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
        padding={"16px 24px"}
        onClick={handleToggling}
        sx={{ cursor: "pointer" }}
      >
        <Stack direction="row" spacing={2}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "white"
            }}
          >
            {question}
          </Typography>
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
        <Box padding={"0px 24px 16px"}>
          <Typography
            sx={{
              color: "#8D9092",
              fontSize: "14px"
            }}
          >
            {answer}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default FaqRow;
