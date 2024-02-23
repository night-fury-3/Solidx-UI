import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import {
  Box,
  Button,
  Dialog,
  Divider,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";

import { useChainId } from "wagmi";
import { formatUnits, zeroAddress } from "viem";

import _ from "lodash";

import Success from "assets/icons/Success";
import MainBox from "components/MainBox";
import { dealContractAddress } from "config";
import useDealContract from "hooks/useDealContract";
import useServiceContract from "hooks/useServiceContract";
import useTokenInfo from "hooks/useTokenInfo";
import useNotifications from "hooks/useNotifications";
import { DealTypes } from "types/deal.type";

import { JoiningDealProps } from "../../types";

const OTC_STATES = ["Not created", "Opened", "Joined", "Approved", "Cancelled"];
const SERVICE_STATES = ["Not created", "Created", "Ongoing", "Achieved", "Cancelled"];

function JoiningDeal({ onBack, dealType }: JoiningDealProps) {
  const theme = useTheme();
  const { addNotification } = useNotifications();

  const [open, toggleOpen] = useState<boolean>(false);
  const [isRuningTx, toggleRunningTx] = useState<boolean>(false);
  const [isSuccess, toggleSuccess] = useState<boolean>(false);
  const [isVisibleSellingButton, toggleVisibleSellingButton] = useState<boolean>(true);

  const [dealID, setDealID] = useState<string>("");
  const { decimals, nameAndSymbol } = useTokenInfo();
  const { getDealInfo: getOTCInfo, joinDeal: joinOTC } = useDealContract();
  const { getServiceInfo, joinDeal: joinService } = useServiceContract();
  const { approve } = useTokenInfo();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dealInfo, setDealInfo] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const chainId = useChainId();

  const getDealInfo = useMemo(
    () =>
      _.debounce(async (dealType_, dealId_: string) => {
        setDealInfo(undefined);
        setLoading(true);
        try {
          if (dealType_ === DealTypes.OTC) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const _dealInfo: any = await getOTCInfo(dealId_.replace("0x", ""));
            const sellingToken =
              _dealInfo.sellingToken === zeroAddress
                ? "ETH"
                : (await nameAndSymbol(_dealInfo.sellingToken))[0].result;
            const buyingToken =
              _dealInfo.buyingToken === zeroAddress
                ? "ETH"
                : (await nameAndSymbol(_dealInfo.buyingToken))[0].result;
            const sellingDecimals =
              _dealInfo.sellingToken === zeroAddress ? 18 : await decimals(_dealInfo.sellingToken);
            const buyingDecimals =
              _dealInfo.buyingToken === zeroAddress ? 18 : await decimals(_dealInfo.buyingToken);

            _dealInfo.sellingAmountFormed = formatUnits(_dealInfo.sellingAmount, sellingDecimals);
            _dealInfo.buyingAmountFormed = formatUnits(_dealInfo.buyingAmount, buyingDecimals);
            _dealInfo.sellingTokenFormed = sellingToken;
            _dealInfo.buyingTokenFormed = buyingToken;
            setDealInfo(_dealInfo);
          } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const _dealInfo: any = await getServiceInfo(dealId_.replace("0x", ""));
            const paymentToken =
              _dealInfo.paymentToken === zeroAddress
                ? "ETH"
                : (await nameAndSymbol(_dealInfo.paymentToken))[0].result;
            const paymentDecimals =
              _dealInfo.paymentToken === zeroAddress ? 18 : await decimals(_dealInfo.paymentToken);
            _dealInfo.totalBudgetFormed = formatUnits(_dealInfo.totalBudget, paymentDecimals);
            _dealInfo.paymentTokenFormed = paymentToken;
            setDealInfo(_dealInfo);
          }
        } catch (error) {
          console.log(error);
          setDealInfo(undefined);
        } finally {
          setLoading(false);
        }
      }, 300),
    [getOTCInfo, getServiceInfo, decimals, nameAndSymbol]
  );

  const handleJoinOpen = useCallback(() => {
    toggleOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    toggleOpen(false);
    toggleRunningTx(false);
    toggleSuccess(false);
  }, []);

  const handleApproveToken = useCallback(async () => {
    try {
      toggleRunningTx(true);
      if (dealType === DealTypes.OTC) {
        await approve(dealInfo.buyingToken, dealContractAddress[chainId], dealInfo.buyingAmount);
      } else {
        await approve(dealInfo.paymentToken, dealContractAddress[chainId], dealInfo.totalBudget);
      }
      toggleVisibleSellingButton(false);
    } catch (error) {
      console.log(error);
      addNotification({
        message: "Failed to approve",
        type: "danger"
      });
    } finally {
      toggleRunningTx(false);
    }
  }, [dealType, approve, dealInfo, chainId, addNotification]);

  const handleSubmit = useCallback(async () => {
    try {
      toggleRunningTx(true);
      if (dealType === DealTypes.OTC && dealInfo) {
        await joinOTC(
          dealID.startsWith("0x") ? dealID : `0x${dealID}`,
          dealInfo.buyingToken === zeroAddress ? dealInfo.buyingAmount : undefined
        );
        addNotification({
          message: "You successfully joined",
          type: "success"
        });
      } else {
        await joinService(
          dealID.startsWith("0x") ? dealID : `0x${dealID}`,
          dealInfo.isSelling && dealInfo.paymentToken === zeroAddress
            ? dealInfo.totalBudget
            : undefined
        );
        addNotification({
          message: "You successfully joined",
          type: "success"
        });
      }
      if (dealID !== "") {
        getDealInfo(dealType, `0x${dealID}`);
      }
      toggleSuccess(true);
    } catch (error) {
      console.log(error);
      addNotification({
        message: "Failed to join",
        type: "danger"
      });
    } finally {
      toggleRunningTx(false);
    }
  }, [addNotification, dealID, dealInfo, dealType, getDealInfo, joinOTC, joinService]);

  useEffect(() => {
    if (dealID !== "") {
      getDealInfo(dealType, `0x${dealID}`);
    }
  }, [dealID, dealType, getDealInfo]);

  useEffect(() => {
    if (open && dealInfo) {
      toggleRunningTx(true);
      if (dealType === DealTypes.OTC && dealInfo.buyingToken === zeroAddress) {
        toggleVisibleSellingButton(false);
      } else if (
        dealType === DealTypes.Service &&
        (dealInfo.paymentToken === zeroAddress || !dealInfo.isSelling)
      ) {
        toggleVisibleSellingButton(false);
      }
      toggleRunningTx(false);
    }
  }, [open, dealID, dealType, dealInfo]);

  return (
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
        <Typography fontSize={20} lineHeight="56px">
          Join a Deal
        </Typography>
      </Stack>
      <Divider sx={{ marginTop: 2, marginBottom: 2.5 }} />
      <TextField
        value={dealID}
        onChange={(ev) => setDealID(ev.target.value)}
        size="small"
        placeholder="Paste your deal ID"
        fullWidth
      />

      <Stack spacing={2} mt={3} px={2} display={!isLoading && !dealInfo ? "none" : "flex"}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography color={theme.palette.text.secondary} fontSize="smaller">
            Creator
          </Typography>
          {isLoading ? (
            <Skeleton variant="rounded" width={Math.random() * 50 + 30} height={20} />
          ) : null}
          {!dealInfo ? null : (
            <Typography fontSize="smaller">
              {`${dealInfo.creator.slice(0, 10)}...${dealInfo.creator.slice(-3)}`}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography color={theme.palette.text.secondary} fontSize="smaller">
            Type
          </Typography>
          {isLoading ? (
            <Skeleton variant="rounded" width={Math.random() * 50 + 30} height={20} />
          ) : null}
          {!dealInfo ? null : (
            <Typography fontSize="smaller">
              {dealType === DealTypes.OTC ? "OTC Exchange" : "Service Escrow"}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography color={theme.palette.text.secondary} fontSize="smaller">
            Status
          </Typography>
          {isLoading ? (
            <Skeleton variant="rounded" width={Math.random() * 50 + 30} height={20} />
          ) : null}
          {!dealInfo ? null : (
            <Typography fontSize="smaller">
              {dealType === DealTypes.OTC
                ? OTC_STATES[dealInfo.status]
                : SERVICE_STATES[dealInfo.status]}
            </Typography>
          )}
        </Stack>
        {dealType === DealTypes.Service && dealInfo && dealInfo.isSelling ? (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography color={theme.palette.text.secondary} fontSize="smaller">
              Selling service
            </Typography>
            {isLoading ? (
              <Skeleton variant="rounded" width={Math.random() * 50 + 30} height={20} />
            ) : null}
            {!dealInfo ? null : (
              <Typography fontSize="smaller">{dealInfo.serviceCaption}</Typography>
            )}
          </Stack>
        ) : null}
        {dealType === 0 || (dealType === 1 && dealInfo && !dealInfo.isSelling) ? (
          <Fragment>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography color={theme.palette.text.secondary} fontSize="smaller">
                Selling token
              </Typography>
              {isLoading ? (
                <Skeleton variant="rounded" width={Math.random() * 50 + 30} height={20} />
              ) : null}
              {!dealInfo ? null : (
                <Typography fontSize="smaller">
                  {dealType === DealTypes.OTC
                    ? `${dealInfo.sellingTokenFormed}`
                    : `${dealInfo.paymentTokenFormed}`}
                </Typography>
              )}
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography color={theme.palette.text.secondary} fontSize="smaller">
                Selling amount
              </Typography>
              {isLoading ? (
                <Skeleton variant="rounded" width={Math.random() * 50 + 30} height={20} />
              ) : null}
              {!dealInfo ? null : (
                <Typography fontSize="smaller">
                  {dealType === DealTypes.OTC
                    ? dealInfo.sellingAmountFormed
                    : dealInfo.totalBudgetFormed}
                </Typography>
              )}
            </Stack>
          </Fragment>
        ) : null}
        {dealType === DealTypes.Service && dealInfo && !dealInfo.isSelling ? (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography color={theme.palette.text.secondary} fontSize="smaller">
              Buying service
            </Typography>
            {isLoading ? (
              <Skeleton variant="rounded" width={Math.random() * 50 + 30} height={20} />
            ) : null}
            {!dealInfo ? null : (
              <Typography fontSize="smaller">{dealInfo.serviceCaption}</Typography>
            )}
          </Stack>
        ) : null}
        {dealType === 0 || (dealType === 1 && dealInfo && dealInfo.isSelling) ? (
          <Fragment>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography color={theme.palette.text.secondary} fontSize="smaller">
                Buying token
              </Typography>
              {isLoading ? (
                <Skeleton variant="rounded" width={Math.random() * 50 + 30} height={20} />
              ) : null}
              {!dealInfo ? null : (
                <Typography fontSize="smaller">
                  {dealType === DealTypes.OTC
                    ? `${dealInfo.buyingTokenFormed}`
                    : `${dealInfo.paymentTokenFormed}`}
                </Typography>
              )}
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography color={theme.palette.text.secondary} fontSize="smaller">
                Buying amount
              </Typography>
              {isLoading ? (
                <Skeleton variant="rounded" width={Math.random() * 50 + 30} height={20} />
              ) : null}
              {!dealInfo ? null : (
                <Typography fontSize="smaller">
                  {dealType === DealTypes.OTC
                    ? dealInfo.buyingAmountFormed
                    : dealInfo.totalBudgetFormed}
                </Typography>
              )}
            </Stack>
          </Fragment>
        ) : null}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography color={theme.palette.text.secondary} fontSize="smaller">
            Opened at
          </Typography>
          {isLoading ? (
            <Skeleton variant="rounded" width={Math.random() * 50 + 30} height={20} />
          ) : null}
          {!dealInfo ? null : (
            <Typography fontSize="smaller">
              {new Date(Number(dealInfo.createdAt.toString()) * 1000).toDateString().slice(4)}
            </Typography>
          )}
        </Stack>
        {dealInfo && dealInfo.status === 4 ? (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography color={theme.palette.text.secondary} fontSize="smaller">
              Closed at
            </Typography>
            <Skeleton variant="rounded" width={Math.random() * 50 + 30} height={20} />
          </Stack>
        ) : null}
        {/* {dealInfo && dealInfo.status === 3 ? (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography color={theme.palette.text.secondary} fontSize="smaller">
              Confirmed at
            </Typography>
            <Skeleton variant="rounded" width={Math.random() * 50 + 30} height={20} />
          </Stack>
        ) : null} */}
      </Stack>
      {dealInfo && dealInfo.status * 1 === 1 ? (
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          disabled={dealID === ""}
          fullWidth
          onClick={handleJoinOpen}
        >
          Join
        </Button>
      ) : null}
      <Dialog
        open={open}
        onClose={isRuningTx ? undefined : handleClose}
        sx={{ "& .MuiDialog-paper": { borderRadius: 6 } }}
        fullWidth
      >
        {!isSuccess ? (
          <Box padding={{ xs: 2, sm: 5 }}>
            <Typography variant="h4" textAlign={"center"} mb={3}>
              Join a Deal
            </Typography>
            {isVisibleSellingButton ? (
              <Button
                onClick={handleApproveToken}
                variant="contained"
                fullWidth
                disabled={isRuningTx}
              >
                Approve Token
              </Button>
            ) : null}
            {!isVisibleSellingButton ? (
              <Button onClick={handleSubmit} sx={{ marginTop: 3 }} fullWidth variant="contained">
                Submit
              </Button>
            ) : null}
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
                <ThreeDots
                  height="100%"
                  width={100}
                  radius={3}
                  color={theme.palette.primary.main}
                />
              </Box>
            ) : null}
          </Box>
        ) : (
          <Stack padding={{ xs: 2, sm: 5 }} spacing={6} justifyContent="center" alignItems="center">
            <Success />
            <Stack spacing={2} alignItems="center">
              <Typography fontSize="1.5rem" fontWeight={600}>
                Your deal is successfully created
              </Typography>
              <Typography
                textAlign="center"
                fontSize="0.875rem"
                color={theme.palette.text.secondary}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
              </Typography>
            </Stack>
            <Button variant="text" onClick={handleClose}>
              Back
            </Button>
          </Stack>
        )}
      </Dialog>
    </MainBox>
  );
}

export default JoiningDeal;
