import {
  User,
  Lock,
  EyeOff,
  Layout,
  Zap,
  Diamond,
  QrCode,
  History,
} from "lucide-react";

export function Features() {
  return (
    <section className="bg-slate-950 py-24" id="features">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-xl">
            <h2 className="font-display mb-4 text-3xl font-bold text-white md:text-4xl">
              Everything you need to build reputation.
            </h2>
            <p className="text-lg text-slate-400">
              A complete suite of tools for students, universities, and event
              organizers.
            </p>
          </div>
          {/* (button removed) */}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<User size={20} />}
            title="Verifiable Profile"
            description="A permanent, owned CV that lives on the internet, not on a server."
          />
          <FeatureCard
            icon={<Lock size={20} />}
            title="Cryptography"
            description="Secured by Ed25519 signatures and the Sui Move language."
          />
          <FeatureCard
            icon={<EyeOff size={20} />}
            title="Privacy Control"
            description="Choose which badges are public and which remain private."
          />
          <FeatureCard
            icon={<Layout size={20} />}
            title="Issuer Dashboard"
            description="Powerful bulk-issue tools for universities and bootcamps."
          />
          <FeatureCard
            icon={<Zap size={20} />}
            title="Instant Verify"
            description="Zero login verification for third parties viewing your profile."
          />
          <FeatureCard
            icon={<Diamond size={20} />}
            title="Minting Pages"
            description="Custom landing pages for students to claim earned badges."
          />
          <FeatureCard
            icon={<QrCode size={20} />}
            title="QR Access"
            description="Physical-to-digital bridge for in-person networking."
          />
          <FeatureCard
            icon={<History size={20} />}
            title="SBT Standard"
            description="Soul-bound tokens that stick to your identity forever."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group hover:shadow-soft cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 ease-in-out hover:border-slate-700 hover:bg-slate-900">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>
      <h3 className="font-display mb-2 font-semibold text-white">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}
