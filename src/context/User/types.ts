import {
  PublicKey,
  SerializeConfig,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import { MagicUserMetadata, PromiEvent, UserInfo } from "magic-sdk";
import type * as Common from "@magic-sdk/commons";

type WalletTransactions =
  | (<T extends Transaction | VersionedTransaction>(
      transaction: T
    ) => Promise<T>)
  | undefined;

export type WalletProps = {
  publicKey: PublicKey;
  signTransaction: WalletTransactions;
  signAllTransactions: WalletTransactions;
  signMessage:
    | ((message: string | Uint8Array) => PromiEvent<
        Uint8Array,
        {
          done: (result: Uint8Array) => void;
          error: (reason: unknown) => void;
          settled: () => void;
        }
      >)
    | undefined;
};

type MagicSignTransaction = (
  transaction: Transaction | VersionedTransaction,
  serializeConfig?: SerializeConfig | undefined
) => Common.PromiEvent<
  {
    rawTransaction: string;
  },
  {
    done: (result: { rawTransaction: string }) => void;
    error: (reason: unknown) => void;
    settled: () => void;
  }
>;

export type MagicWalletProps = {
  publicKey: PublicKey;
  signTransaction: MagicSignTransaction;
  signAllTransactions: MagicSignTransaction;
  signMessage:
    | ((message: string | Uint8Array) => PromiEvent<
        Uint8Array,
        {
          done: (result: Uint8Array) => void;
          error: (reason: unknown) => void;
          settled: () => void;
        }
      >)
    | undefined;
};

export type OAuthRedirectResult = {
  magic: {
    idToken: string;
    userMetadata: MagicUserMetadata;
  };
  oauth: {
    provider: string;
    scope: string[];
    accessToken: string;
    userHandle: string;
    userInfo: UserInfo;
  };
};
