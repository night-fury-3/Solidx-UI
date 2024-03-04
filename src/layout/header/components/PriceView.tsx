import { useEffect, useState, useCallback } from "react";

import { useChainId } from "wagmi";
import { Link, Stack, Typography } from "@mui/material";

import useDealContract from "hooks/useDealContract";

import Logo from "../../../assets/icons/LogoWithoutText";

function PriceView() {
  const { getUSDCtoSOLIDX } = useDealContract();
  const chainId = useChainId();
  const [price, setPrice] = useState<number>(0);

  const getPrice = useCallback(async () => {
    const temp = await getUSDCtoSOLIDX();
    setPrice(Number((1e9 / Number(temp)).toFixed(7)));
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
      <Link
        href={
          "https://www.dextools.io/app/en/ether/pair-explorer/0x78396df1c8ba45637e7e5be9f0c8072f9f2e27f2?t=1709560244279"
        }
      >
        <Typography
          fontSize="0.75rem"
          fontWeight={600}
          sx={{
            borderBottom: "1px solid white"
          }}
        >
          ${price}
        </Typography>
      </Link>
    </Stack>
  );
}

export default PriceView;
