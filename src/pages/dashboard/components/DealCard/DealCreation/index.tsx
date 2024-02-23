import { ReactNode, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import MainBox from "components/MainBox";
import { DealTypes } from "types/deal.type";

import { DealCreationProps, Milestone } from "../../../types";

import ExchangeDeal from "./ExchangeDeal";
import SellingService from "./SellingService";
import MilestoneDialog from "./MilestoneDialog";

const defaultMilestone: Milestone = {
  amount: 0,
  name: "Milestone 1"
};

function CardWrapper({ children }: { children: ReactNode }) {
  return (
    <Box maxWidth={624} mx="auto" width="100%">
      {children}
    </Box>
  );
}

function DealCreation({ dealType, onBack }: DealCreationProps) {
  const [symbol, setSymbol] = useState<string>("");
  const [milestones, setMilestones] = useState<Milestone[]>([defaultMilestone]);
  return (
    <Stack
      spacing={4}
      direction={{ md: "row", xs: "column" }}
      alignItems={{ md: "start", xs: "center" }}
    >
      <CardWrapper>
        <MainBox>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button onClick={onBack}>
              <svg
                className="MuiSvgIcon-root MuiBox-root css-1om0hkc"
                focusable="false"
                aria-hidden="true"
                width={32}
                height={32}
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
              </svg>
            </Button>
            <Typography fontSize={{ xs: 20, sm: 24 }} lineHeight="56px">
              {dealType === DealTypes.OTC ? "Create OTC" : "Create Service Escrow"}
            </Typography>
          </Stack>
          <Divider sx={{ marginTop: 2, marginBottom: 2.5 }} />
          {dealType === DealTypes.OTC ? <ExchangeDeal /> : null}
          {dealType === DealTypes.Service ? (
            <SellingService
              milestones={milestones}
              onMilestonesChange={setMilestones}
              onSymbolChange={setSymbol}
            />
          ) : null}
        </MainBox>
      </CardWrapper>
      <CardWrapper>
        {dealType === DealTypes.OTC ? null : (
          <MilestoneDialog milestones={milestones} setMilestones={setMilestones} symbol={symbol} />
        )}
      </CardWrapper>
    </Stack>
  );
}

export default DealCreation;
