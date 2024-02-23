import { useEffect, useState } from "react";

import { Box, Dialog, Divider, Skeleton, Stack, Typography } from "@mui/material";

import LogoIcon from "components/LogoIcon";
import SearchBar from "components/SearchBar";
// import { coins } from "config/coins";
import useTokenInfo from "hooks/useTokenInfo";
import { Coin } from "types/coin.type";

import { CoinSelectDialogProps } from "./types";
import { useChainId } from "wagmi";
import axios from "axios";
import { Top100CoinType } from "routes/types";

function CoinLine({ coin, onClick }: { coin: Coin; onClick: () => void }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ cursor: "pointer", "&:hover": { background: "#2E2E2E" } }}
      px={2}
      py={1}
      onClick={onClick}
    >
      <Box width={36} height={36} borderRadius="100%">
        <LogoIcon
          src={coin.icon}
          title={coin.symbol.slice(0, 3)}
          alt={coin.symbol}
          height={36}
          width={36}
        />
      </Box>
      <Box>
        <Typography>{coin.name}</Typography>
        <Typography fontSize="smaller" color="gray">
          {coin.symbol}
        </Typography>
      </Box>
    </Stack>
  );
}

function CoinLineSkeleton() {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ cursor: "pointer", "&:hover": { background: "#2E2E2E" } }}
      px={2}
      py={1}
    >
      <Skeleton variant="circular" width={36} height={36} />
      <Stack spacing={0.5}>
        <Skeleton variant="rounded" width={100} height={16} />
        <Skeleton variant="rounded" width={60} height={12} />
      </Stack>
    </Stack>
  );
}

function CoinSelectDialog({ onClose, onSelect, opened }: CoinSelectDialogProps) {
  const [search, setSearch] = useState<string>("");
  const { nameAndSymbol } = useTokenInfo();
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const [searchedToken, setSearchedToken] = useState<Coin>();
  const [top100Coins, setTop100Coins] = useState<Top100CoinType[]>([]);
  const chainId = useChainId();

  useEffect(() => {
    if (search !== "") {
      toggleLoading(true);
      const resultPromise = nameAndSymbol(search);
      if (resultPromise) {
        resultPromise
          .then((res) => {
            if (!res[0].error && !res[1].error) {
              setSearchedToken({
                name: res[1].result || "Unknown",
                symbol: res[0].result || "UN",
                address: search
              });
            }
          })
          .catch(() => setSearchedToken(undefined))
          .finally(() => {
            toggleLoading(false);
          });
      } else {
        toggleLoading(false);
      }
    }
  }, [search, nameAndSymbol]);

  useEffect(() => {
    const init = async () => {
      await axios
        .post(process.env.REACT_APP_BACKEND_HTTP + "/top100Coins", { chainId })
        .then((res) => {
          setTop100Coins(res.data.coins);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    init();
  }, [chainId]);

  useEffect(() => {
    console.log(chainId, "chainId");
  }, [chainId]);

  return (
    <Dialog
      open={opened}
      onClose={onClose}
      sx={{
        "& .css-1w9es7b-MuiPaper-root-MuiDialog-paper": {
          overflowY: "hidden",
          scrollbarWidth: "none"
        }
      }}
    >
      <Box
        px={4}
        py={4}
        width={400}
        sx={{
          background: "linear-gradient(325deg, #1E1E1E -78.15%, rgba(30, 30, 30, 0.7) 112.14%)"
        }}
      >
        <Typography variant="h5" mb={2}>
          Select a token
        </Typography>
        <SearchBar onChange={setSearch} value={search} placeholder="Paste token address" />
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Box
          sx={{
            height: "50vh",
            overflowY: "scroll",
            scrollbarWidth: "none"
          }}
        >
          {!isLoading ? (
            search === "" ? (
              <Stack spacing={0.5}>
                {/* {coins[chainId].map((coin: Coin) => (
                <CoinLine
                  key={`${coin.address}-${Date.now()}`}
                  coin={coin}
                  onClick={() => onSelect(coin)}
                />
              ))} */}
                {top100Coins?.map((coin: Coin) => (
                  <CoinLine
                    key={`${coin.address}-${Date.now()}`}
                    coin={coin}
                    onClick={() => onSelect(coin)}
                  />
                ))}
              </Stack>
            ) : searchedToken ? (
              <CoinLine
                key={`${search}-${Date.now()}`}
                coin={searchedToken}
                onClick={() => onSelect(searchedToken)}
              />
            ) : (
              <Typography textAlign="center">No result</Typography>
            )
          ) : (
            <CoinLineSkeleton />
          )}
        </Box>
      </Box>
    </Dialog>
  );
}

export default CoinSelectDialog;
