import React from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import SolanaWallet from "./Wallet";

const WalletPage = () => {
  return (
    <div>
      <h1>Solana Wallet Adapter</h1>
      <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
        <WalletProvider wallets={[new PhantomWalletAdapter()]}>
          <SolanaWallet />
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default WalletPage;
