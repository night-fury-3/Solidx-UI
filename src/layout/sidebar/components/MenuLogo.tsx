import { Fragment } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import { RootState } from "store";

import Logo from "assets/icons/Logo";
import LogoWithoutText from "assets/icons/LogoWithoutText";

function MenuLogo() {
  const { isMinimized } = useSelector((state: RootState) => state.menu);

  return (
    <Fragment>
      <Box py={3.75} px={1}>
        {!isMinimized ? <Logo /> : <LogoWithoutText />}
      </Box>
    </Fragment>
  );
}

export default MenuLogo;
