"use client";

import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { SolanaExtension } from "@magic-ext/solana";

const magicInstance = () => {
  if (typeof window !== "undefined") {
    return new Magic("pk_live_D6061DA80588956D", {
      extensions: [
        new OAuthExtension(),
        new SolanaExtension({
          rpcUrl:
            "https://mainnet.helius-rpc.com/?api-key=9f2db4bc-ecc8-47e8-882b-15f2d6ad7dcb",
        }),
      ],
    });
  }
};

export const magic = magicInstance();
