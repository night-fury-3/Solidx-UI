import { DealTypes } from "types/deal.type";

export type DealTypeProps = {
  id: DealTypes;
  title: string;
  active: boolean;
  onClick?: (id: DealTypes) => void;
};

export type FeeDisplayerProps = {
  isRuningTx: boolean;
  feeAmount: bigint;
};
