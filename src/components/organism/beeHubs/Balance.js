import { Box, Button, Chip, Grid, Stack } from "@mui/material";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { Item } from "../../atoms/customComponent";

const connection = new Connection(clusterApiUrl("devnet"));

const Balance = ({ walletAddress, setWalletAddress }) => {
  const [balance, setBalance] = useState(null);

  const getBalance = async () => {
    const pk = new PublicKey(walletAddress);

    try {
      const balance = await connection.getBalance(pk);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  const disconnectWallet = () => {
    sessionStorage.removeItem("wallet");
    setWalletAddress();
  };

  return (
    <>
      <Box className="tx700 tx130">Solana Wallet Adapter</Box>
      <Stack gap={2}>
        <Box className="tx600">Wallet connected!</Box>
        <Grid container gap={2}>
          <Item>
            <Button variant="contained" onClick={getBalance}>
              Check Balance
            </Button>
          </Item>
          <Item>
            <Button variant="contained" onClick={disconnectWallet}>
              Disconnect Solana Wallet
            </Button>
          </Item>
        </Grid>
        <Grid>
          {balance && (
            <Grid container alignItems="center" gap={1} pb={1.5}>
              <Grid className="tx600" py={1} onClick={() => setBalance()}>
                Balance:
              </Grid>
              <Chip size="small" label={`${balance} SOL`} variant="outlined" color="success" />
            </Grid>
          )}
        </Grid>
      </Stack>
    </>
  );
};

export default Balance;
