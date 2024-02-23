import { useCallback, useState } from "react";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";
import { parseUnits, zeroAddress } from "viem";

import Exchange from "assets/icons/Exchange";
import Swap from "assets/icons/Swap";
import { WETH } from "config";
import useTokenInfo from "hooks/useTokenInfo";
import useServiceContract from "hooks/useServiceContract";
import { useChainId } from "wagmi";

import CoinInput from "pages/dashboard/components/DealCard/CoinInput";
import ServiceInput from "pages/dashboard/components/DealCard/ServiceInput";
import FeeDisplayer from "./FeeDisplayer";

import type { Coin } from "types/coin.type";
import { coins } from "config/coins";

interface IExchangeForm {
  coinAmount: string;
  note: string;
}

const validationSchema = yup.object().shape({
  coinAmount: yup
    .string()
    .required()
    .test((value) => Number(value) > 0),
  note: yup
    .string()
    .required()
    .test("is-valid", "Note must be shorter than 16", (value) => value.length < 16)
});

function SellingService() {
  const theme = useTheme();
  const chainId = useChainId();

  const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smDown = useMediaQuery("(max-width:700px)");

  const [isSelling, toggleSelling] = useState<boolean>(true);

  const [coin, setCoin] = useState<Coin>(coins[chainId][0]);

  const [isRuningTx, toggleRunningTx] = useState<boolean>(false);

  const [fee_Amount, setFeeAmount] = useState<bigint>(BigInt("0"));

  const { getFeeAmount } = useServiceContract();
  const { decimals } = useTokenInfo();

  const {
    errors,
    handleSubmit,
    setFieldValue,
    touched: formTouched,
    values: formValues
  } = useFormik<IExchangeForm>({
    validationSchema,
    initialValues: {
      coinAmount: "0",
      note: ""
    },
    onSubmit: async () => {
      try {
        toggleRunningTx(true);
        const feeAmount = await calcFeeAmount();
        setFeeAmount(feeAmount);
        toggleRunningTx(false);
      } catch (err) {
        toggleRunningTx(false);
        console.log(err);
      }
    }
  });

  const handleCoinInputChange = useCallback(
    (value: string) => {
      setFieldValue("coinAmount", value);
    },
    [setFieldValue]
  );

  const calcFeeAmount = useCallback(async () => {
    if (isSelling) {
      return await getFeeAmount({ address: WETH, amount: BigInt(0) });
    }
    const coinDecimals =
      coin?.address === zeroAddress ? 18 : Number(await decimals(coin?.address as `0x${string}`));
    const coinAmount = parseUnits(formValues.coinAmount, coinDecimals);
    console.log(coinAmount, "coinAmount");
    if (coin?.address === zeroAddress) {
      return await getFeeAmount({ address: WETH, amount: coinAmount });
    } else {
      return await getFeeAmount({
        address: coin?.address,
        amount: coinAmount
      });
    }
  }, [decimals, coin, formValues.coinAmount, getFeeAmount, isSelling]);

  const handleToggleSelling = useCallback(() => {
    toggleSelling((state) => !state);
  }, []);

  return (
    <Grid container spacing={"24px"}>
      <Grid item xs={12} md={6}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
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
            <Button variant="contained" type="submit">
              Calculate Fee
            </Button>
          </Stack>
        </form>
      </Grid>
      <Grid item xs={12} md={6}>
        <FeeDisplayer isRuningTx={isRuningTx} feeAmount={fee_Amount} />
      </Grid>
    </Grid>
  );
}

export default SellingService;
