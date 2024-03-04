import { Fragment, useCallback, useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import {
  Box,
  Button,
  Dialog,
  Grid,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";

import { useAccount, useChainId } from "wagmi";
import { isAddress, parseUnits, zeroAddress } from "viem";
import { useFormik } from "formik";
import * as yup from "yup";

import Success from "assets/icons/Success";
import Swap from "assets/icons/Swap";
import { SDX, WETH, dealContractAddress } from "config";
import { coins } from "config/coins";
import useDealContract from "hooks/useDealContract";
import useTokenInfo from "hooks/useTokenInfo";
import useNotifications from "hooks/useNotifications";
import { Coin } from "types/coin.type";

import CoinInput from "../CoinInput";

interface IExchangeForm {
  firstAmount: string;
  secondAmount: string;
  partner: string;
}

const validationSchema = yup.object().shape({
  firstAmount: yup
    .string()
    .required()
    .test((value) => Number(value) > 0),
  secondAmount: yup
    .string()
    .required()
    .test((value) => Number(value) > 0),
  partner: yup
    .string()
    .required("Partner address is required")
    .test("is-address", "Invalid partner address", (value) => isAddress(value))
    .not([zeroAddress], "Invalid partner address")
});

function ExchangeDeal() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [_, startTransition] = useTransition();

  const [isSelling, toggleSelling] = useState<boolean>(true);
  const { addNotification } = useNotifications();

  const chainId = useChainId();
  const { address: account } = useAccount();

  const [isCreatingDialogOpened, toggleCreatingDialogOpened] = useState<boolean>(false);
  const [isRuningTx, toggleRunningTx] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isVisibleFeeButton, toggleVisibleFeeButton] = useState<boolean>(true);
  const [isVisibleSellingButton, toggleVisibleSellingButton] = useState<boolean>(true);
  const [isInsufficientFee, toggleInsufficientFee] = useState<boolean>(false);

  const [fee_Balance, setFeeBalance] = useState<bigint>(BigInt("0"));
  const [fee_Amount, setFeeAmount] = useState<bigint>(BigInt("0"));

  const [firstCoin, setFirstCoin] = useState<Coin>();
  const [secondCoin, setSecondCoin] = useState<Coin>();

  const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smDown = useMediaQuery("(max-width:700px)");

  const { createDeal, getFeeAmount } = useDealContract();
  const { allowance: getAllowance, approve, balanceOf, decimals } = useTokenInfo();

  const {
    errors,
    handleChange,
    handleSubmit: handleCreate,
    setFieldValue,
    touched: formTouched,
    values: formValues
  } = useFormik<IExchangeForm>({
    validationSchema,
    initialValues: {
      firstAmount: "0",
      secondAmount: "0",
      partner: ""
    },
    onSubmit: () => {
      toggleCreatingDialogOpened(true);
    }
  });

  useEffect(() => {
    setFirstCoin(coins[chainId][0]);
    setSecondCoin(coins[chainId][0]);
  }, [chainId]);

  const handleToggleSelling = useCallback(() => {
    toggleSelling((state) => !state);
  }, []);

  const handleClose = useCallback(() => {
    toggleCreatingDialogOpened(false);
    setSuccess(false);
  }, []);

  const calcFeeAmount = useCallback(async () => {
    const sellingCoin = isSelling ? firstCoin : secondCoin;
    const sellingDecimals =
      sellingCoin?.address === zeroAddress
        ? 18
        : Number(await decimals(sellingCoin?.address as `0x${string}`));
    const sellingAmount = parseUnits(formValues.firstAmount.toString(), sellingDecimals);
    if (sellingCoin?.address === zeroAddress) {
      return await getFeeAmount({ address: WETH, amount: sellingAmount });
    } else {
      return await getFeeAmount({
        address: sellingCoin?.address,
        amount: sellingAmount
      });
    }
  }, [decimals, firstCoin, formValues.firstAmount, getFeeAmount, isSelling, secondCoin]);

  const updateButtonsStatus = useCallback(async () => {
    if (isCreatingDialogOpened && account) {
      startTransition(() => toggleRunningTx(true));

      try {
        const feeAmount = await calcFeeAmount();
        setFeeAmount(feeAmount);
        const feeBalance = await balanceOf(SDX as `0x${string}`, account);
        setFeeBalance(feeBalance);
        if (feeBalance < feeAmount) {
          toggleInsufficientFee(true);
          startTransition(() => toggleRunningTx(false));
          return;
        } else {
          toggleInsufficientFee(false);
        }
        const feeAllowance = (await getAllowance(
          SDX as `0x${string}`,
          account,
          dealContractAddress[chainId]
        )) as bigint;
        if (feeAmount === BigInt(0) || feeAllowance >= feeAmount) {
          toggleVisibleFeeButton(false);
        } else {
          toggleVisibleFeeButton(true);
        }
      } catch (error) {
        toggleVisibleFeeButton(true);
      }

      try {
        const sellingCoin = isSelling ? firstCoin : secondCoin;

        if (sellingCoin?.address === zeroAddress) {
          toggleVisibleSellingButton(false);
        } else {
          const firstDecimals =
            firstCoin?.address === zeroAddress
              ? 18
              : Number(await decimals(firstCoin?.address as `0x${string}`));
          const secondDecimals =
            secondCoin?.address === zeroAddress
              ? 18
              : Number(await decimals(secondCoin?.address as `0x${string}`));
          const sellingAmount = isSelling
            ? parseUnits(formValues.firstAmount.toString(), firstDecimals)
            : parseUnits(formValues.secondAmount.toString(), secondDecimals);
          const sellingAllowance = (await getAllowance(
            sellingCoin?.address as `0x${string}`,
            account,
            dealContractAddress[chainId]
          )) as bigint;

          if (sellingAllowance >= sellingAmount) {
            toggleVisibleSellingButton(false);
          } else {
            toggleVisibleSellingButton(true);
          }
        }
      } catch (error) {
        toggleVisibleSellingButton(true);
      } finally {
        startTransition(() => toggleRunningTx(false));
      }
    }
  }, [
    account,
    balanceOf,
    calcFeeAmount,
    chainId,
    decimals,
    firstCoin,
    formValues.firstAmount,
    formValues.secondAmount,
    getAllowance,
    isCreatingDialogOpened,
    isSelling,
    secondCoin
  ]);

  useEffect(() => {
    updateButtonsStatus();
  }, [updateButtonsStatus]);

  const handleSubmit = useCallback(async () => {
    try {
      toggleRunningTx(true);
      const firstDecimals =
        firstCoin?.address === zeroAddress
          ? 18
          : Number(await decimals(firstCoin?.address as `0x${string}`));
      const secondDecimals =
        secondCoin?.address === zeroAddress
          ? 18
          : Number(await decimals(secondCoin?.address as `0x${string}`));
      const sellingAmount = isSelling
        ? parseUnits(formValues.firstAmount.toString(), firstDecimals)
        : parseUnits(formValues.secondAmount.toString(), secondDecimals);
      const sellingCoin = isSelling ? firstCoin : secondCoin;

      const buyingAmount = !isSelling
        ? parseUnits(formValues.firstAmount.toString(), firstDecimals)
        : parseUnits(formValues.secondAmount.toString(), secondDecimals);
      const buyingCoin = !isSelling ? firstCoin : secondCoin;

      await createDeal(
        formValues.partner,
        sellingCoin?.address || zeroAddress,
        buyingCoin?.address || zeroAddress,
        sellingAmount,
        buyingAmount
      );

      addNotification({
        message: "Your deal is successfully created",
        type: "success"
      });

      setSuccess(true);
    } catch (error) {
      console.log(error);
      addNotification({
        message: "Failed to create a deal",
        type: "danger"
      });
    } finally {
      startTransition(() => toggleRunningTx(false));
    }
  }, [addNotification, createDeal, formValues, isSelling, firstCoin, secondCoin, decimals]);

  const handleApproveFee = useCallback(async () => {
    try {
      toggleRunningTx(true);
      const feeAmount = await calcFeeAmount();

      await approve(SDX, dealContractAddress[chainId], feeAmount.toString());

      await updateButtonsStatus();
    } catch (error) {
      console.log(error);
      addNotification({
        message: "Failed to approve",
        type: "danger"
      });
    } finally {
      toggleRunningTx(false);
    }
  }, [calcFeeAmount, approve, chainId, updateButtonsStatus, addNotification]);

  const handleApproveSelling = useCallback(async () => {
    try {
      toggleRunningTx(true);
      const firstDecimals =
        firstCoin?.address === zeroAddress
          ? 18
          : Number(await decimals(firstCoin?.address as `0x${string}`));
      const secondDecimals =
        secondCoin?.address === zeroAddress
          ? 18
          : Number(await decimals(secondCoin?.address as `0x${string}`));
      const sellingAmount = isSelling
        ? parseUnits(formValues.firstAmount.toString(), firstDecimals)
        : parseUnits(formValues.secondAmount.toString(), secondDecimals);
      const sellingCoin = isSelling ? firstCoin : secondCoin;

      await approve(
        sellingCoin?.address as `0x${string}`,
        dealContractAddress[chainId],
        sellingAmount.toString()
      );
      await updateButtonsStatus();
    } catch (error) {
      console.log(error);
      addNotification({
        message: "Failed to approve",
        type: "danger"
      });
    } finally {
      toggleRunningTx(false);
    }
  }, [
    firstCoin,
    decimals,
    secondCoin,
    isSelling,
    formValues.firstAmount,
    formValues.secondAmount,
    approve,
    chainId,
    updateButtonsStatus,
    addNotification
  ]);

  return (
    <Fragment>
      <form onSubmit={handleCreate}>
        <Stack spacing={4} mt={4}>
          <Stack
            direction={
              (mdUp && xlDown) || smDown
                ? `column${isSelling ? "" : "-reverse"}`
                : `row${isSelling ? "" : "-reverse"}`
            }
            spacing={2}
            alignItems="center"
          >
            <CoinInput
              amount={formValues.firstAmount}
              coin={firstCoin}
              onAmountChange={(value) => setFieldValue("firstAmount", value)}
              onCoinChange={setFirstCoin}
              inputError={Boolean(errors.firstAmount) && formTouched.firstAmount}
            />
            <Box>
              <Box
                onClick={handleToggleSelling}
                bgcolor={`${theme.palette.background.paper}A0`}
                borderRadius={2}
                width={32}
                height={32}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: theme.palette.background.paper
                  }
                }}
              >
                <Swap />
              </Box>
            </Box>
            <CoinInput
              amount={formValues.secondAmount}
              coin={secondCoin}
              onAmountChange={(value) => setFieldValue("secondAmount", value)}
              onCoinChange={setSecondCoin}
              inputError={Boolean(errors.secondAmount) && formTouched.secondAmount}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography fontSize={{ xs: 18, sm: 20 }} lineHeight="20px">
              Partner address
            </Typography>
            <TextField
              id="partner"
              name="partner"
              value={formValues.partner}
              onChange={handleChange}
              size="medium"
              placeholder={zeroAddress}
              error={Boolean(errors.partner) && formTouched.partner}
              helperText={Boolean(errors.partner) && formTouched.partner ? errors.partner : null}
            />
          </Stack>
          <Button variant="contained" type="submit">
            Create
          </Button>
        </Stack>
      </form>
      {/*------- Deal Creation Dialog -------*/}
      <Dialog
        open={isCreatingDialogOpened}
        onClose={isRuningTx ? undefined : handleClose}
        sx={{ "& .MuiDialog-paper": { borderRadius: 6 } }}
        fullWidth
      >
        {!isSuccess ? (
          <Box padding={{ xs: 2, sm: 5 }}>
            <Typography variant="h4" textAlign={"center"}>
              Create a Deal
            </Typography>
            <Grid container spacing={2} mt={3}>
              <Grid item xs={6}>
                <Stack
                  spacing={1}
                  alignItems="center"
                  borderRadius={3}
                  py={2}
                  bgcolor={theme.palette.background.default}
                >
                  <Typography>Selling</Typography>
                  <Typography color={theme.palette.text.secondary}>
                    {firstCoin?.name.slice(0, 8)}
                  </Typography>
                  <Typography color={theme.palette.text.secondary} fontWeight={600}>
                    {isSelling ? formValues.firstAmount : formValues.secondAmount}{" "}
                    {isSelling ? firstCoin?.symbol : secondCoin?.symbol}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack
                  spacing={1}
                  alignItems="center"
                  borderRadius={3}
                  py={2}
                  bgcolor={theme.palette.background.default}
                >
                  <Typography>Buying</Typography>
                  <Typography color={theme.palette.text.secondary}>
                    {secondCoin?.name.slice(0, 8)}
                  </Typography>
                  <Typography color={theme.palette.text.secondary} fontWeight={600}>
                    {!isSelling ? formValues.firstAmount : formValues.secondAmount}{" "}
                    {!isSelling ? firstCoin?.symbol : secondCoin?.symbol}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack
                  spacing={1}
                  alignItems="center"
                  borderRadius={3}
                  py={2}
                  bgcolor={theme.palette.background.default}
                >
                  <Tooltip title={account}>
                    <Typography color={theme.palette.text.secondary}>
                      Creator:{" "}
                      <Typography
                        component="span"
                        color="inherit"
                        fontWeight={600}
                      >{`${account?.slice(0, 16)} ...`}</Typography>
                    </Typography>
                  </Tooltip>
                  <Tooltip title={formValues.partner}>
                    <Typography color={theme.palette.text.secondary}>
                      Partner:{" "}
                      <Typography
                        component="span"
                        color="inherit"
                        fontWeight={600}
                      >{`${formValues.partner.slice(0, 16)} ...`}</Typography>
                    </Typography>
                  </Tooltip>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack
                  spacing={1}
                  alignItems="center"
                  borderRadius={3}
                  py={2}
                  bgcolor={theme.palette.background.default}
                >
                    <Typography color={theme.palette.text.secondary}>
                      Fee Required:{" "}
                      <Typography component="span" color="inherit" fontWeight={600}>{`${
                        Number(fee_Amount) / 1e9
                      } SOLIDX`}</Typography>
                    </Typography>
                    <Typography color={theme.palette.text.secondary}>
                      Your Balance:{" "}
                      <Typography component="span" color="inherit" fontWeight={600}>{`${
                        Number(fee_Balance) / 1e9
                      } SOLIDX`}</Typography>
                    </Typography>
                </Stack>
              </Grid>
            </Grid>
            {isInsufficientFee ? (
              <Fragment>
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: `${theme.palette.error.main}80`,
                    borderRadius: 2,
                    py: 1.25
                  }}
                  mt={3}
                >
                  <Typography align="center" color={theme.palette.text.secondary}>
                    Insufficient Fee
                  </Typography>
                </Box>
                <Stack alignItems="center" mt={1.5}>
                  <Link
                    target="_blank"
                    href={
                      "https://app.uniswap.org/swap?outputCurrency=0xA76A6cC7fa9ab055b6101d443FD975520eb8cC75"
                    }
                    color={theme.palette.text.secondary}
                    fontSize="0.875rem"
                    sx={{ textDecoration: "underline" }}
                  >
                    Click here to get <b>Solidx</b>
                  </Link>
                </Stack>
              </Fragment>
            ) : (
              <Fragment>
                <Grid container direction="row" spacing={2} mt={3}>
                  <Grid
                    item
                    xs={isVisibleSellingButton ? 6 : 12}
                    display={isVisibleFeeButton ? "block" : "none"}
                  >
                    <Button
                      variant="contained"
                      onClick={handleApproveFee}
                      fullWidth
                      disabled={isRuningTx}
                    >
                      Approve Fee
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={isVisibleFeeButton ? 6 : 12}
                    display={isVisibleSellingButton ? "block" : "none"}
                  >
                    <Button
                      onClick={handleApproveSelling}
                      variant="contained"
                      fullWidth
                      disabled={isRuningTx}
                    >
                      Approve {isSelling ? firstCoin?.symbol : secondCoin?.symbol}
                    </Button>
                  </Grid>
                </Grid>
                {!isVisibleFeeButton && !isVisibleSellingButton ? (
                  <Button
                    onClick={handleSubmit}
                    sx={{ marginTop: 3 }}
                    fullWidth
                    variant="contained"
                  >
                    Submit
                  </Button>
                ) : null}
              </Fragment>
            )}

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
              {/* <Typography
                textAlign="center"
                fontSize="0.875rem"
                color={theme.palette.text.secondary}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
              </Typography> */}
            </Stack>
            <Button variant="contained" onClick={() => navigate("/my-deals")}>
              View Deal
            </Button>
            <Button variant="text" onClick={handleClose}>
              Back
            </Button>
          </Stack>
        )}
      </Dialog>
    </Fragment>
  );
}

export default ExchangeDeal;
