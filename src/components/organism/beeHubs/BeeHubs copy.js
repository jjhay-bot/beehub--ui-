import { Box, Button, Grid, Stack } from "@mui/material";
import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { Item } from "../../atoms/customComponent";
import idl from "./beehubs.json";
import kp from "./keypair.json";
import { programID } from "./solanaHelper";
window.Buffer = Buffer;

const { SystemProgram } = web3;

const opts = { preflightCommitment: "processed" };
const network = clusterApiUrl("devnet");

const BeeHubs = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  const arr = Object.values(kp._keypair.secretKey);
  const secret = new Uint8Array(arr);
  const baseAccount = web3.Keypair.fromSecretKey(secret);

  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log("Phantom wallet found!");
      const response = await window.solana.connect({ onlyIfTrusted: true });

      /*
       * Set the user's publicKey in state to be used later!
       */
      setWalletAddress(response?.publicKey.toString());
    } else {
      alert("Solana object not found! Get a Phantom Wallet 👻");
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(connection, window.solana, opts.preflightCommitment);
    return provider;
  };

  const getProgram = async () => {
    return new Program(idl, programID, getProvider());
  };

  const getGifList = async () => {
    try {
      const program = await getProgram();
      console.log("program", program);
      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
      setGifList(account.gifList);
    } catch (error) {
      console.log("Error in getGifList: ", error);
      setGifList(null);
    }
  };

  const createGifAccount = async () => {
    try {
      const provider = getProvider();
      const program = await getProgram();

      console.log("ping");
      await program.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log("Created a new BaseAccount w/ address:", baseAccount.publicKey.toString());
      await getGifList();
    } catch (error) {
      console.log("Error creating BaseAccount account:", error);
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

  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => {
    // If we hit this, it means the program account hasn't been initialized.
    if (gifList === null) {
      return (
        <div className="connected-container">
          <button className="cta-button submit-gif-button" onClick={createGifAccount}>
            Do One-Time Initialization For GIF Program Account
          </button>
        </div>
      );
    }

    const onInputChange = (event) => {
      const { value } = event.target;
      setInputValue(value);
    };

    const sendGif = async () => {
      if (inputValue.length === 0) {
        console.log("No gif link given!");
        return;
      }
      setInputValue("");
      console.log("Gif link:", inputValue);
      try {
        const provider = getProvider();
        const program = await getProgram();

        await program.rpc.addGif(
          inputValue,
          "gif_tag",
          "name",
          "timestamp",
          "author",
          "avatar",
          `style`,
          {
            accounts: {
              baseAccount: baseAccount.publicKey,
              user: provider.wallet.publicKey,
            },
          }
        );
        console.log("GIF successfully sent to program", inputValue);

        await getGifList();
      } catch (error) {
        console.log("Error sending GIF:", error);
      }
    };

    // Otherwise, we're good! Account exists. User can submit GIFs.
    return (
      <Stack className="connected-container" gap={2}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendGif();
          }}>
          <input type="text" placeholder="Enter gif link!" value={inputValue} onChange={onInputChange} />
          <button type="submit" className="cta-button submit-gif-button">
            Submit
          </button>
        </form>
        <Grid container gap={1}>
          {gifList.map((gif) => (
            <div className="gif-item" key={gif}>
              <img src={gif.gifLink} alt="img" width={200} />
              <div>by {JSON.stringify(gif.userAddress)}</div>
            </div>
          ))}
        </Grid>
      </Stack>
    );
  };

  const addCatalog = async () => {
    try {
      const provider = getProvider();
      const program = await getProgram();

      await program.rpc.addCatalog("key_sample", "key_value", {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log("CATALOG ADDED!");
    } catch (error) {
      console.log("Error saving CATALOG:", error);
    }
  };

  return (
    <>
      <h1>Transactions</h1>
      {walletAddress && renderConnectedContainer()}

      <Stack gap={2}>
        <Box className="tx600">Wallet connected!</Box>
        <Grid container gap={2}>
          <Item>
            <Button onClick={addCatalog} variant="contained">
              DO some
            </Button>
          </Item>
        </Grid>
      </Stack>
    </>
  );
};

export default BeeHubs;
