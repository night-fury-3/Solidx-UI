import { Fragment, useCallback, useEffect, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

import ArrowBottom from "assets/icons/ArrowBottom";
import LogoIcon from "components/LogoIcon";
import { coins } from "config/coins";
import { Coin } from "types/coin.type";

import CoinSelectDialog from "./CoinSelectDialog";
import { CoinSelectProps } from "./types";

function CoinSelect({ coin: defaultCoin, onChange, chainId }: CoinSelectProps) {
  const [isOpened, toggleOpen] = useState<boolean>(false);
  const [coin, setCoin] = useState<Coin>(defaultCoin ? defaultCoin : coins[chainId][0]);

  const handleOpen = useCallback(() => {
    toggleOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    toggleOpen(false);
  }, []);

  const handleSelect = useCallback(
    (coin: Coin) => {
      setCoin(coin);
      onChange ? onChange(coin) : null;
      toggleOpen(false);
    },
    [onChange]
  );

  useEffect(() => {
    setCoin(coins[chainId][0]);
  }, [chainId]);

  return (
    <Fragment>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pr={1}
        pl={0.5}
        borderRadius={8}
        sx={{ cursor: "pointer", "&:hover": { bgcolor: "#1E1E1E" } }}
        onClick={handleOpen}
      >
        <Stack direction="row" spacing={2} alignItems="center" py={0.5}>
          <Box width={34} height={34} borderRadius={2}>
            <LogoIcon
              src={coin.icon}
              title={coin.symbol.slice(0, 3)}
              alt={coin.symbol}
              height={34}
              width={34}
            />
          </Box>
          <Box>
            <Typography>{coin.name}</Typography>
            <Typography fontSize="smaller" color="gray">
              {coin.symbol}
            </Typography>
          </Box>
        </Stack>
        <ArrowBottom />
      </Stack>
      <CoinSelectDialog opened={isOpened} onClose={handleClose} onSelect={handleSelect} />
    </Fragment>
  );
}

export default CoinSelect;
