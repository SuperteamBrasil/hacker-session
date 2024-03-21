"use client";

import { SolanaProvider } from "./Solana";
import { UserProvider } from "./User";

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <SolanaProvider>
      <UserProvider>{children}</UserProvider>
    </SolanaProvider>
  );
};

export default AppProvider;
