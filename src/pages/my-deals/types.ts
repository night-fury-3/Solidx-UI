import type { Deal, Service } from "types/deal.type";

export type DealsBoardProps = {
  title: string;
  deals?: Deal[];
  done?: boolean;
  loading?: boolean;
  loadMore?: () => void;
};

export type ServicesBoardProps = {
  title: string;
  services?: Service[];
  done?: boolean;
  loading?: boolean;
  loadMore?: () => void;
};
