// import React, { useState } from 'react';
// import { Connection, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
// import { WalletModalProvider, useWallet, WalletMultiButton } from '@solana/wallet-adapter-react';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { getPhantomWallet } from '@solana/wallet-adapter-wallets';

// const SolanaNoteCreator = ({ programId }) => {
//   const [content, setContent] = useState('');
//   const wallet = useWallet();

//   const handleCreateNote = async () => {
//     if (!content) return;

//     if (!wallet.connected) {
//       // Connect the wallet if not already connected
//       await wallet.connect();
//     }

//     const connection = new Connection(WalletAdapterNetwork.Devnet); // Use the appropriate network (Devnet for testing)

//     // Prepare the program ID and the program data for the instruction
//     const programPublicKey = new PublicKey(programId);
//     const data = Buffer.from(content, 'utf-8');

//     // Prepare the transaction instruction
//     const instruction = new TransactionInstruction({
//       keys: [{ pubkey: programPublicKey, isSigner: false, isWritable: true }],
//       programId,
//       data,
//     });

//     // Create the transaction
//     const transaction = new Transaction().add(instruction);

//     try {
//       // Sign and send the transaction
//       const txSignature = await wallet.signAndSendTransaction(transaction, connection);
//       console.log('Transaction sent:', txSignature);
//       // Optionally, you can handle transaction results here
//     } catch (error) {
//       console.error('Error creating note:', error);
//       // Handle any errors that occur during the transaction
//     }
//   };

//   return (
//     <div>
//       {wallet.connected ? (
//         <>
//           <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
//           <button onClick={handleCreateNote}>Create Note</button>
//         </>
//       ) : (
//         <div>
//           <WalletModalProvider>
//             <WalletMultiButton />
//           </WalletModalProvider>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SolanaNoteCreator;
