import { Button, Grid, Stack, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Item } from "../../atoms/customComponent";
import NewGifAccount from "./NewGifAccount";
import idl from "./beehubs.json";
import kp from "./keypair.json";
import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";
import { opts, network, programID, resetForm, InputField } from "./solanaHelper";
window.Buffer = Buffer;

const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new AnchorProvider(connection, window.solana, opts.preflightCommitment);
  return provider;
};

const getProgram = async () => {
  return new Program(idl, programID, getProvider());
};

const BeeHubs = () => {
  const [gifList, setGifList] = useState([]);
  const [formData, setFormData] = useState(resetForm);

  const [walletAddress, setWalletAddress] = useState(null);

  const arr = Object.values(kp._keypair.secretKey);
  const secret = new Uint8Array(arr);
  const baseAccount = web3.Keypair.fromSecretKey(secret);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const getGifList = async () => {
    try {
      const program = await getProgram();
      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
      setGifList(account.gifList);
    } catch (error) {
      console.log("Error in getGifList: ", error);
      setGifList(null);
    }
  };

  const saveGif = async () => {
    console.log("formData", formData);
    const { gif_link, gif_tag, gif_name, author, author_avatar, style } = formData;

    if (!gif_link || !gif_tag) {
      console.log("No gif link and/or tag given!");
      return;
    }

    try {
      const provider = getProvider();
      const program = await getProgram();

      await program.rpc.addGif(
        gif_link,
        gif_tag,
        gif_name,
        new Date().toISOString(),
        author,
        author_avatar,
        style,
        {
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
          },
        }
      );
      console.log("GIF successfully sent to program");

      await getGifList();
    } catch (error) {
      console.log("Error sending GIF:", error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log("Phantom wallet found!");
      await window.solana
        .connect({
          onlyIfTrusted: true,
        })
        .then((res) => setWalletAddress(res.publicKey.toString()))
        .catch((err) => {
          sessionStorage.removeItem("wallet");
          console.log("ERROR:", err);
        });
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching GIF list...");

      // Call Solana program here.
      getGifList();

      // Set state
      setGifList([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  if (!gifList) return <NewGifAccount baseAccount={baseAccount} getGifList={getGifList} />;

  return (
    <>
      <Grid container gap={2} py={2} justifyContent="flex-start">
        <Item>
          <Stack gap={1} component="form" width={250}>
            <Box className="tx700 tx130">Transactions</Box>
            {["gif_link", "gif_tag", "gif_name"].map((x, i) => (
              <InputField key={i} value={formData[x] || ""} name={x} onChange={onChange} />
            ))}
            <Button variant="contained" onClick={saveGif}>
              Submit
            </Button>
          </Stack>
        </Item>
        <Item>
          <Grid container gap={1}>
            {gifList?.map((gif, i) => (
              <div key={i} className="gif-item">
                <img src={gif.gifLink} alt="img" width={200} />
                <div>Tag: {gif.gifTag}</div>
                <div>Author: {gif.author}</div>
                <div>Avatar:{gif.authorAvatar}</div>
              </div>
            ))}
          </Grid>
        </Item>
      </Grid>
    </>
  );
};

export default BeeHubs;
