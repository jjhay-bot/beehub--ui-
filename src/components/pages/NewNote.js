import React, { useEffect, useState } from "react";
import { Connection, PublicKey, Keypair, SystemProgram, clusterApiUrl } from "@solana/web3.js";
import Noter from "../../util/noter.json";
import { AnchorProvider, getProvider, Program, setProvider } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import base58 from "bs58";
import { Button, Stack, TextField } from "@mui/material";
// import * as borsh from "borsh";

// Define a Borsh schema for the Note account data
// class NoteData extends borsh.Schema {
//   static fields = [
//     ["content", "string"],
//     ["user", "pubkey"],
//   ];
// }

const rpcUrl = "https://api.devnet.solana.com"; // Update this to the RPC URL of your Solana network
const programId = new PublicKey("HQr6tkohQf3kc7mxz9J58eGjSviRqXqxET8siNW4M9sZ"); // Replace this with your actual Noter program ID
const decodedPK = base58.decode(
  "4WHTTDAiZsKS2DWL9DhGo9gjhwXRn8xq92vaeSyNHnuu3kcCYNy1tp4js74nWDd3VdHnDNgJ9XyXvrsPDTiqSoYt"
);
const programKeypair = Keypair.fromSecretKey(decodedPK); // Replace this with the private key of your program in Uint8Array format

const connection = new Connection(clusterApiUrl("devnet"));

async function createNote(content, userPublicKey, wallet) {
  if (!wallet.connected) {
    console.error("Wallet not connected.");
    return;
  }

  const program = new Program(Noter, programId, wallet);

  const noteKeypair = Keypair.generate();

  try {
    // const noteData = new NoteData({
    //   content: content,
    //   user: userPublicKey,
    // });

    // const encodedNoteData = borsh.serialize(NoteData, noteData);
    // const noteAccountData = [encodedNoteData];

    // Manually encode the content string to Uint8Array
    const contentUint8Array = new TextEncoder().encode(content);

    const sig = await program.rpc.createNote(contentUint8Array, {
      accounts: {
        note: noteKeypair.publicKey,
        user: userPublicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [noteKeypair],
    });

    window.open(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);

    const noteAccount = await program.account.note.fetch(noteKeypair.publicKey);

    return noteAccount;
  } catch (err) {
    console.error("Error creating note:", err);
    throw err;
  }
}

function NewNote() {
  const wallet = useWallet(); // Get the wallet using Solana wallet adapter
  const [content, setContent] = useState("");

  useEffect(() => {
    let provider;

    try {
      provider = getProvider();
    } catch {
      provider = new AnchorProvider(connection, wallet, {});
      setProvider(provider);
    }


    const program = new Program(Noter, programId);
    console.log('program', program);
  }, []);
    

  const handleCreateNote = async () => {
    try {
      const content = "Content of new note"; // Replace this with the actual content of the note
      const userPublicKey = programKeypair.publicKey; // Replace this with the public key of the user creating the note

      const createdNote = await createNote(content, userPublicKey, wallet);
      console.log("Created note:", createdNote);
    } catch (err) {
      console.error("Error creating note:", err);
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
}

export default NewNote;
