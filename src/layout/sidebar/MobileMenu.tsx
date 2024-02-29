import { Box, Stack } from "@mui/material";

import BackgroundVectors from "assets/images/bg-vectors.png";
import StyledText from "components/StyledText";
import { menuList } from "config/menu-list";
// import { MenuItemType } from "types/menu.type";
import ConnectWallet from "layout/header/components/ConnectWallet";

import MenuItem from "./components/MenuItem";
import MenuLogOut from "./components/MenuLogOut";
import MenuLink from "./components/MenuLink";
import MenuCollapse from "./components/MenuCollapse";

import { MenuItemType } from "types/menu.type";

function MobileMenu() {
  return (
    <Stack direction="row" sx={{ width: 272 }}>
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
        py={3}
      >
        <ConnectWallet />
        <Box>
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
          <MenuItem>
            <MenuLogOut />
          </MenuItem>
          <Box pb={3}>
            <MenuItem>
              <StyledText fontSize={"0.75rem"} fontWeight={500}>
                © 2024 SolidX All right reserved
              </StyledText>
            </MenuItem>
          </Box>
        </Box>
        <Box sx={{ position: "absolute", bottom: 0, zIndex: -1 }}>
          <img src={BackgroundVectors} alt="vectors" />
        </Box>
      </Stack>
    </Stack>
  );
}

export default MobileMenu;
