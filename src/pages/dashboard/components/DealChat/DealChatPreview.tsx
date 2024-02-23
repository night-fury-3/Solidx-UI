import { Fragment, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Stack, Typography, useTheme } from "@mui/material";

import LogoIcon from "components/LogoIcon";
import { User } from "types";

function DealChatPreview({ preview }: { preview: User }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/?chat_partner=${preview.account}`);
  }, [navigate, preview.account]);

  return (
    <Fragment>
      <Stack
        direction="row"
        spacing={2.5}
        alignItems="center"
        p={1.5}
        borderRadius={2}
        sx={{
          cursor: "pointer",
          "&:hover": {
            bgcolor: theme.palette.background.paper + "80"
          }
        }}
        onClick={handleClick}
      >
        <Box width={50} height={50}>
          <LogoIcon title="EC" alt="avatar" height={50} width={50} src="https://" />
        </Box>
        <Stack spacing={1}>
          <Typography fontSize={18}>{preview.fullName || preview.account}</Typography>
          <Typography fontSize={14} color={theme.palette.text.secondary}>
            {preview.recent.message}
          </Typography>
        </Stack>
      </Stack>
    </Fragment>
  );
}

export default DealChatPreview;
