import { Fragment, useEffect } from "react";

import { Stack, Typography } from "@mui/material";
import { useAccount } from "wagmi";

import useDealsCount from "hooks/useDealsCount";
import useLoadDeals from "hooks/useLoadDeals";

import DealsBoard from "./components/DealsBoard";

function MyDeals() {
  const { isConnected } = useAccount();
  const { count: dealsCount, isLoading: isLoadingCount } = useDealsCount();
  const {
    isLoading: statusOfOpenedDeals,
    loadNext: loadNextOpenedDeals,
    deals: openedDeals
  } = useLoadDeals(true, dealsCount);
  const {
    isLoading: statusOfClosedDeals,
    loadNext: loadNextClosedDeals,
    deals: closedDeals
  } = useLoadDeals(false, dealsCount);

  useEffect(() => {
    if (isConnected && dealsCount) {
      loadNextOpenedDeals();
      loadNextClosedDeals();
    }
  }, [isConnected, loadNextClosedDeals, loadNextOpenedDeals, dealsCount]);

  return (
    <Fragment>
      {isConnected ? (
        <Stack spacing={5}>
          <DealsBoard
            title="Open Deals"
            done={true}
            deals={openedDeals}
            loading={isLoadingCount || statusOfOpenedDeals}
          />
          <DealsBoard
            title="Past Deals"
            done={true}
            deals={closedDeals}
            loading={isLoadingCount || statusOfClosedDeals}
          />
        </Stack>
      ) : (
        <Typography variant="h5" align="center">
          Connect Your Wallet
        </Typography>
      )}
    </Fragment>
  );
}

export default MyDeals;
