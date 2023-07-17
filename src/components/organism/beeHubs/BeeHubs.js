import { Button, Grid, Stack, Box, Avatar, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Item } from "../../atoms/customComponent";
import NewGifAccount from "./NewGifAccount";
import idl from "./beehubs.json";
import kp from "./keypair.json";
import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";
import { opts, network, programID, resetForm, InputField } from "./solanaHelper";
import { startCase } from "lodash";
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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "author") {
      localStorage.setItem("gif_author", e.target.value);
    }
  };

  const getGifList = async () => {
    try {
      const program = await getProgram();
      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
      setGifList(account.gifList.reverse());
    } catch (error) {
      console.log("Error in getGifList: ", error);
      setGifList(null);
    }
  };

  const saveGif = async () => {
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
      setFormData(resetForm);
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
    const onLoad = async () => await checkIfWalletIsConnected();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    getGifList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  if (!gifList) return <NewGifAccount baseAccount={baseAccount} getGifList={getGifList} />;

  return (
    <>
      <Grid container spacing={2} py={2} justifyContent="flex-start">
        <Item sm={5} md={3.5}>
          <Stack gap={1} width={250}>
            <Box className="tx700 tx130">Transactions</Box>
            {["gif_link", "gif_tag", "gif_name"].map((x, i) => (
              <InputField key={i} value={formData[x] || ""} name={x} onChange={onChange} />
            ))}

            <Box pb={1} />

            {["author", "author_avatar"].map((x, i) => (
              <InputField
                key={i}
                value={formData[x] || ""}
                name={x}
                onChange={onChange}
                optional={true}
              />
            ))}
            <Box mt={-0.5} />
            <Button variant="contained" onClick={saveGif}>
              Submit
            </Button>
          </Stack>
        </Item>
        <Item sm={7} md={8.5}>
          <Grid container gap={2} justifyContent="end">
            <Box className="tx600 tx130 c1">{!gifList.length ? "Add you first Buzz!!!" : "Buzz!!!"}</Box>
            {[1, 2, 3].map((_, i) => (
              <img
                key={i}
                src="https://www.freepnglogos.com/uploads/bee-png/does-bee-sting-the-penis-hurt-idiotprufs-32.png"
                alt="bee"
                height={20}
                style={{
                  transform: `rotate(${Math.random(60) * 61 - 30}deg)`,
                }}
              />
            ))}
          </Grid>
          <Grid container gap={2}>
            {gifList?.map((gif, i) => (
              <Grid key={i} py={1}>
                <img src={gif.gifLink} alt="img" width={200} height={200} style={{ borderRadius: "2.5rem" }} />
                <Grid container gap={1} justifyContent="space-between" alignItems="end" px={1} pb={1}>
                  <Tooltip title="Gif name" arrow>
                    <Grid className="tx800 tx100 c1"
                      sx={{maxWidth: "100px"}}
                    >{startCase(gif.gifName)}</Grid>
                  </Tooltip>
                  <Tooltip title="hashtag" arrow>
                    <Grid className="tx500 tx80 c1">#{gif.gifTag}</Grid>
                  </Tooltip>
                </Grid>
                <Grid container gap={1} justifyContent="end" px={1}>
                  <Grid className="tx500 tx80 c3" component="i">
                    -{gif.author}
                  </Grid>
                  <Avatar
                    sx={{ width: 22, height: 22, border: "1px dashed silver" }}
                    alt={gif.authorAvatar}
                    src={
                      gif.authorAvatar ||
                      "https://media4.giphy.com/media/RGvJD7iJehKK57K2TG/200w.webp?cid=ecf05e47heyaw9pjcwshp4vzvszsszgpkzxm7pe1zxdlt3ya&ep=v1_gifs_search&rid=200w.webp&ct=g"
                    }
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Item>
      </Grid>
    </>
  );
};

export default BeeHubs;
