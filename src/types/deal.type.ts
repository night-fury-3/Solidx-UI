export enum DealTypes {
  OTC,
  Service
}

export enum DealStatus {
  NotCreated,
  Created,
  Joined,
  Approved,
  Cancelled
}

export type Milestone = {
  name: string;
  amount: bigint;
  deadline: bigint;
  status: bigint;
  description?: string;
};

export type Deal = {
  id: string;
  creator: `0x${string}`;
  partner: `0x${string}`;
  createdAt: string;
  sellingAmount: string;
  buyingAmount: string;
  sellingToken: `0x${string}`;
  buyingToken: `0x${string}`;
  status: DealStatus;
};

export type Service = {
  id: string;
  createdAt: number;
  isSelling: boolean;
  serviceCaption: string;
  numberOfMilestones: number;
  milestones: Milestone[];
  status: DealStatus;
  creator: `0x${string}`;
  partner: `0x${string}`;
  paymentToken: `0x${string}`;
  totalBudget: string;
  paidBudget: string;
  isCreatorApprovedCancel: boolean;
  isPartnerApprovedCancel: boolean;
};

export const DealTypesTitle = ["OTC", "Service"];
