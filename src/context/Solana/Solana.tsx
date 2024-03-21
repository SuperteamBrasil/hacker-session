"use client";

import { ENDPOINT } from "@/src/utils/rpc";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

type SolanaProviderProps = {
  children: ReactNode;
};

export type ContextValue = {
  openConnect: boolean;
  setOpenConnect: Dispatch<SetStateAction<boolean>>;
};

export const SolanaContext = createContext<ContextValue | undefined>(undefined);

export function SolanaProvider({ children, ...rest }: SolanaProviderProps) {
  const [openConnect, setOpenConnect] = useState(false);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  const value = useMemo(
    () => ({
      openConnect,
      setOpenConnect,
    }),
    [openConnect, setOpenConnect]
  );

  return (
    <SolanaContext.Provider value={value} {...rest}>
      <ConnectionProvider endpoint={ENDPOINT}>
        <WalletProvider wallets={wallets} autoConnect>
          {children}
        </WalletProvider>
      </ConnectionProvider>
    </SolanaContext.Provider>
  );
}

export const useSolana = (): ContextValue => {
  const context = useContext(SolanaContext);

  if (context === undefined) {
    throw new Error("useSolana must be used within an SolanaProvider");
  }

  return context;
};
