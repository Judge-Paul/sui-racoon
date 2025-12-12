import { useState } from "react";
import { ConnectModal, useWallet } from "@suiet/wallet-kit";

interface ConnectWalletButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function ConnectWalletButton({
  children,
  onClick,
  ...props
}: ConnectWalletButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const { connected } = useWallet();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!connected) {
      setShowModal(true);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      <button onClick={handleClick} {...props}>
        {children || "Connect Wallet"}
      </button>
      <ConnectModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
}
