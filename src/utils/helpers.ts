import {
  getAccount,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";
import connection from "./rpc";
import { PublicKey } from "@solana/web3.js";

export const fetchMint = async (mint: string) => {
  try {
    const mintAddress = new PublicKey(mint);
    const mintInfo = await getMint(connection, mintAddress);

    return mintInfo;
  } catch {}
};

export const fetchTokenAccount = async (address: string, mint: string) => {
  try {
    const accountAddress = await getAssociatedTokenAddress(
      new PublicKey(mint),
      new PublicKey(address)
    );

    const tokenAccount = await getAccount(connection, accountAddress);

    return tokenAccount;
  } catch (e) {
    console.error(e);
  }
};
