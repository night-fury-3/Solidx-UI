import { Fragment, useCallback, useState } from "react";

import {
  AppBar,
  Box,
  ClickAwayListener,
  Fade,
  Paper,
  Stack,
  Toolbar,
  useTheme
} from "@mui/material";

import MoreVert from "assets/icons/MoreVert";
import SearchBar from "components/SearchBar";

import ConnectWallet from "./ConnectWallet";

function MoreMenu() {
  const theme = useTheme();
  const [isOpened, setOpen] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <Fragment>
      <Box
        height={42}
        p={1.5}
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
        borderRadius={2.5}
        bgcolor={isOpened ? theme.palette.background.paper : theme.palette.background.default}
        sx={{ cursor: "pointer", "&:hover": { bgcolor: theme.palette.background.paper } }}
      >
        <MoreVert />
      </Box>
      <Fade in={isOpened}>
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <AppBar color="inherit">
              <Toolbar>
                <Stack direction="row" spacing={2} alignItems="center" width="100%">
                  <Box flex="1 1 0">
                    <SearchBar />
                  </Box>
                  <ConnectWallet />
                </Stack>
              </Toolbar>
            </AppBar>
          </ClickAwayListener>
        </Paper>
      </Fade>
    </Fragment>
  );
}

export default MoreMenu;
