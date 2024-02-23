import { Fragment, useCallback, useState } from "react";

import { Box, Drawer, useTheme } from "@mui/material";

import MenuOpen from "assets/icons/MenuOpen";
import DrawerMenu from "layout/sidebar/DrawerMenu";

function DrawerButton() {
  const theme = useTheme();
  const [isOpened, setOpened] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpened(false);
  }, []);

  return (
    <Fragment>
      <Box
        height={42}
        p={1.5}
        bgcolor={theme.palette.background.default}
        borderRadius={2.5}
        sx={{ cursor: "pointer", "&:hover": { bgcolor: theme.palette.background.paper } }}
        onClick={handleOpen}
      >
        <MenuOpen />
      </Box>
      <Drawer anchor="left" open={isOpened} onClose={handleClose}>
        <DrawerMenu />
      </Drawer>
    </Fragment>
  );
}

export default DrawerButton;
