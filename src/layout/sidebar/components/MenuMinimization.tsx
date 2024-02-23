import { useSelector } from "react-redux";

import MenuMini from "assets/icons/MenuMini";

import { Box } from "@mui/material";
import { RootState } from "store";

import type { MenuMinimizationProps } from "../types";

function MenuMinimization({ onChange }: MenuMinimizationProps) {
  const { isMinimized } = useSelector((state: RootState) => state.menu);

  return (
    <Box
      onClick={onChange}
      sx={{
        rotate: isMinimized ? "-180deg" : "0deg",
        transformOrigin: "20px 20px",
        translate: "-20px 35px",
        width: 40,
        height: 40,
        margin: "0 !important",
        cursor: "pointer",
        padding: 0
      }}
    >
      <MenuMini />
    </Box>
  );
}

export default MenuMinimization;
