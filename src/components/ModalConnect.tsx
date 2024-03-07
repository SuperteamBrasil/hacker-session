import { useWallet } from "@solana/wallet-adapter-react";

import React, { useCallback } from "react";
import { cn } from "../utils/cn";
import Image from "next/image";

import { useSolana } from "../context/Solana";
import Modal from "./Modal";

const ModalConnect: React.FC = () => {
  const { setOpenConnect, openConnect } = useSolana();
  const { wallets, select } = useWallet();
  const [open, setOpen] = React.useState(true);

  const handleConnectPhantom = useCallback(
    (walletName: string) => {
      select(walletName as any);
      setOpenConnect(false);
      setOpen(false);
    },
    [setOpenConnect, select]
  );

  return (
    <Modal open={open} isBlur>
      <div className="relative w-[380px] max-w-[380px] bg-[#12151A] rounded-xl px-5 pt-5">
        <div className="w-full overflow-y-auto min-h-[300px] max-h-[700px] relative pb-6 pt-1">
          <span className="text-white font-medium text-xl text-center font-dm mb-6 flex justify-center items-center">
            Select your wallet
          </span>

          <div>
            {wallets.map((wallet) => (
              <div
                onClick={() => handleConnectPhantom(wallet.adapter.name)}
                key={wallet.adapter.name}
                className="flex items-center h-[40px] cursor-pointer px-4 text-white justify-between hover:bg-[#1C1F24] hover:text-fire-orange-400 rounded-md"
              >
                <span className="text-base font-medium">
                  {wallet.adapter.name}
                </span>
                <Image
                  className={cn("w-[26px] h-[26px]")}
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  width={24}
                  height={24}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConnect;
