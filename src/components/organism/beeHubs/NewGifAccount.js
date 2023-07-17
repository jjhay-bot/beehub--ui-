import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";
import idl from "./beehubs.json";
import { network, opts, programID } from "./solanaHelper";

const { SystemProgram } = web3;

const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new AnchorProvider(connection, window.solana, opts.preflightCommitment);
  return provider;
};

const getProgram = async () => {
  return new Program(idl, programID, getProvider());
};

const NewGifAccount = ({ baseAccount, getGifList }) => {
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

  return (
    <div className="connected-container">
      <button className="cta-button submit-gif-button" onClick={createGifAccount}>
        Do One-Time Initialization For GIF Program Account
      </button>
    </div>
  );
};

export default NewGifAccount;
