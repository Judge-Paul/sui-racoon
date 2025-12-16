import { Link } from "react-router";

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
          {/* <button className="text-slate-900 font-semibold border-b border-slate-300 pb-1 hover:border-slate-900 transition-colors flex items-center gap-1">
						Read Documentation{" "}
						<span className="material-symbols-outlined text-sm">
							arrow_forward
						</span>
					</button> */}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon="id_card"
            title="Verifiable Profile"
            description="A permanent, owned CV that lives on the internet, not on a server."
          />
          <FeatureCard
            icon="lock"
            title="Cryptography"
            description="Secured by Ed25519 signatures and the Sui Move language."
          />
          <FeatureCard
            icon="visibility_off"
            title="Privacy Control"
            description="Choose which badges are public and which remain private."
          />
          <FeatureCard
            icon="dashboard"
            title="Issuer Dashboard"
            description="Powerful bulk-issue tools for universities and bootcamps."
          />
          <FeatureCard
            icon="bolt"
            title="Instant Verify"
            description="Zero login verification for third parties viewing your profile."
          />
          <FeatureCard
            icon="diamond"
            title="Minting Pages"
            description="Custom landing pages for students to claim earned badges."
          />
          <FeatureCard
            icon="qr_code_2"
            title="QR Access"
            description="Physical-to-digital bridge for in-person networking."
          />
          <FeatureCard
            icon="history_edu"
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
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group hover:shadow-soft cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 ease-in-out hover:border-slate-700 hover:bg-slate-900">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h3 className="font-display mb-2 font-semibold text-white">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}
