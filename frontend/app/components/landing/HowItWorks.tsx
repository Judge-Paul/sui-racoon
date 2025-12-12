export function HowItWorks() {
	return (
		<section className="py-24 bg-stone-50" id="verify">
			<div className="max-w-6xl mx-auto px-4">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
						How it works
					</h2>
					<p className="text-slate-500">
						Four simple steps to decentralized academic reputation.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
					<div className="hidden md:block absolute top-12 left-0 w-full h-px bg-slate-200 -z-10"></div>
					<StepCard
						icon="wallet"
						title="Connect Wallet"
						description="Link your Sui wallet. No email or password required."
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
		</section>
	);
}

function StepCard({
	icon,
	title,
	description,
}: {
	icon: string;
	title: string;
	description: string;
}) {
	return (
		<div className="relative group cursor-pointer">
			<div className="w-24 h-24 mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 z-10 relative group-hover:bg-slate-900 transition-colors duration-300 ease-in-out">
				<span className="material-symbols-outlined text-3xl text-slate-700 group-hover:text-slate-100">
					{icon}
				</span>
			</div>
			<div className="text-center px-2">
				<h3 className="font-bold text-slate-900 mb-2">{title}</h3>
				<p className="text-sm text-slate-500">{description}</p>
			</div>
		</div>
	);
}
