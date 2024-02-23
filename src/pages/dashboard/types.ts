import { Coin } from "types/coin.type";
import { DealTypes } from "types/deal.type";

export type DealTypeProps = {
  id: DealTypes;
  active: boolean;
  title: string;
  onClick?: (id: DealTypes) => void;
};

export type DealTypeSelectionProps = {
  dealType: DealTypes;
  onDealTypeChange: (id: DealTypes) => void;
  onCreate: () => void;
  onJoin: () => void;
};

export type JoiningDealProps = {
  dealType: DealTypes;
  onBack?: () => void;
};

export type DealCreationProps = {
  dealType: DealTypes;
  onBack?: () => void;
};

export type CoinInputProps = {
  inputReadOnly?: boolean;
  inputError?: boolean;
  coin?: Coin;
  onCoinChange?: (coin: Coin) => void;
  amount?: string;
  onAmountChange?: (amount: string) => void;
};

export type ServiceInputProps = {
  note: string;
  inputError?: boolean;
  onChange: (note: string) => void;
};

export type Milestone = {
  index?: number;
  amount: number;
  deadline?: Date;
  name: string;
  description?: string;
};
