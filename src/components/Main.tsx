"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  Transaction,
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
  const [recipient, setRecipient] = useState(
    "5WbkB6sDuzBFD5kP1gdAmcemCyGjs9StPLcPpiyGuR5u"
  );
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
    <div>
      <h1>Wallet</h1>
      <p>{wallet.publicKey?.toBase58()}</p>

      <div className="flex items-center gap-3">
        <input
          className="text-black"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />

        <input
          className="text-black"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button onClick={sendSolana}>Send</button>
      </div>
    </div>
  );
};

export default Main;
