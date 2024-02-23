import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNotifications } from "react-notifications-component";
import { Provider as ReduxProvider } from "react-redux";

import { Container, CssBaseline, Hidden, Stack, ThemeProvider } from "@mui/material";

import createTheme from "theme";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { bsc, bscTestnet, mainnet } from "viem/chains";
// import { mainnet } from "viem/chains";
// import { bsc } from "viem/chains";

import ChatProvider from "contexts/ChatProvider";
import { walletconnectProjectID } from "config";
import metadata from "config/metadata";
import { store } from "store";

import Header from "./header";
import MobileHeader from "./header/MobileHeader";
import SideBar from "./sidebar";
import ToTop from "./ToTop";

import { LayoutProps } from "./index.type";

import "react-notifications-component/dist/theme.css";

const chains = [bscTestnet, mainnet, bsc]; // mainnet(ethereum) ???
// const chains = [mainnet];
const wagmiConfig = defaultWagmiConfig({ chains, projectId: walletconnectProjectID, metadata });

createWeb3Modal({ wagmiConfig, projectId: walletconnectProjectID, chains });

function Layout({ children }: LayoutProps) {
  const theme = createTheme();
  const queryClient = new QueryClient();

  return (
    <WagmiConfig config={wagmiConfig}>
      <ReduxProvider store={store}>
        <ChatProvider>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <CssBaseline />
              <BrowserRouter>
                <ReactNotifications />
                <Stack direction="row" sx={{ height: "100vh" }}>
                  <Hidden lgDown>
                    <SideBar />
                  </Hidden>
                  <Stack
                    pt={{ xs: 0, sm: 4 }}
                    pb={4}
                    width="100%"
                    pl={{ lg: 0, sm: 4, xs: 0 }}
                    pr={{ xs: 0, sm: 4 }}
                    spacing={{ sm: 5.25, xs: 3 }}
                    sx={{ overflowY: "auto" }}
                    alignItems="center"
                  >
                    <Hidden smDown>
                      <Header />
                    </Hidden>
                    <Hidden smUp>
                      <MobileHeader />
                    </Hidden>
                    <Container sx={{ padding: { xs: "0 16px", sm: "0 !important" } }}>
                      {children}
                    </Container>
                    <ToTop />
                  </Stack>
                </Stack>
              </BrowserRouter>
            </QueryClientProvider>
          </ThemeProvider>
        </ChatProvider>
      </ReduxProvider>
    </WagmiConfig>
  );
}

export default Layout;
