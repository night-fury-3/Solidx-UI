import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";

import Service from "assets/icons/Service";

function DealPreview() {
  const theme = useTheme();

  return (
    <Stack spacing={2.5} padding={2} borderRadius={3} bgcolor="#252525">
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center">
          <Service />
          <Typography>Salaray</Typography>
        </Stack>
        <Box>
          <Typography fontSize={18} color={theme.palette.primary.main}>
            1.08
          </Typography>
          <Typography fontSize={16} color={theme.palette.text.secondary}>
          BNB
          </Typography>
        </Box>
      </Stack>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Stack spacing={0.5} alignItems="center">
              <Typography fontSize={16} color={theme.palette.text.secondary}>
                Date
              </Typography>
              <Typography fontSize={18}>October 23, 2023</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={0.5} alignItems="center" overflow="hidden" textOverflow="ellipsis">
              <Typography fontSize={16} color={theme.palette.text.secondary}>
                Deal Creator
              </Typography>
              <Typography
                noWrap
                textOverflow="ellipsis"
                textAlign="center"
                width={156}
                fontSize={18}
              >
                Elizabeth Clymer
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}

export default DealPreview;
