import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AnchorProvider, getProvider, Program, setProvider, web3 } from "@project-serum/anchor";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import idl from "../../util/noter.json";

const NewNote = ({ adapter, pubKey }) => {
  const PROGRAM_ID = "HQr6tkohQf3kc7mxz9J58eGjSviRqXqxET8siNW4M9sZ";
  const [content, setContent] = useState("");
  const { connection } = useConnection();
  const wallet = adapter;
  const [program, setProgram] = useState();

  useEffect(() => {
    const init = async () => {
      try {
        const provider = getProvider();
        console.log("provider", provider);
      } catch {
        const provider = new AnchorProvider(connection, wallet, {});
        setProvider(provider);
      }

      const program = new Program(idl, PROGRAM_ID);
      setProgram(program);
      console.log("program", program);
    };

    init();
  }, [connection, wallet]);

  const handleCreateNote = async () => {
    const note = web3.Keypair.generate();

    console.log('wallet', wallet.publicKey);
    try {
      if (!pubKey) {
        // If wallet or publicKey is not available, display an error or ask the user to connect the wallet.
        console.log("Wallet not connected. Please connect your wallet.");
        return;
      }
      const encoder = new TextEncoder();
      const data = encoder.encode('Hello, world!');
      
      const sig = await program.rpc.createNote(data, {
        accounts: {
          note: note.publicKey,
          user: pubKey,
          systemProgram: web3.SystemProgram.programId,
        },
      });

      window.open(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack py={4} spacing={2} width={300}>
      <TextField
        label="Note"
        size="small"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button variant="contained" onClick={handleCreateNote}>
        Add Note
      </Button>
    </Stack>
  );
};

export default NewNote;
