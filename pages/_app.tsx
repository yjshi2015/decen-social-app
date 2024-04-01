import type { AppProps } from "next/app";
import { ThirdwebProvider, coinbaseWallet, embeddedWallet, metamaskWallet, rainbowWallet, smartWallet, trustWallet, walletConnect } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { defineChain } from "thirdweb/chains";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "sepolia";

const activeChain = defineChain({
  id: 59141,
  rpc: "https://rpc.sepolia.linea.build",
  name: "Linea Sepolia",
  nativeCurrency: {
    name: "Linea ETH",
  },
  testnet: true,
  blockExplorers: [{
    name: "sepolia lineascan",
    url: "https://sepolia.lineascan.build/",
  }],
});


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
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
