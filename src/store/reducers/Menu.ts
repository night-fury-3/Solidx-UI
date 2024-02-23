import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { menuList } from "config/menu-list";

export interface MenuState {
  isMinimized: boolean;
  menus: {
    id: string;
    activeItem: boolean;
  }[];
}

const initialState: MenuState = {
  isMinimized: false,
  menus: menuList.map((menuItem) => ({
    id: menuItem.id,
    activeItem: false
  }))
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    minimize: (state) => {
      state.isMinimized = true;
    },
    maximize: (state) => {
      state.isMinimized = false;
    },
    activeItem: (state, action: PayloadAction<string>) => {
      state.menus = state.menus.map((value) =>
        value.id === action.payload ? { ...value, activeItem: true } : value
      );
    },
    inactiveItem: (state, action: PayloadAction<string>) => {
      state.menus = state.menus.map((value) =>
        value.id === action.payload ? { ...value, activeItem: false } : value
      );
    }
  }
});

export const { activeItem, inactiveItem, maximize, minimize } = menuSlice.actions;

export default menuSlice.reducer;
