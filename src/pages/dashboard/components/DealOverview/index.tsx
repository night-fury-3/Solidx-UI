import { Button, Divider, Stack, Typography } from "@mui/material";

import MainBox from "components/MainBox";

import DealPreview from "./DealPreview";

function DealOverview() {
  return (
    <MainBox>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={24} lineHeight="56px">
          Deal overview
        </Typography>
        <Button variant="contained">View All</Button>
      </Stack>
      <Divider sx={{ marginTop: 2, marginBottom: 2.5 }} />
      <Stack spacing={4}>
        <DealPreview />
        <DealPreview />
      </Stack>
    </MainBox>
  );
}

export default DealOverview;
