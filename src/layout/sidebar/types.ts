import { ReactNode } from "react";
import { MenuItem } from "types/menu.type";

export type MenuItemProps = {
  noPointEvent?: boolean;
  isActive?: boolean;
  children: ReactNode;
};

export type MenuLinkProps = {
  item: MenuItem;
};

export type MenuMinimizationProps = {
  onChange: () => void;
};
