import { Fragment, useEffect } from "react";

import { Stack, Typography } from "@mui/material";
import { useAccount } from "wagmi";

import useServicesCount from "hooks/useServicesCount";
import useLoadServices from "hooks/useLoadServices";

import ServicesBoard from "./components/ServicesBoard";

function MyServices() {
  const { isConnected } = useAccount();
  const { count: servicesCount, isLoading: isLoadingCount } = useServicesCount();
  const {
    isLoading: statusOfOpenedServices,
    loadNext: loadNextOpenedServices,
    services: openedServices
  } = useLoadServices(true, servicesCount);
  const {
    isLoading: statusOfClosedServices,
    loadNext: loadNextClosedServices,
    services: closedServices
  } = useLoadServices(false, servicesCount);

  useEffect(() => {
    if (isConnected && servicesCount) {
      loadNextOpenedServices();
      loadNextClosedServices();
    }
  }, [isConnected, loadNextClosedServices, loadNextOpenedServices, servicesCount]);

  return (
    <Fragment>
      {isConnected ? (
        <Stack spacing={5}>
          <ServicesBoard
            title="Open Services"
            done={true}
            services={openedServices}
            loading={isLoadingCount || statusOfOpenedServices}
          />
          <ServicesBoard
            title="Past Services"
            done={true}
            services={closedServices}
            loading={isLoadingCount || statusOfClosedServices}
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

export default MyServices;
