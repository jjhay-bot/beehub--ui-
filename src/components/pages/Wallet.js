import React, { useState } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { Button, Grid, Stack } from "@mui/material";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Item } from "../atoms/customComponent";

const Wallet = () => {
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState(null);

  const [pubKey, setPubKey] = useState();

  const adapter = new PhantomWalletAdapter();
  const connection = new Connection(clusterApiUrl("devnet"));

  const connectWallet = async () => {
    try {
      await adapter.connect();
      setPubKey(adapter.publicKey);
      setTimeout(() => {
        setConnected(true);
      }, 600);
    } catch (error) {
      console.error("Failed to connect Phantom wallet:", error);
    }
  };

  const getBalance = async () => {
    try {
      const balance = await connection.getBalance(pubKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  return (
    <div>
      {connected ? (
        <>
          <Stack>
            <p>Wallet connected!</p>
            <Grid container spacing={2}>
              <Item>
                <Button variant="contained" onClick={getBalance}>
                  Check Balance
                </Button>
              </Item>
              <Item>
                <Button
                  variant="contained"
                  onClick={async () => {
                    await adapter?.disconnect();
                    setConnected();
                  }}>
                  Disconnect Solana Wallet
                </Button>
              </Item>
            </Grid>
          </Stack>
          {balance && <Grid py={2}>Balance: {balance} SOL</Grid>}
        </>
      ) : (
        <>
          <Button variant="contained" onClick={connectWallet}>
            Connect to Solana Wallet
          </Button>
        </>
      )}
    </div>
  );
};

export default Wallet;
