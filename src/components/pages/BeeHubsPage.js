import { Button, Divider, Grid, Link } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import Balance from "../organism/beeHubs/Balance";
import BeeHubs from "../organism/beeHubs/BeeHubs";

const NoProvider = () => (
  <>
    <h2>Could not find a wallet provider.</h2>
    <h3>
      {` Please install `}
      <Link variant="contained" href="https://phantom.app/" target="_blank" rel="noreferrer">
        Phantom Wallet
      </Link>
      {` to connect`}
    </h3>
  </>
);

const BeeHubsPage = () => {
  const [hasPhantom, setHasPhantom] = useState(true);
  const [walletAddress, setWalletAddress] = useState(sessionStorage.getItem("wallet"));

  useLayoutEffect(() => {
    !walletAddress && connectWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        setWalletAddress(response?.publicKey.toString());
        sessionStorage.setItem("wallet", response?.publicKey.toString());
      } catch (error) {
        sessionStorage.removeItem("wallet");
        console.error("Failed to connect Phantom wallet:", error);
      }
    } else {
      !window.phantom && setHasPhantom(false);
    }
  };

  if (!hasPhantom) return <NoProvider />;

  return walletAddress ? (
    <>
      <Balance walletAddress={walletAddress} setWalletAddress={setWalletAddress} />
      <Divider />
      <BeeHubs walletAddress={walletAddress} />
    </>
  ) : (
    <Grid py={2}>
      <Button variant="contained" onClick={connectWallet}>
        Connect to Solana Wallet
      </Button>
    </Grid>
  );
};

export default BeeHubsPage;
