import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Stack } from "@mui/material";

import BackgroundVectors from "assets/images/bg-vectors.png";
import StyledText from "components/StyledText";
import { menuList } from "config/menu-list";
// import { MenuItemType } from "types/menu.type";
import { RootState } from "store";
import { maximize, minimize } from "store/reducers/Menu";

import MenuItem from "./components/MenuItem";
import MenuLogo from "./components/MenuLogo";
// import MenuLogOut from "./components/MenuLogOut";
import MenuLink from "./components/MenuLink";
import MenuMinimization from "./components/MenuMinimization";
import { MenuItemType } from "types/menu.type";
import MenuCollapse from "./components/MenuCollapse";

function SideBar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { isMinimized } = useSelector((state: RootState) => state.menu);

  const handleMinimization = useCallback(() => {
    dispatch(isMinimized ? maximize() : minimize());
  }, [dispatch, isMinimized]);

  return (
    <Stack direction="row" sx={{ width: !isMinimized ? 312 : 120, transition: "all 0.5s" }}>
      <Stack
        sx={{
          background: "linear-gradient(324.51deg, #2E2E2E -78.15%, rgba(46, 46, 46, 0) 112.14%)",
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
          flexGrow: 1
        }}
        spacing={3}
        justifyContent="space-between"
        px={1.5}
      >
        <Box>
          <MenuLogo />
          <Stack spacing={3}>
            {menuList.map((item) =>
              item.type === MenuItemType.Group ? (
                <MenuCollapse key={`${Date.now()}-${item.id}`} item={item} />
              ) : (
                <MenuItem
                  key={`${Date.now()}-${item.id}`}
                  isActive={location.pathname === item.url}
                >
                  <MenuLink item={item} />
                </MenuItem>
              )
            )}
          </Stack>
        </Box>
        <Box>
          {/* <MenuItem>
            <MenuLogOut />
          </MenuItem> */}
          {!isMinimized ? (
            <Box pb={3}>
              <MenuItem noPointEvent>
                <StyledText fontSize={"0.75rem"} fontWeight={500}>
                  © 2024 SolidX All right reserved
                </StyledText>
              </MenuItem>
            </Box>
          ) : null}
        </Box>
        <Box sx={{ position: "absolute", bottom: 0, zIndex: -1 }}>
          <img src={BackgroundVectors} alt="vectors" />
        </Box>
      </Stack>
      <MenuMinimization onChange={handleMinimization} />
    </Stack>
  );
}

export default SideBar;
