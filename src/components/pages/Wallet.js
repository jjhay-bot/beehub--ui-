import React, { useState } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { Box, Button, Chip, Grid, Stack } from "@mui/material";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Item } from "../atoms/customComponent";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import NewNote from "./NewNote";

const Wallet = () => {
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [pubKey, setPubKey] = useState();
  const [NFTs, setNFTs] = useState([]);

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

  // const getMetaData = async () => {
  const getNFTS = async () => {
    console.log("pubKey", pubKey);
    const owner = new PublicKey(pubKey);
    let tokenAccounts = await connection.getParsedTokenAccountsByOwner(owner, {
      programId: TOKEN_PROGRAM_ID,
    });
    // Filter out the NFTs
    const nfts = tokenAccounts.value
      .filter((account) => account.account.data.parsed.info.tokenAmount.decimals === 0)
      .map((account) => ({
        mint: account.account.data.parsed.info.mint,
        tokenAmount: account.account.data.parsed.info.tokenAmount,
      }));
    setNFTs(nfts);
  };

  return (
    <div>
      {connected ? (
        <>
          <Stack gap={2}>
            <Box className="tx600">Wallet connected!</Box>
            <Grid container gap={2}>
              <Item>
                <Button variant="contained" onClick={getBalance}>
                  Check Balance
                </Button>
              </Item>
              <Item>
                <Button
                  variant="contained"
                  onClick={async () => {
                    getNFTS();
                  }}>
                  Get NFTS
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

            <Grid>
              <Grid className="tx600" py={1}>
                Connected as:
              </Grid>
              <Chip label={pubKey.toBase58()} variant="outlined" color="success" />
            </Grid>
            {balance && (
              <Grid>
                <Grid className="tx600" py={1}>
                  Balance:
                </Grid>
                <Chip label={`${balance} SOL`} variant="outlined" color="success" />
              </Grid>
            )}
            {NFTs.length ? (
              <Grid>
                <Grid className="tx600" py={1}>
                  NFT's:
                </Grid>

                {NFTs.map((nft, index) => (
                  <Stack key={index} spacing={1.25} p={1} className="c3 tx500 tx85">
                    <Grid container gap={1} alignItems="center">
                      <Item>Mint#{index + 1}:</Item>
                      <Item>
                        <Chip size="small" label={nft.mint} variant="outlined" color="warning" />
                      </Item>
                    </Grid>
                    <Grid container gap={1} alignItems="center">
                      <Item>Token Amount:</Item>
                      <Item>
                        <Chip
                          size="small"
                          label={nft.tokenAmount.uiAmount}
                          variant="outlined"
                          color="warning"
                        />
                      </Item>
                    </Grid>
                  </Stack>
                ))}
              </Grid>
            ) : null}
          </Stack>
          <NewNote adapter={adapter} pubKey={pubKey} />
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
