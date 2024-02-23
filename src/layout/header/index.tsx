import { useEffect, useMemo, useRef, useState } from "react";

import { Box, Hidden, Stack, useMediaQuery, useTheme } from "@mui/material";

import _ from "lodash";

import SearchBar from "components/SearchBar";
import ConnectWallet from "./components/ConnectWallet";
import Mails from "./components/Mails";
// import Notification from "./components/Notification";
// import LanguageSelect from "./components/LanguageSelect";
import DrawerButton from "./components/DrawerButton";
import MoreMenu from "./components/MoreMenu";
import PriceView from "./components/PriceView";

function Header() {
  const theme = useTheme();

  const tabletDown = useMediaQuery("(max-width:825px)");

  const [isVisible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const debouncedSetVisible = useMemo(() => _.debounce(setVisible, 450), []);

  useEffect(() => {
    let observerRefValue: HTMLDivElement | null = null;

    if (ref.current) {
      observerRefValue = ref.current;

      const scrollListener = () => {
        if (Number(ref.current?.parentElement?.scrollTop) > 32) {
          debouncedSetVisible(true);
        } else {
          debouncedSetVisible(false);
        }
      };
      ref.current.parentElement?.addEventListener("scroll", scrollListener);

      return () => {
        if (observerRefValue)
          observerRefValue.parentElement?.removeEventListener("scroll", scrollListener);
      };
    }
  }, [ref, debouncedSetVisible]);

  return (
    <Stack
      ref={ref}
      direction="row"
      spacing={2}
      justifyContent="space-between"
      borderRadius={2.5}
      width="100%"
      px={3}
      py={2}
      sx={{
        border: isVisible
          ? `1px solid ${theme.palette.primary.main}80`
          : `1px solid ${theme.palette.background.default}`,
        boxShadow: isVisible ? `0 0 3px ${theme.palette.primary.main}80` : "none",
        background: "linear-gradient(0deg, #2E2E2E -100.15%, rgba(18, 18, 18) 112.14%)",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}
    >
      <Stack direction="row" alignItems="center" spacing={3} flexGrow={1}>
        <Hidden lgUp>
          <DrawerButton />
        </Hidden>
        <Hidden smDown>
          <PriceView />
        </Hidden>
        {tabletDown ? null : <SearchBar />}
      </Stack>
      <Stack direction="row" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          {/* <LanguageSelect /> */}
          {/* <Notification /> */}
          <Mails />
        </Stack>
        <Box ml={{ xs: 2, sm: 3.5 }}>{tabletDown ? <MoreMenu /> : <ConnectWallet />}</Box>
      </Stack>
    </Stack>
  );
}

export default Header;
