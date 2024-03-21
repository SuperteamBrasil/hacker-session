import { useWallet } from "@solana/wallet-adapter-react";

import React, { useCallback, useMemo } from "react";
import { cn } from "../utils/cn";
import Image from "next/image";

import { useSolana } from "../context/Solana";
import Modal from "./Modal";
import { useUser } from "../context/User";

const ModalConnect: React.FC = () => {
  const { handleLogin } = useUser();
  const { setOpenConnect } = useSolana();
  const { wallets, select } = useWallet();
  const [open, setOpen] = React.useState(true);

  const socialNetworks = useMemo(() => {
    return [
      {
        name: "Google",
        value: "google",
        icon: "",
      },
      {
        name: "Discord",
        value: "discord",
        icon: "",
      },
    ];
  }, []);

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
            {socialNetworks.map((item, index) => (
              <button
                className="bg-white text-black h-5 w-1/2 mr-4"
                key={index}
                onClick={() => handleLogin(item.value as any)}
              >
                {item.name}
              </button>
            ))}

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
