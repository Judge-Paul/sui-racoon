import { useState } from "react";
import { ConnectModal, useWallet } from "@suiet/wallet-kit";

export function HowItWorks() {
  const [showModal, setShowModal] = useState(false);
  const { connected } = useWallet();
  return (
    <section className="bg-stone-50 py-24" id="verify">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-display mb-4 text-3xl font-bold text-slate-900">
            How it works
          </h2>
          <p className="text-slate-500">
            Four simple steps to decentralized academic reputation.
          </p>
        </div>
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="absolute top-12 left-0 -z-10 hidden h-px w-full bg-slate-200 md:block"></div>
          <StepCard
            icon="wallet"
            title="Connect Wallet"
            description="Link your Sui wallet. No email or password required."
            onClick={() => {
              if (!connected) setShowModal(true);
            }}
          />
          <StepCard
            icon="badge"
            title="On-Chain Profile"
            description="Your profile is minted as a dynamic object on the blockchain."
          />
          <StepCard
            icon="workspace_premium"
            title="Receive Badges"
            description="Institutions issue verifiable badges directly to your address."
          />
          <StepCard
            icon="qr_code_scanner"
            title="Share & Verify"
            description="Employers verify your history instantly with a public link."
          />
        </div>
      </div>
      <ConnectModal open={showModal} onOpenChange={setShowModal} />
    </section>
  );
}

function StepCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <div className="group relative cursor-pointer" onClick={onClick}>
      <div className="relative z-10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm transition-colors duration-300 ease-in-out group-hover:bg-slate-900">
        <span className="material-symbols-outlined text-3xl text-slate-700 group-hover:text-slate-100">
          {icon}
        </span>
      </div>
      <div className="px-2 text-center">
        <h3 className="mb-2 font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}
