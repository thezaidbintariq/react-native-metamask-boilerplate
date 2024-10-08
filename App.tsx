import "@walletconnect/react-native-compat";
import { WagmiConfig } from "wagmi";
import { sepolia, mainnet, arbitrum, arbitrumSepolia } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
  W3mButton,
} from "@web3modal/wagmi-react-native";

import { StyleSheet, View } from "react-native"
import MintSection from "./src/components/BuyTokensSection";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "03109abe9d2bc4ad988b83b87221bf6b";

// 2. Create config
const metadata = {
  name: "Web3Modal RN NFT Minting",
  description: "Web3Modal RN NFT Minting Tutorial",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [sepolia, mainnet, arbitrum, arbitrumSepolia];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <View style={styles.container}>
        <W3mButton label="Connect Wallet" />
        <MintSection />
      </View>
      <Web3Modal />
    </WagmiConfig>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
