import { Fragment, ReactNode, useCallback, useState } from "react";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Box } from "@mui/material";

import { useAccount } from "wagmi";

import { DealTypes } from "types/deal.type";

import DealSelection from "./DealTypeSelection";
import DealCreation from "./DealCreation";
import JoiningDeal from "./JoiningDeal";

function CardWrapper({ children }: { children: ReactNode }) {
  return (
    <Box maxWidth={624} mx="auto" width="100%">
      {children}
    </Box>
  );
}

function DealCard() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();

  const [stage, setStage] = useState<number>(0);
  const [dealType, setDealType] = useState<DealTypes>(DealTypes.OTC);

  // const switchNetwork = useSwitchNetwork();

  const handleClickDealType = useCallback((id: DealTypes) => {
    setDealType(id);
  }, []);

  const handleCreateDeal = useCallback(async () => {
    if (!isConnected) {
      await open();
    } else {
      setStage(1);
    }
  }, [isConnected, open]);

  const handleJoinDeal = useCallback(async () => {
    if (!isConnected) {
      await open();
    } else {
      setStage(2);
    }
  }, [isConnected, open]);

  const handleBack = useCallback(() => {
    setStage(0);
  }, []);

  // useEffect(() => {
  //   if (isConnected) {
  //     switchNetwork({ chainId: 97 });
  //   }
  // }, [isConnected]);

  return (
    <Fragment>
      {stage === 0 ? (
        <CardWrapper>
          <DealSelection
            dealType={dealType}
            onDealTypeChange={handleClickDealType}
            onCreate={handleCreateDeal}
            onJoin={handleJoinDeal}
          />
        </CardWrapper>
      ) : null}
      {stage === 1 ? <DealCreation dealType={dealType} onBack={handleBack} /> : null}
      {stage === 2 ? <JoiningDeal dealType={dealType} onBack={handleBack} /> : null}
    </Fragment>
  );
}

export default DealCard;
