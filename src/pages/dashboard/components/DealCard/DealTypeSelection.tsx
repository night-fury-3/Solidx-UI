import { Divider, Grid, Stack, Typography, Button } from "@mui/material";

import MainBox from "components/MainBox";
import StyledOutlineButton from "components/StyledOutlinedButton";
import { DealTypes } from "types/deal.type";

import DealType from "./DealType";
import { DealTypeSelectionProps } from "../../types";

function DealTypeSelection({
  dealType,
  onDealTypeChange,
  onCreate,
  onJoin
}: DealTypeSelectionProps) {
  return (
    <MainBox>
      <Typography fontSize={{ xs: 20, sm: 24 }} lineHeight="56px">
        Create Service or OTC Deal
      </Typography>
      <Divider sx={{ marginTop: 2, marginBottom: 2.5 }} />
      <Typography fontSize={{ xs: 18, sm: 20 }} mb={2}>
        Create a deal now
      </Typography>
      <Stack spacing={2}>
        <DealType
          active={dealType === DealTypes.OTC}
          id={DealTypes.OTC}
          title="OTC (Coin Exchange)"
          onClick={onDealTypeChange}
        />
        <DealType
          active={dealType === DealTypes.Service}
          id={DealTypes.Service}
          title="Service Escrow"
          onClick={onDealTypeChange}
        />
      </Stack>
      <Grid container spacing={2} mt={{ xs: 2, sm: 4 }}>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" onClick={onCreate} fullWidth>
            Create a deal
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledOutlineButton variant="outlined" color="primary" onClick={onJoin} fullWidth>
            Join a created deal
          </StyledOutlineButton>
        </Grid>
      </Grid>
    </MainBox>
  );
}

export default DealTypeSelection;
