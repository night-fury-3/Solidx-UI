import { Fragment, useCallback, useEffect, useState } from "react";

import {
  Box,
  Button,
  Grid,
  Stack,
  useMediaQuery,
  useTheme
} from "@mui/material";

import { useChainId } from "wagmi";
import { parseUnits, zeroAddress } from "viem";
import { useFormik } from "formik";
import * as yup from "yup";

import Swap from "assets/icons/Swap";
import { WETH } from "config";
import { coins } from "config/coins";
import useDealContract from "hooks/useDealContract";
import useTokenInfo from "hooks/useTokenInfo";
import { Coin } from "types/coin.type";

import CoinInput from "pages/dashboard/components/DealCard/CoinInput";
import FeeDisplayer from "./FeeDisplayer";

interface IExchangeForm {
  firstAmount: string;
  secondAmount: string;
}

const validationSchema = yup.object().shape({
  firstAmount: yup
    .string()
    .required()
    .test((value) => Number(value) > 0),
  secondAmount: yup
    .string()
    .required()
    .test((value) => Number(value) > 0)
});

function ExchangeDeal() {
  const theme = useTheme();

  const [isSelling, toggleSelling] = useState<boolean>(true);

  const chainId = useChainId();

  const [isRuningTx, toggleRunningTx] = useState<boolean>(false);

  const [fee_Amount, setFeeAmount] = useState<bigint>(BigInt("0"));

  const [firstCoin, setFirstCoin] = useState<Coin>();
  const [secondCoin, setSecondCoin] = useState<Coin>();

  const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smDown = useMediaQuery("(max-width:700px)");

  const { getFeeAmount } = useDealContract();
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
      firstAmount: "0",
      secondAmount: "0"
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

  useEffect(() => {
    setFirstCoin(coins[chainId][0]);
    setSecondCoin(coins[chainId][0]);
  }, [chainId]);

  const handleToggleSelling = useCallback(() => {
    toggleSelling((state) => !state);
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

  return (
    <Fragment>
      <Grid container spacing={"24px"}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
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
    </Fragment>
  );
}

export default ExchangeDeal;
