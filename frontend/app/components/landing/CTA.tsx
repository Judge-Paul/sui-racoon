export function CTA() {
	return (
		<section className="py-24 bg-slate-900 relative overflow-hidden text-center px-4">
			<div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
			<div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
			<div className="relative z-10 max-w-3xl mx-auto">
				<h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
					Begin Your Verified Journey with Racoon
				</h2>
				<p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
					Join thousands of students and institutions building the future of
					academic trust on Sui.
				</p>
				<div className="flex flex-col sm:flex-row justify-center gap-4">
					<button className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors shadow-lg shadow-white/5">
						Connect Wallet
					</button>
					<button className="px-8 py-4 rounded-xl bg-slate-800 text-white font-medium border border-slate-700 hover:bg-slate-700 transition-colors">
						Issue Badges
					</button>
				</div>
			</div>
		</section>
	);
}
