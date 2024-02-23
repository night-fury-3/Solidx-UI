import { Fragment, useCallback, useEffect, useState, useTransition } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Dialog,
  Grid,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";

import { useAccount, useChainId } from "wagmi";
import { useFormik } from "formik";
import * as yup from "yup";
import { isAddress, parseUnits, zeroAddress } from "viem";
import NP from "number-precision";

import Exchange from "assets/icons/Exchange";
import Success from "assets/icons/Success";
import Swap from "assets/icons/Swap";
import { SDX, WETH, serviceContractAddress } from "config";
import { coins } from "config/coins";
import useTokenInfo from "hooks/useTokenInfo";
import useNotifications from "hooks/useNotifications";
import useServiceContract from "hooks/useServiceContract";

import CoinInput from "../CoinInput";
import ServiceInput from "../ServiceInput";

import type { Milestone } from "../../../types";
import type { Coin } from "types/coin.type";

interface IExchangeForm {
  coinAmount: string;
  note: string;
  partner: string;
}

const validationSchema = yup.object().shape({
  coinAmount: yup
    .string()
    .required()
    .test((value) => Number(value) > 0),
  note: yup
    .string()
    .required()
    .test("is-valid", "Note must be shorter than 16", (value) => value.length < 16),
  partner: yup
    .string()
    .required("Partner address is required")
    .test("is-address", "Invalid partner address", (value) => isAddress(value))
    .not([zeroAddress], "Invalid partner address")
});

function SellingService({
  onSymbolChange,
  milestones,
  onMilestonesChange
}: {
  onSymbolChange: (_: string) => void;
  milestones: Milestone[];
  onMilestonesChange: React.Dispatch<React.SetStateAction<Milestone[]>>;
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const chainId = useChainId();
  const { address: account } = useAccount();

  const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smDown = useMediaQuery("(max-width:700px)");

  const [isSelling, toggleSelling] = useState<boolean>(true);

  const [coin, setCoin] = useState<Coin>();
  const [_, startTransition] = useTransition();

  const [isCreatingDialogOpened, toggleCreatingDialogOpened] = useState<boolean>(false);
  const [isRuningTx, toggleRunningTx] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const [isVisibleFeeButton, toggleVisibleFeeButton] = useState<boolean>(true);
  const [isVisibleSellingButton, toggleVisibleSellingButton] = useState<boolean>(true);
  const [isInsufficientFee, toggleInsufficientFee] = useState<boolean>(false);

  const [fee_Balance, setFeeBalance] = useState<bigint>(BigInt("0"));
  const [fee_Amount, setFeeAmount] = useState<bigint>(BigInt("0"));

  const { createDeal, getFeeAmount } = useServiceContract();
  const { allowance, approve, balanceOf, decimals } = useTokenInfo();

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
      coinAmount: "0",
      note: "",
      partner: ""
    },
    onSubmit: () => {
      toggleCreatingDialogOpened(true);
    }
  });

  const handleCoinInputChange = useCallback(
    (value: string) => {
      if (Number(formValues.coinAmount) !== Number(value)) {
        onMilestonesChange((_milestones) => {
          if (
            _milestones[_milestones.length - 1].amount >
            Number(formValues.coinAmount) - Number(value)
          ) {
            return _milestones.map((_milestone, index) =>
              index === _milestones.length - 1
                ? {
                    ..._milestone,
                    amount: NP.minus(_milestone.amount, NP.minus(formValues.coinAmount, value))
                  }
                : _milestone
            );
          } else {
            const newMilestones: Milestone[] = [];
            let sumAmount = 0;
            let index = 0;
            do {
              const previousAmount = _milestones[index].amount;
              sumAmount += previousAmount;
              newMilestones.push({
                ..._milestones[index],
                amount:
                  sumAmount > Number(value)
                    ? previousAmount - (sumAmount - Number(value))
                    : previousAmount
              });
              index++;
            } while (sumAmount < Number(value));
            return newMilestones;
          }
        });
      }
      setFieldValue("coinAmount", value);
    },
    [formValues.coinAmount, onMilestonesChange, setFieldValue]
  );

  useEffect(() => {
    const _amount: number = milestones.reduce(
      (sum: number, milestone) => NP.plus(sum, Number(milestone.amount)),
      0
    );
    if (Number(formValues.coinAmount) !== _amount) setFieldValue("coinAmount", _amount.toString());
  }, [formValues.coinAmount, milestones, setFieldValue]);

  const calcFeeAmount = useCallback(async () => {
    if (isSelling) {
      return await getFeeAmount({ address: WETH, amount: BigInt(0) });
    }
    const coinDecimals =
      coin?.address === zeroAddress ? 18 : Number(await decimals(coin?.address as `0x${string}`));
    const coinAmount = parseUnits(formValues.coinAmount, coinDecimals);
    if (coin?.address === zeroAddress) {
      return await getFeeAmount({ address: WETH, amount: coinAmount });
    } else {
      return await getFeeAmount({
        address: coin?.address,
        amount: coinAmount
      });
    }
  }, [decimals, coin, formValues.coinAmount, getFeeAmount, isSelling]);

  useEffect(() => {
    if (isCreatingDialogOpened && account) {
      const init = async () => {
        toggleRunningTx(true);

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
          const feeAllowance = (await allowance(
            SDX,
            account,
            serviceContractAddress[chainId]
          )) as string;
          if (BigInt(feeAmount) === BigInt(0) || BigInt(feeAllowance) > BigInt(feeAmount)) {
            toggleVisibleFeeButton(false);
          } else {
            toggleVisibleFeeButton(true);
          }
        } catch (error) {
          toggleVisibleFeeButton(true);
        }

        try {
          if (!isSelling) {
            const coinDecimals =
              coin?.address === zeroAddress
                ? 18
                : Number(await decimals(coin?.address as `0x${string}`));
            const coinAmount = parseUnits(formValues.coinAmount.toString(), coinDecimals);

            if (coin?.address === zeroAddress) {
              toggleVisibleSellingButton(false);
            } else {
              const sellingAllowance = (await allowance(
                coin?.address as `0x${string}`,
                account,
                serviceContractAddress[chainId]
              )) as bigint;

              if (sellingAllowance > coinAmount) {
                toggleVisibleSellingButton(false);
              } else {
                toggleVisibleSellingButton(true);
              }
            }
          } else {
            toggleVisibleSellingButton(false);
          }
        } catch (error) {
          toggleVisibleSellingButton(true);
        }

        toggleRunningTx(false);
      };
      init();
    }
  }, [
    formValues,
    decimals,
    allowance,
    isCreatingDialogOpened,
    isSelling,
    coin,
    account,
    chainId,
    calcFeeAmount,
    balanceOf
  ]);

  const handleSubmit = useCallback(async () => {
    try {
      toggleRunningTx(true);
      const coinDecimals =
        coin?.address === zeroAddress ? 18 : Number(await decimals(coin?.address as `0x${string}`));

      await createDeal(
        isSelling,
        formValues.note,
        milestones.length,
        milestones.map((milestone) => ({
          name: milestone.name || "",
          description: milestone.description || "",
          amount: parseUnits(milestone.amount.toString(), coinDecimals).toString() || "0",
          deadline: (milestone.deadline || new Date(0)).getTime() / 1000 || 0,
          status: 0
        })),
        formValues.partner,
        coin?.address || zeroAddress
      );

      addNotification({
        title: "Success!",
        message: "Your deal is successfully created",
        type: "success"
      });

      toggleRunningTx(false);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      toggleRunningTx(false);
    }
  }, [
    coin?.address,
    decimals,
    createDeal,
    isSelling,
    formValues.note,
    formValues.partner,
    milestones,
    addNotification
  ]);

  const handleApproveFee = useCallback(async () => {
    try {
      toggleRunningTx(true);
      const feeAmount = await calcFeeAmount();

      await approve(SDX, serviceContractAddress[chainId], feeAmount.toString());

      toggleVisibleFeeButton(false);
    } catch (error) {
      console.log(error);
    } finally {
      toggleRunningTx(false);
    }
  }, [approve, calcFeeAmount, chainId]);

  const handleApproveSelling = useCallback(async () => {
    try {
      if (!isSelling) {
        toggleRunningTx(true);
        const coinDecimals = Number(await decimals(coin?.address as `0x${string}`));
        const coinAmount = parseUnits(formValues.coinAmount.toString(), coinDecimals);

        await approve(
          coin?.address as `0x${string}`,
          serviceContractAddress[chainId],
          coinAmount.toString()
        );

        toggleVisibleSellingButton(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toggleRunningTx(false);
    }
  }, [formValues, decimals, isSelling, coin, approve, chainId]);

  useEffect(() => {
    setCoin(coins[chainId][0]);
  }, [chainId, onSymbolChange]);

  useEffect(() => {
    if (coin) {
      onSymbolChange(coin.symbol);
    }
  }, [coin, onSymbolChange]);

  const handleToggleSelling = useCallback(() => {
    toggleSelling((state) => !state);
  }, []);

  const handleCreatingClose = useCallback(() => {
    toggleCreatingDialogOpened(false);
    setSuccess(false);
  }, []);

  return (
    <form onSubmit={handleCreate}>
      <Stack spacing={4} mt={4}>
        <Select
          value={isSelling ? "selling" : "buying"}
          onChange={(ev) => toggleSelling(ev.target.value === "selling")}
        >
          <MenuItem value="selling">
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                borderRadius={2}
                bgcolor={theme.palette.background.paper}
                height={48}
                boxSizing="border-box"
                px={1}
                py={1}
              >
                <Exchange />
              </Box>
              <Typography>I am Selling Service</Typography>
            </Stack>
          </MenuItem>
          <MenuItem value="buying">
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                borderRadius={2}
                bgcolor={theme.palette.background.paper}
                height={48}
                boxSizing="border-box"
                px={1}
                py={1}
              >
                <Exchange />
              </Box>
              <Typography>I am Buying Service</Typography>
            </Stack>
          </MenuItem>
        </Select>
        <Stack
          direction={
            (mdUp && xlDown) || smDown
              ? `column${isSelling ? "" : "-reverse"}`
              : `row${isSelling ? "" : "-reverse"}`
          }
          spacing={1}
          alignItems="center"
        >
          <ServiceInput
            note={formValues.note}
            onChange={(value: string) => setFieldValue("note", value)}
            inputError={Boolean(errors.note) && formTouched.note}
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
            amount={formValues.coinAmount}
            coin={coin}
            onAmountChange={handleCoinInputChange}
            onCoinChange={setCoin}
            inputError={Boolean(errors.coinAmount) && formTouched.coinAmount}
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
        <Dialog
          open={isCreatingDialogOpened}
          onClose={isRuningTx ? undefined : handleCreatingClose}
          sx={{ "& .MuiDialog-paper": { borderRadius: 6 } }}
          fullWidth
        >
          {!isSuccess ? (
            <Box padding={{ xs: 2, sm: 5 }}>
              <Typography variant="h4" textAlign={"center"}>
                Create a Service Escrow
              </Typography>
              <Grid container spacing={2} mt={{ xs: 1.5, sm: 3 }}>
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
                      {isSelling ? "Service" : coin?.name.slice(0, 8)}
                    </Typography>
                    <Typography color={theme.palette.text.secondary} fontWeight={600}>
                      {isSelling ? formValues.note : formValues.coinAmount}{" "}
                      {isSelling ? null : coin?.symbol}
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
                      {!isSelling ? "Service" : coin?.name.slice(0, 8)}
                    </Typography>
                    <Typography color={theme.palette.text.secondary} fontWeight={600}>
                      {!isSelling ? formValues.note : formValues.coinAmount}{" "}
                      {!isSelling ? null : coin?.symbol}
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
                          Number(fee_Amount) / 1e18
                        } SOLIDX`}</Typography>
                      </Typography>
                      <Typography color={theme.palette.text.secondary}>
                        Your Balance:{" "}
                        <Typography component="span" color="inherit" fontWeight={600}>{`${
                          Number(fee_Balance) / 1e18
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
                        "https://app.uniswap.org/swap?outputCurrency=0x072382557067B36966dAB6f5FB90Be32C2dA07Eb"
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
                        Approve {coin?.symbol}
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
            <Stack
              padding={{ xs: 2, sm: 5 }}
              spacing={6}
              justifyContent="center"
              alignItems="center"
            >
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
              <Button variant="contained" onClick={() => navigate("/mydeals/service")}>
                View Deal
              </Button>
              <Button variant="text" onClick={handleCreatingClose}>
                Back
              </Button>
            </Stack>
          )}
        </Dialog>
      </Stack>
    </form>
  );
}

export default SellingService;
