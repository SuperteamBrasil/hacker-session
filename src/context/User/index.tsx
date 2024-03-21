"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { OAuthRedirectResult, WalletProps } from "./types";
import { magic } from "@/src/utils/magic";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

type UserProviderProps = {
  children: ReactNode;
};

export type ContextValue = {
  userMagic: OAuthRedirectResult | null;
  handleLogin: (provider: "google" | "discord") => Promise<void>;
  userWallet: WalletProps | null;
};

export const UserContext = createContext<ContextValue | undefined>(undefined);

export function UserProvider({ children, ...rest }: UserProviderProps) {
  const wallet = useWallet();
  const [userMagic, setUserMagic] = useState<OAuthRedirectResult | null>(null);

  const handleLogin = useCallback(async (provider: "google" | "discord") => {
    if (!magic) return;

    try {
      await magic?.oauth.loginWithRedirect({
        provider,
        redirectURI: typeof window !== "undefined" ? window.location.href : "",
      });
    } catch {}
  }, []);

  const userWallet: WalletProps | null = useMemo(() => {
    if (wallet?.connected && wallet?.publicKey && !userMagic) {
      return {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
        signMessage: wallet.signMessage,
      } as WalletProps;
    }

    if (!userMagic?.magic?.userMetadata?.publicAddress || !magic) return null;

    return {
      publicKey: new PublicKey(userMagic?.magic?.userMetadata?.publicAddress),
      signAllTransactions: magic?.solana?.signTransaction,
      signTransaction: magic?.solana?.signTransaction,
      signMessage: magic?.solana?.signMessage,
    } as WalletProps;
  }, [
    wallet?.connected,
    wallet.publicKey,
    wallet.signAllTransactions,
    wallet.signTransaction,
    wallet.signMessage,
    userMagic,
  ]);

  useEffect(() => {
    const user = localStorage.getItem("user-magic");

    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser) {
        setUserMagic(parsedUser);
      }
    }
}, []);

  useEffect(() => {
    if (!magic) return;

    magic?.oauth.getRedirectResult().then((res: OAuthRedirectResult) => {
      setUserMagic(res);
      localStorage.setItem("user-magic", JSON.stringify(res));
    });
  }, []);

  const value = useMemo(
    () => ({
      userMagic,
      handleLogin,
      userWallet,
    }),
    [userMagic, handleLogin, userWallet]
  );

  return (
    <UserContext.Provider value={value} {...rest}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): ContextValue => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }

  return context;
};
