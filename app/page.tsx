"use client";

import ConnectWallet from "@/src/components/ConnectWallet";
import Main from "@/src/components/Main";
import ModalConnect from "@/src/components/ModalConnect";
import { SolanaProvider } from "@/src/context/Solana";

export default function Home() {
  return (
    <div>
      <SolanaProvider>
        <ConnectWallet />
        <ModalConnect />

        <Main />
      </SolanaProvider>
    </div>
  );
}
