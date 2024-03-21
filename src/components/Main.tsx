"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  TransactionInstruction,
  TransactionMessage,
  SystemProgram,
  PublicKey,
  VersionedTransaction,
} from "@solana/web3.js";
import { useCallback, useState } from "react";
import connection from "../utils/rpc";
import validateWallet from "../utils/validateWallet";

const Main = () => {
  const wallet = useWallet();
  const [recipient, setRecipient] = useState("");
  const [value, setValue] = useState("");

  const sendSolana = useCallback(async () => {
    if (
      !wallet.signTransaction ||
      !wallet.publicKey ||
      !wallet.sendTransaction
    ) {
      return;
    }

    try {
      void validateWallet(recipient);

      const ix: TransactionInstruction[] = [];

      ix.push(
        new TransactionInstruction(
          SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(recipient),
            lamports: parseFloat(value) * LAMPORTS_PER_SOL,
          })
        )
      );

      const { blockhash } = await connection.getLatestBlockhash();

      const message = new TransactionMessage({
        payerKey: wallet.publicKey,
        instructions: ix,
        recentBlockhash: blockhash,
      }).compileToV0Message();

      const tx = new VersionedTransaction(message);

      await wallet.sendTransaction(tx, connection);
    } catch (error) {
      console.error(error);
    }
  }, [recipient, value, wallet]);

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="font-bold">Wallet Connected</h1>
      <p>{wallet.publicKey?.toBase58()}</p>

      <span className="mt-10 text-xl font-bold">Send Solana</span>

      <div className="flex items-center gap-3 mt-4">
        <input
          className="border border-white/30 rounded-md p-2 placeholder:text-white/50"
          placeholder="Recipient Address"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />

        <input
          className="border border-white/30 rounded-md p-2 placeholder:text-white/50"
          placeholder="Amount"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 font-bold py-2 px-10 rounded-md mt-8"
        onClick={sendSolana}
      >
        Send
      </button>
    </div>
  );
};

export default Main;
