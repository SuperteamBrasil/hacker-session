"use client";

import ConnectWallet from "@/src/components/ConnectWallet";
import Main from "@/src/components/Main";
import AppProvider from "@/src/context";

export default function Home() {
  return (
    <div className="flex flex-col p-10">
      <AppProvider>
        <ConnectWallet />

        <Main />
      </AppProvider>
    </div>
  );
}
