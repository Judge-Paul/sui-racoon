import {
  ConnectButton,
  ConnectModal,
  useCurrentWallet,
} from "@mysten/dapp-kit";

interface ConnectWalletButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function ConnectWalletButton({
  children,
  onClick,
  ...props
}: ConnectWalletButtonProps) {
  const { connectionStatus, ...wallet } = useCurrentWallet();

  return connectionStatus === "connected" ? (
    <ConnectButton />
  ) : (
    <ConnectModal
      trigger={<button {...props}>{children || "Connect Wallet"}</button>}
    />
  );
}
