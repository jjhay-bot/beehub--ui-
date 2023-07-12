import { Button, Grid } from "@mui/material";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const HomePage = ({ isMobile }) => {
  const cluster = clusterApiUrl("devnet");
  const connection = new Connection(cluster);
  const publicKey = new PublicKey("CGZPb2KpyVucADfSoMjzfpP9m4hJHvKdXPBPYjR7uW64");

  // const [metadataAccount, setMetadataAccount] = useState()
  const [NFTs, setNFTs] = useState([]);

  const getBalance = async () => {
    // // const balance = await connection.getBalance(publicKey);
    const accountInfo = await connection.getAccountInfo(publicKey);
    console.log("accountInfo", accountInfo);
    // setMetadataAccount(accountInfo)
  };

  const getMetaData = async () => {
    const owner = new PublicKey("CGZPb2KpyVucADfSoMjzfpP9m4hJHvKdXPBPYjR7uW64");
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
    <>
      <Grid px={isMobile ? 5 : 10} className="font_railway">
        <Grid container justifyContent={isMobile ? "start" : "center"} alignItems="center">
          <Grid
            item
            className={`tx700 ${isMobile ? "tx100 c3" : "tx125"}`}
            sx={{ letterSpacing: "0.5rem", mt: 6.5, textAlign: "center" }}>
            MY NFT COLLECTION
          </Grid>
        </Grid>
      </Grid>
      <Button onClick={getBalance}>Get balance</Button>
      <Button onClick={getMetaData}>Get MetaData</Button>
      <ul>
        {NFTs.map((nft, index) => (
          <li key={index}>
            <p>Mint: {nft.mint}</p>
            <p>Token Amount: {nft.tokenAmount.uiAmount}</p>
          </li>
        ))}
      </ul>

      {/* <Footer isMobile={isMobile} /> */}
    </>
  );
};

export default HomePage;
