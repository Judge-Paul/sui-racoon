import { Link } from "react-router";
import { User, Code, Search } from "lucide-react";

export function EcosystemUtility() {
  return (
    <section className="bg-slate-950 py-24" id="ecosystem">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="font-display mb-4 text-3xl font-bold text-white md:text-4xl">
            Ecosystem Utility
          </h2>
          <p className="text-lg text-slate-400">
            Built for scale, privacy, and interoperability.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-8">
            <div className="mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" size={18} />
              <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                For Users
              </h3>
            </div>

            <UtilityCard
              title="Self-sovereign Identity"
              description="Your reputation travels with you, owned by your private keys, not a corporate database."
            />
            <UtilityCard
              title="Portable Reputation"
              description="Take your achievements across apps, games, and ecosystems."
            />
          </div>

          <div className="space-y-8">
            <div className="mb-6 flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-500" size={18} />
              <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                For Developers
              </h3>
            </div>

            <UtilityCard
              title="High-Speed Minting"
              description="Mint thousands of verifiable POAPs and badges with minimal cost and latency."
            />
            <UtilityCard
              title="On-Chain Analytics"
              description="Query and compose reputation data directly from the blockchain state."
            />
          </div>

          {/* For Builders */}
          <div className="space-y-8">
            <div className="mb-6 flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-500" size={18} />
              <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                For Builders
              </h3>
            </div>

            <UtilityCard
              title="Programmable Assets"
              description="All badges are dynamic NFTs. Upgrade and evolve them as users grow."
            />
            <UtilityCard
              title="Zero-Knowledge Proofs"
              description="Verify credentials (age, KYC) without revealing the underlying identity."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function UtilityCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="group cursor-default rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900">
      <h4 className="font-display mb-2 text-lg font-semibold text-white">
        {title}
      </h4>
      <p className="text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}
