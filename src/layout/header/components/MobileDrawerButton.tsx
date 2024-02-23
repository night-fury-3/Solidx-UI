import { Fragment, useCallback, useState } from "react";

import { Drawer, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

import MobileMenu from "layout/sidebar/MobileMenu";

function MobileDrawerButton() {
  const [isOpened, setOpened] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpened(false);
  }, []);

  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <Menu sx={{ color: "white" }} />
      </IconButton>
      <Drawer anchor="right" open={isOpened} onClose={handleClose}>
        <MobileMenu />
      </Drawer>
    </Fragment>
  );
}

export default MobileDrawerButton;
