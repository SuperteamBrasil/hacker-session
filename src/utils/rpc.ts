import { Connection } from "@solana/web3.js";

export const ENDPOINT =
  "https://mainnet.helius-rpc.com/?api-key=3fb2333b-4396-4db0-94c5-663cca63697e";

const connection = new Connection(ENDPOINT);

export default connection;
