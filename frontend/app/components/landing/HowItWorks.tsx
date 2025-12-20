import { Wallet, Award, Star, QrCode } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="bg-slate-950 py-24" id="verify">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-display mb-4 text-3xl font-bold text-white">
            How it works
          </h2>
          <p className="text-slate-400">
            Four simple steps to decentralized academic reputation.
          </p>
        </div>
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="absolute top-12 left-0 -z-10 hidden h-px w-full bg-slate-800 md:block"></div>
          <StepCard
            icon={<Wallet size={28} />}
            title="Connect Wallet"
            description="Link your Sui wallet. No email or password required."
          />
          <StepCard
            icon={<Award size={28} />}
            title="On-Chain Profile"
            description="Your profile is minted as a dynamic object on the blockchain."
          />
          <StepCard
            icon={<Star size={28} />}
            title="Receive Badges"
            description="Institutions issue verifiable badges directly to your address."
          />
          <StepCard
            icon={<QrCode size={28} />}
            title="Share & Verify"
            description="Employers verify your history instantly with a public link."
          />
        </div>
      </div>
    </section>
  );
}

function StepCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <div className="group relative cursor-pointer" onClick={onClick}>
      <div className="relative z-10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 shadow-sm transition-colors duration-300 ease-in-out group-hover:border-blue-500 group-hover:bg-blue-600">
        {icon}
      </div>
      <div className="px-2 text-center">
        <h3 className="mb-2 font-bold text-white">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}
