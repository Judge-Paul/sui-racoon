import { useEffect } from "react";
import {
  ConnectButton,
  ConnectModal,
  useCurrentWallet,
  useDisconnectWallet,
  useSuiClient,
} from "@mysten/dapp-kit";
import { useNavigate } from "react-router";
import { STUDENT_PROFILE_MODULE } from "~/constants/sui";
import { toast } from "sonner";

export function ConnectWalletButton({ children, ...props }: any) {
  const { connectionStatus, currentWallet } = useCurrentWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const suiClient = useSuiClient();
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      if (connectionStatus === "connected" && currentWallet) {
        try {
          const ownedProfiles = await suiClient.getOwnedObjects({
            owner: currentWallet.accounts[0].address,
            filter: {
              StructType: STUDENT_PROFILE_MODULE,
            },
            options: { showContent: true },
          });

          if (ownedProfiles.data.length === 0) {
            navigate("/onboarding");
          }
        } catch (error) {
          toast.error("Failed to fetch profile. Please try again.");
          disconnect();
        }
      }
    };

    checkProfile();
  }, [connectionStatus, currentWallet, suiClient, navigate]);

  return connectionStatus === "connected" ? (
    <ConnectButton />
  ) : (
    <ConnectModal
      trigger={<button {...props}>{children || "Connect Wallet"}</button>}
    />
  );
}
