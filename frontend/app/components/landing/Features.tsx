import { Link } from "react-router";

export function Features() {
	return (
		<section className="py-24 bg-white" id="features">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
					<div className="max-w-xl">
						<h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
							Everything you need to build reputation.
						</h2>
						<p className="text-slate-500 text-lg">
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
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
		<div className="group p-6 rounded-2xl bg-stone-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-soft transition-all duration-300 ease-in-out cursor-pointer">
			<div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors">
				<span className="material-symbols-outlined">{icon}</span>
			</div>
			<h3 className="font-display font-semibold text-slate-900 mb-2">
				{title}
			</h3>
			<p className="text-sm text-slate-500">{description}</p>
		</div>
	);
}
