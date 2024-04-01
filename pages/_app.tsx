import type { AppProps } from "next/app";
import { ThirdwebProvider, coinbaseWallet, embeddedWallet, metamaskWallet, rainbowWallet, smartWallet, trustWallet, walletConnect } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { lineaSepolia } from "./linea-sepolia-chain"

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "sepolia";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={lineaSepolia}
      //  引入钱包组件
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        rainbowWallet(),
        trustWallet(),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
