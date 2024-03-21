import { PublicKey } from "@solana/web3.js";

const validateWallet = (wallet: string) => {
  try {
    const publicKey = new PublicKey(wallet);

    if (!PublicKey.isOnCurve(publicKey)) {
      throw new Error("Invalid wallet");
    }
  } catch (error) {
    throw new Error("Invalid wallet");
  }
};

export default validateWallet;
