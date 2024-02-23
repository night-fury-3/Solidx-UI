import { ReactNode } from "react";

export enum MenuItemType {
  Group,
  Item
}

export type MenuItem = {
  id: string;
  type: MenuItemType;
  title: string;
  url: string;
  icon?: ReactNode;
  submenus?: MenuItem[];
};
