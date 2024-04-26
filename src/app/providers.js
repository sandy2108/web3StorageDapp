"use client";
import {
  RainbowKitProvider,
  getDefaultConfig,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider } from "wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { polygon } from "wagmi/chains";

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "Tek Margin Dapp",
  projectId: "a84e3e8dfb8821e3c7f0f009163bc30a",
  chains: [polygon],
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet, walletConnectWallet],
    },
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const myCustomTheme = {
  blurs: {
    modalOverlay: "#f45500",
  },
  colors: {
    accentColor: "#f45500",
    accentColorForeground: "#000000",
    actionButtonBorder: "#f45500",
    actionButtonBorderMobile: "#FFFFFF",
    actionButtonSecondaryBackground: "#FFFFFF",
    closeButton: "#000000",
    closeButtonBackground: "#f45500",
    connectButtonBackground: "#f45500",
    connectButtonBackgroundError: "#f45500",
    connectButtonInnerBackground: "#f45500",
    connectButtonText: "#FFFFFF",
    connectButtonTextError: "#000000",
    connectionIndicator: "6CC54E",
    downloadBottomCardBackground: "#f45500",
    downloadTopCardBackground: "#ffffff",
    error: "#f45500",
    generalBorder: "#f45500",
    generalBorderDim: "#FFFFFF",
    modalBackground: "#000000",
    modalTextSecondary: "#FFFFFF",
    menuItemBackground: "004EFF",
    modalBorder: "#f45500",
    modalText: "#FFFFFF",
    selectedOptionBorder: "#FFFFFF",
  },
  radii: {
    actionButton: "10px",
    connectButton: "24px ",
    menuButton: "10px",
    modal: "10px",
    modalMobile: "10px",
  },
  shadows: {
    // actionButton: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    connectButton: "0px 4px 4px rgba(1, 0, 0, 0.25)",
    // modal: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    // modalMobile: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
};

const provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myCustomTheme} modalSize="wide">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default provider;
