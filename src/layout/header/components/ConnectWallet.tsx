import { Fragment, useCallback } from "react";
import { ThreeDots } from "react-loader-spinner";

import { Button, Typography, useTheme } from "@mui/material";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { useAccount } from "wagmi";

import PlusInCircle from "assets/icons/PlusInCircle";

function ConnectWallet() {
  const theme = useTheme();

  const { open } = useWeb3Modal();
  const { address, isConnected, isReconnecting, isConnecting } = useAccount();

  const handleOpen = useCallback(async () => {
    await open();
  }, [open]);

  return (
    <Fragment>
      {isConnecting || isReconnecting ? (
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ paddingTop: "13px", paddingBottom: "13px", paddingLeft: 2, paddingRight: 2 }}
        >
          <ThreeDots height={16} width={80} radius={6} color={theme.palette.background.paper} />
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ paddingTop: "13px", paddingBottom: "13px", paddingLeft: 2, paddingRight: 2 }}
        >
          {isConnected ? (
            <Typography
              fontSize={14}
              lineHeight={1.2}
              color="inherit"
              textTransform="uppercase"
              fontWeight="bold"
            >
              {`${address.slice(0, 5)}...${address.slice(-3)}`}
            </Typography>
          ) : (
            <Fragment>
              <PlusInCircle />
              <Typography ml={1} fontSize={14} lineHeight={0.875} color="inherit">
                Connect Wallet
              </Typography>
            </Fragment>
          )}
        </Button>
      )}
    </Fragment>
  );
}

export default ConnectWallet;
