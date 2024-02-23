import { Coin } from "types/coin.type";

export type CoinSelectDialogProps = {
  opened: boolean;
  onSelect: (token: Coin) => void;
  onClose: () => void;
};

export type CoinSelectProps = {
  coin?: Coin;
  chainId: number;
  onChange?: (coin: Coin) => void;
};
