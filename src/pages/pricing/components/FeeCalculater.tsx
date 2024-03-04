import { useState } from "react";

import { Box, Divider, Grid, Stack, Typography } from "@mui/material";

import MainBox from "components/MainBox";
import DealType from "./DealType";
import { DealTypes } from "types/deal.type";
import ExchangeDeal from "./ExchangeDeal";
import SellingService from "./SellingService";

const FeeCalculater = () => {
  const [dealType, setDealType] = useState<DealTypes>(DealTypes.OTC);

  const handleDealTypeClick = (_id: DealTypes) => {
    setDealType(_id);
  };

  return (
    <MainBox>
      <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            color: "white",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "56px"
          }}
        >
          Fee Calculater
        </Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Box maxWidth="100%" sx={{ overflowX: "auto" }}>
        <Grid container alignItems="center" spacing={"32px"}>
          <Grid item xs={12}>
            {/* <Typography
              sx={{
                color: "white",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal"
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Typography> */}
          </Grid>
          <Grid item xs={12} container spacing={"16px"}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal"
                }}
              >
                Select Service or OTC Deal
              </Typography>
            </Grid>
            <Grid item xs={12} container spacing={"24px"}>
              <Grid item xs={12} md={6}>
                <DealType
                  id={DealTypes.OTC}
                  title="OTC Deal"
                  active={dealType === DealTypes.OTC}
                  onClick={handleDealTypeClick}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DealType
                  id={DealTypes.Service}
                  title="Service Escrow"
                  active={dealType === DealTypes.Service}
                  onClick={handleDealTypeClick}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={"16px"}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal"
                }}
              >
                Calculater
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {dealType === DealTypes.OTC ? <ExchangeDeal /> : <SellingService />}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </MainBox>
  );
};

export default FeeCalculater;
