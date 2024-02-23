import { Fragment, useCallback, useEffect, useRef, useState } from "react";
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
import ForumIcon from "@mui/icons-material/Forum";

import { useAccount } from "wagmi";
import { checksumAddress, formatUnits, zeroAddress } from "viem";

import Export from "assets/icons/Export";
import MainBox from "components/MainBox";
import StyledOutlineButton from "components/StyledOutlinedButton";
import useNotifications from "hooks/useNotifications";
import useTokenInfo from "hooks/useTokenInfo";
import useDealContract from "hooks/useDealContract";
import { convertTwoNumbers } from "utils";

import type { DealsBoardProps } from "../types";
import { type Deal, DealStatus } from "types/deal.type";
import { useNavigate } from "react-router-dom";

type TTokensInfo = {
  sellingSymbol: string;
  sellingDecimals: number;
  buyingSymbol: string;
  buyingDecimals: number;
};

function LoadingRow() {
  return (
    <Fragment>
      <Grid item xs={2}>
        <Box mx={2} my={1.5}>
          <Skeleton width={35} height={30} />
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box mx={2} my={1.5}>
          <Skeleton width={35} height={30} />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box mx={2} my={1.5}>
          <Skeleton width={45} height={30} />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box mx={2} my={1.5}>
          <Skeleton width={45} height={30} />
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box mx={2} my={1.5}>
          <Skeleton width={35} height={30} />
        </Box>
      </Grid>
    </Fragment>
  );
}

function DealRow({ deal }: { deal: Deal }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const { address: account } = useAccount();
  const { addNotification } = useNotifications();
  const { nameAndSymbol, decimals } = useTokenInfo();
  const { approveDeal, cancelDeal } = useDealContract();
  const [tokensInfo, setTokesInfo] = useState<TTokensInfo>();
  const [isOpened, toggleOpen] = useState<boolean>(false);
  const [isRuningTx, toggleRunningTx] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timer | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const init = async () => {
      const sellingSymbol =
        deal.sellingToken === zeroAddress
          ? "ETH"
          : (await nameAndSymbol(deal.sellingToken))[0].result || "_";
      const sellingDecimals =
        deal.sellingToken === zeroAddress ? 18 : await decimals(deal.sellingToken);
      const buyingSymbol =
        deal.buyingToken === zeroAddress
          ? "ETH"
          : (await nameAndSymbol(deal.buyingToken))[0].result || "_";
      const buyingDecimals =
        deal.buyingToken === zeroAddress ? 18 : await decimals(deal.buyingToken);
      setTokesInfo({ sellingDecimals, buyingDecimals, buyingSymbol, sellingSymbol });
    };
    init();
  }, [deal.buyingToken, deal.sellingToken, decimals, nameAndSymbol]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (isOpened) {
      timerRef.current = setInterval(() => {
        const ellapsed = Date.now() - new Date(Number(deal.createdAt) * 1000).getTime();
        console.log(ellapsed);
        setRemainingTime(7200000 > ellapsed ? 7200000 - ellapsed : 0);
      }, 1300);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [deal.createdAt, isOpened]);

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
        message: "Deal hash Id copied!",
        type: "info"
      });
    },
    [addNotification]
  );

  const handleCloseDialog = useCallback(() => {
    toggleOpen(false);
  }, []);

  const handleClick = useCallback(() => {
    if (deal.status === DealStatus.Created || deal.status === DealStatus.Joined) {
      toggleOpen(true);
    }
  }, [deal.status]);

  const handleAcceptClick = useCallback(async () => {
    try {
      toggleRunningTx(true);
      await approveDeal(deal.id);
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
  }, [addNotification, approveDeal, deal.id]);

  const handleCancelClick = useCallback(async () => {
    try {
      toggleRunningTx(true);
      await cancelDeal(deal.id);
      toggleOpen(false);
      addNotification({
        title: "Success!",
        message: "Canceled successfully!",
        type: "success"
      });
    } catch (error) {
      console.log(error);
    } finally {
      toggleRunningTx(false);
    }
  }, [addNotification, cancelDeal, deal.id]);

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
              {shortAddress(deal.creator)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mx={2} my={1.5}>
            <Typography color={theme.palette.text.secondary}>
              {new Date(Number(deal.createdAt) * 1000).toDateString().slice(4)}
            </Typography>
            <Typography color={theme.palette.text.secondary}>
              {`${convertTwoNumbers(
                new Date(Number(deal.createdAt) * 1000).getHours()
              )}:${convertTwoNumbers(new Date(Number(deal.createdAt) * 1000).getMinutes())}`}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box mx={2} my={1.5}>
            {tokensInfo ? (
              <Fragment>
                <Typography color={theme.palette.text.secondary}>
                  Selling:{" "}
                  {`${formatUnits(BigInt(deal.sellingAmount), tokensInfo.sellingDecimals)} ${
                    tokensInfo ? tokensInfo.sellingSymbol : ""
                  }`}
                </Typography>
                <Typography color={theme.palette.text.secondary}>
                  Buying:{" "}
                  {`${formatUnits(BigInt(deal.buyingAmount), tokensInfo.buyingDecimals)} ${
                    tokensInfo ? tokensInfo.buyingSymbol : ""
                  }`}
                </Typography>
              </Fragment>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mx={2} my={1.5}>
            <Typography color={theme.palette.text.secondary}>
              {shortAddress(deal.partner)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Stack ml={2} my={1.5} direction="row" justifyContent="space-between" alignItems="center">
            <Typography color={DEAL_STATES_COLORS[deal.status]}>
              {DEAL_STATES[deal.status]}
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <IconButton
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(
                    `/?chat_partner=${deal.creator === account ? deal.partner : deal.creator}`
                  );
                }}
              >
                <ForumIcon
                  fontSize="small"
                  sx={{
                    "&:hover": { color: theme.palette.text.primary },
                    color: theme.palette.text.secondary
                  }}
                />
              </IconButton>
              <IconButton
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  handleCopy(deal.id);
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
        <Stack
          padding={{ xs: 2, sm: 5 }}
          alignItems="center"
          sx={{
            bgcolor: theme.palette.background.default
          }}
        >
          <Typography align="center" fontSize="1.125rem">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Typography>
          <Divider
            sx={{
              marginTop: 2,
              marginBottom: 2.5,
              width: "100%"
            }}
          />
          <Typography color={theme.palette.primary.main} fontSize="1.25rem">
            {`${convertTwoNumbers(Math.floor(remainingTime / 3600000))} : ${convertTwoNumbers(
              Math.floor(remainingTime / 60000) % 60
            )} : ${convertTwoNumbers(Math.floor(remainingTime / 1000) % 60)}`}
          </Typography>

          <Stack direction="row" spacing={2} width="100%" mt={2}>
            {remainingTime === 0 ? (
              account === deal.creator ? (
                <StyledOutlineButton onClick={handleCancelClick} fullWidth>
                  Cancel Deal
                </StyledOutlineButton>
              ) : (
                <Button variant="contained" onClick={handleCancelClick} fullWidth>
                  Withdraw
                </Button>
              )
            ) : null}
            {account === deal.creator && deal.status === DealStatus.Joined ? (
              <Button variant="contained" onClick={handleAcceptClick} fullWidth>
                Accept
              </Button>
            ) : null}
          </Stack>
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

function DealsBoard({ deals, title, loading }: DealsBoardProps) {
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
          {loading || (deals && deals.length > 0) ? (
            <Fragment>
              <Grid item xs={2}>
                <Box mx={2} my={1.5}>
                  <Typography>Deal Creator</Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box mx={2} my={1.5}>
                  <Typography>Deal Date</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box mx={2} my={1.5}>
                  <Typography>Deal Value</Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box mx={2} my={1.5}>
                  <Typography>Deal Recipient</Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box mx={2} my={1.5}>
                  <Typography>Deal Status</Typography>
                </Box>
              </Grid>
              {!loading && deals && deals.length > 0 ? (
                <Fragment>
                  <Grid item xs={12}>
                    {deals &&
                      deals?.map((deal, index) => (
                        <DealRow
                          deal={deal}
                          key={`${Date.now()}-${deal.createdAt}-${deal.creator}-${index}`}
                        />
                      ))}
                  </Grid>
                </Fragment>
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
                No deals
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </MainBox>
  );
}

export default DealsBoard;
