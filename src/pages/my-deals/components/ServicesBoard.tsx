import { Fragment, useCallback, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import { useAccount } from "wagmi";
import { checksumAddress, formatUnits, zeroAddress } from "viem";

import Export from "assets/icons/Export";
import DropDown from "components/DropDown";
import MainBox from "components/MainBox";
// import StyledOutlineButton from "components/StyledOutlinedButton";
import useNotifications from "hooks/useNotifications";
import useTokenInfo from "hooks/useTokenInfo";
import useServiceContract from "hooks/useServiceContract";
import { convertTwoNumbers } from "utils";

import MilestonePreview from "./MilestonePreview";

import type { ServicesBoardProps } from "../types";
import { DealStatus, type Service } from "types/deal.type";

type TTokensInfo = {
  symbol: string;
  decimals: number;
};

function LoadingRow() {
  return (
    <Fragment>
      <Grid item xs={2}>
        <Box mx={2} my={1.5}>
          <Skeleton width={52} height={30} />
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box mx={2} my={1.5}>
          <Skeleton width={40} height={30} />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box mx={2} my={1.5}>
          <Skeleton width={48} height={30} />
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box mx={2} my={1.5}>
          <Skeleton width={30} height={30} />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box mx={2} my={1.5}>
          <Skeleton width={25} height={30} />
        </Box>
      </Grid>
    </Fragment>
  );
}

function ServiceRow({ service }: { service: Service }) {
  const theme = useTheme();
  const { address: account } = useAccount();
  const { addNotification } = useNotifications();
  const { nameAndSymbol, decimals } = useTokenInfo();
  const { approveMilestone, approveCanncel, cancelDeal } = useServiceContract();
  const [tokensInfo, setTokesInfo] = useState<TTokensInfo>();
  const [isOpened, toggleOpen] = useState<boolean>(false);
  const [isRuningTx, toggleRunningTx] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const symbol =
        service.paymentToken === zeroAddress
          ? "ETH"
          : (await nameAndSymbol(service.paymentToken))[0].result || "_";
      const tokenDecimals =
        service.paymentToken === zeroAddress ? 18 : await decimals(service.paymentToken);
      setTokesInfo({ decimals: tokenDecimals, symbol });
    };
    init();
  }, [service.paymentToken, decimals, nameAndSymbol]);

  const DEAL_STATES = ["Not Created", "Opened", "Joined", "Approved", "Cancelled"];
  const DEAL_STATES_COLORS = [
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.error.main
  ];

  const shortAddress = useCallback(
    (address: `0x${string}`) => {
      if (account && checksumAddress(address) === checksumAddress(account)) return "You";
      return `${address.slice(0, 6)}...${address.slice(-3)}`;
    },
    [account]
  );

  const handleCopy = useCallback(
    (value: string) => {
      navigator.clipboard.writeText(value);

      addNotification({
        message: "Service hash Id copied!",
        type: "info"
      });
    },
    [addNotification]
  );

  const handleCloseDialog = useCallback(() => {
    toggleOpen(false);
  }, []);

  const handleClick = useCallback(() => {
    if (
      Number(service.status) === DealStatus.Created ||
      Number(service.status) === DealStatus.Joined
    ) {
      toggleOpen(true);
    }
  }, [service.status]);

  const handleAcceptClick = useCallback(
    async (index: number) => {
      try {
        toggleRunningTx(true);
        await approveMilestone(service.id, index);
        toggleOpen(false);
        addNotification({
          title: "Success!",
          message: "Accepted successfully!",
          type: "success"
        });
      } catch (error) {
        console.log(error);
      } finally {
        toggleRunningTx(false);
      }
    },
    [addNotification, approveMilestone, service.id]
  );

  const isBuyer = useCallback(() => {
    if (service.isSelling) {
      return service.partner === account;
    }
    return service.creator === account;
  }, [service, account]);

  const handleClickRequest = useCallback(async () => {
    try {
      toggleRunningTx(true);
      await approveCanncel(service.id);
      addNotification({
        title: "Success!",
        message: "Successfully request to cancel!",
        type: "success"
      });
    } catch (error) {
      console.log(error);
    } finally {
      toggleRunningTx(false);
    }
  }, [addNotification, approveCanncel, service.id]);

  const handleClickCancel = useCallback(async () => {
    try {
      toggleRunningTx(true);
      await cancelDeal(service.id);
      addNotification({
        title: "Success!",
        message: "Successfully request to cancel!",
        type: "success"
      });
    } catch (error) {
      console.log(error);
    } finally {
      toggleRunningTx(false);
    }
  }, [addNotification, cancelDeal, service.id]);

  return (
    <Box
      sx={{
        "&:hover": { bgcolor: `${theme.palette.background.paper}70` },
        cursor: "pointer",
        borderRadius: 4
      }}
    >
      <Grid container alignItems="center" onClick={handleClick}>
        <Grid item xs={2}>
          <Box mx={2} my={1.5}>
            <Typography color={theme.palette.text.secondary}>
              {shortAddress(service.creator)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mx={2} my={1.5}>
            <Typography color={theme.palette.text.secondary}>
              {new Date(Number(service.createdAt) * 1000).toDateString().slice(4)}
            </Typography>
            <Typography color={theme.palette.text.secondary}>
              {`${convertTwoNumbers(
                new Date(Number(service.createdAt) * 1000).getHours()
              )}:${convertTwoNumbers(new Date(Number(service.createdAt) * 1000).getMinutes())}`}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box mx={2} my={1.5}>
            {tokensInfo ? (
              <Typography color={theme.palette.text.secondary}>
                {`${formatUnits(BigInt(service.totalBudget), tokensInfo.decimals)} / ${formatUnits(
                  BigInt(service.paidBudget),
                  tokensInfo.decimals
                )}`}{" "}
                {tokensInfo.symbol}
              </Typography>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mx={2} my={1.5}>
            <Typography color={theme.palette.text.secondary}>
              {shortAddress(service.partner)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Stack ml={2} my={1.5} direction="row" justifyContent="space-between" alignItems="center">
            <Typography color={DEAL_STATES_COLORS[service.status]}>
              {DEAL_STATES[service.status]}
            </Typography>
            <IconButton
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                handleCopy(service.id);
              }}
            >
              <ContentCopy
                fontSize="small"
                sx={{
                  "&:hover": { color: theme.palette.text.primary },
                  color: theme.palette.text.secondary
                }}
              />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
      <Dialog
        open={isOpened}
        onClose={isRuningTx ? undefined : handleCloseDialog}
        sx={{
          "& .MuiDialog-paper": { borderRadius: 6 }
        }}
        fullWidth
      >
        <Stack padding={{ xs: 2, sm: 5 }} alignItems="center">
          <Typography fontSize="1.5rem" fontWeight={600} mb={1}>
            Milestones Overview
          </Typography>
          <Divider sx={{ marginTop: 2, marginBottom: 3, borderColor: "#121212", width: "100%" }} />
          <Stack spacing={2.5} width="100%">
            {service.milestones.length ? (
              service.milestones.map((milestone, index) => (
                <DropDown
                  key={`${Date.now()}-${milestone.name}-${milestone.deadline}-${index}`}
                  title={milestone.name}
                  icon={
                    Number(milestone.status) === 1 ? <TaskAltIcon color="success" /> : undefined
                  }
                >
                  <MilestonePreview
                    amount={`${formatUnits(milestone.amount, tokensInfo?.decimals || 18)} ${
                      tokensInfo?.symbol
                    }`}
                    deadline={Number(milestone.deadline) * 1000}
                    onApprove={
                      isBuyer() && Number(milestone.status) === 0
                        ? () => handleAcceptClick(index)
                        : undefined
                    }
                    description={milestone.description}
                  />
                </DropDown>
              ))
            ) : (
              <Typography textAlign="center" color={theme.palette.text.secondary}>
                No Milestones
              </Typography>
            )}
          </Stack>
          <Box mt={3}>
            {(service.creator === account && !service.isCreatorApprovedCancel) ||
            (service.partner === account && !service.isPartnerApprovedCancel) ? (
              <Button onClick={handleClickRequest} variant="contained">
                Request Cancel
              </Button>
            ) : service.isCreatorApprovedCancel && service.isPartnerApprovedCancel ? (
              <Button onClick={handleClickCancel} variant="contained">
                Cancel
              </Button>
            ) : (
              <Typography align="center">Canceling requested</Typography>
            )}
          </Box>
        </Stack>

        {isRuningTx ? (
          <Box
            position="absolute"
            width="100%"
            height="100%"
            top={0}
            left={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backdropFilter: "blur(1px)" }}
            bgcolor={`${theme.palette.background.default}A0`}
          >
            <ThreeDots height="100%" width={100} radius={3} color={theme.palette.primary.main} />
          </Box>
        ) : null}
      </Dialog>
    </Box>
  );
}

function ServicesBoard({ services, title, loading }: ServicesBoardProps) {
  const theme = useTheme();

  return (
    <MainBox>
      <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{title}</Typography>
        <Button variant="contained">
          <Typography mr={1} color="inherit">
            Export
          </Typography>
          <Export />
        </Button>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Box maxWidth="100%" sx={{ overflowX: "auto" }}>
        <Grid container alignItems="center" minWidth={875}>
          {loading || (services && services.length > 0) ? (
            <Fragment>
              <Grid item xs={2}>
                <Box mx={2} my={1.5}>
                  <Typography>Service Creator</Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box mx={2} my={1.5}>
                  <Typography>Service Date</Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box mx={2} my={1.5}>
                  <Typography>Service Value</Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box mx={2} my={1.5}>
                  <Typography>Service Recipient</Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box mx={2} my={1.5}>
                  <Typography>Service Status</Typography>
                </Box>
              </Grid>
              {!loading && services && services.length > 0 ? (
                <Grid item xs={12}>
                  {services &&
                    services?.map((service, index) => (
                      <ServiceRow
                        service={service}
                        key={`${Date.now()}-${service.createdAt}-${service.creator}-${index}`}
                      />
                    ))}
                </Grid>
              ) : null}
              {loading ? (
                <Fragment>
                  <LoadingRow />
                  <LoadingRow />
                </Fragment>
              ) : null}
            </Fragment>
          ) : (
            <Grid item xs={12}>
              <Typography
                textAlign="center"
                fontSize="0.875rem"
                my={2}
                color={theme.palette.text.secondary}
              >
                No services
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </MainBox>
  );
}

export default ServicesBoard;
