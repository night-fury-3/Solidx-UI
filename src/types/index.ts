import type { Address } from "viem";

export enum Status {
  Loading,
  Idle,
  Error
}

export type Message = {
  from: Address;
  to: Address;
  message: string;
  timestamp: number;
};

export type User = {
  account: Address;
  avatar: string;
  fullName: string;
  recent: Message;
};
