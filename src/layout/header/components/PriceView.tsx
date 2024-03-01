import { useEffect, useState, useCallback } from "react";

import { useChainId } from "wagmi";
import { Stack, Typography } from "@mui/material";

import useDealContract from "hooks/useDealContract";

import Logo from "../../../assets/icons/LogoWithoutText";

function PriceView() {
  const { getUSDCtoSOLIDX } = useDealContract();
  const chainId = useChainId();
  const [price, setPrice] = useState<number>(0);

  const getPrice = useCallback(async () => {
    const temp = await getUSDCtoSOLIDX();
    setPrice(1.0 / Number(temp));
  }, [chainId]);

  useEffect(() => {
    getPrice();
  }, [getPrice]);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Stack
        width={38}
        height={38}
        bgcolor="#000000"
        borderRadius="100%"
        border={"1px solid #333333"}
        alignItems="center"
        justifyContent="center"
      >
        <Logo />
      </Stack>
      <Typography fontSize="0.75rem" fontWeight={600}>
        ${price}
      </Typography>
    </Stack>
  );
}

export default PriceView;
