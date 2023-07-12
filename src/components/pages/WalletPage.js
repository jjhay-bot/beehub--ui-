import { useState, useEffect } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import SolanaWallet from "./Wallet";

const NoProvider = () => {
  // useEffect(() => {
  //   window.open("https://phantom.app/");
  // }, []);
  return (
    <>
      <h2>Could not find a provider</h2>
      <h3>Please install Phantom wallet to connect</h3>
      <a href="https://phantom.app/" target="_blank" rel="noreferrer">
        Phantom wallet
      </a>
    </>
  );
};

const WalletPage = () => {
  const [hasPhantom, setHasPhantom] = useState(true);
  useEffect(() => {
    !window.phantom && setHasPhantom(false);
  }, []);
  return (
    <div>
      {!hasPhantom ? (
        <NoProvider />
      ) : (
        <>
          <h1>Solana Wallet Adapter</h1>
          <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
            <WalletProvider wallets={[new PhantomWalletAdapter()]}>
              <SolanaWallet />
            </WalletProvider>
          </ConnectionProvider>
        </>
      )}
    </div>
  );
};

export default WalletPage;
