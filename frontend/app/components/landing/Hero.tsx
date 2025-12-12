export function Hero() {
	return (
		<section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
			<div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-mesh pointer-events-none -z-10"></div>
			<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-muted/10 rounded-full blur-3xl -z-10 animate-float"></div>
			<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-soft/10 rounded-full blur-3xl -z-10 animate-float-delayed"></div>
			<div className="max-w-6xl mx-auto px-4 text-center">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-8 animate-fade-in-up">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
					</span>
					<span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
						Live on Sui Mainnet
					</span>
				</div>
				<h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 text-balance leading-[1.1]">
					The On-Chain <br className="hidden md:block" />
					Student{" "}
					<span className="bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-slate-700 to-slate-900">
						Passport
					</span>
				</h1>
				<p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
					Issue, verify, and showcase student achievements — secured by the Sui
					blockchain. A trustless credential layer for modern education.
				</p>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
					<button className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
						Connect Wallet
					</button>
					<button className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-xl glass-button font-semibold">
						View Demo Profile
					</button>
				</div>
				<div className="mt-16 relative mx-auto max-w-4xl">
					<div className="relative rounded-2xl border border-slate-200/60 bg-white/50 backdrop-blur-sm shadow-soft p-2">
						<div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-50 relative">
							<div
								className="absolute inset-0 bg-cover bg-center opacity-90"
								style={{
									backgroundImage:
										"url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdLQaK-XAU6dtLXR1cTi5gOmEgUfZPWOa37oMWh_zXke7KMaZ6Uq9rB7vL2XvBo4uHwm16LjC5aX8hnQd7V_Sb_yqFP_Syg0tH3RL7pgouPQmvwNOU8qk-og7UDk_tNn-JFaSNBksky22ULz7BlKp6Zz3LRsIQLMc0pJ96wdez9XVFKt7yL8rRmHyscjudIHpbG4nEeP1rzcDF5mYS2dBJ71YNnrOALhb-GRc5pjqNF1j0nnbm71cQYiuA_j946P0u4URvVF5hSXs')",
								}}
							></div>
							<div className="absolute inset-0 bg-linear-to-t from-slate-50/50 to-transparent"></div>
							<div className="absolute bottom-[-10%] left-8 right-8 md:left-20 md:right-20 h-full bg-white/80 backdrop-blur-md rounded-t-2xl shadow-xl border border-white/50 p-6 flex flex-col gap-4">
								<div className="flex items-center gap-4 border-b border-slate-100 pb-4">
									<div className="w-12 h-12 rounded-full bg-slate-200"></div>
									<div className="space-y-2">
										<div className="h-4 w-32 bg-slate-200 rounded"></div>
										<div className="h-3 w-20 bg-slate-100 rounded"></div>
									</div>
									<div className="ml-auto h-8 w-24 bg-teal-50 rounded-full border border-teal-100"></div>
								</div>
								<div className="grid grid-cols-3 gap-4">
									<div className="h-24 bg-slate-50 rounded-xl border border-slate-100"></div>
									<div className="h-24 bg-slate-50 rounded-xl border border-slate-100"></div>
									<div className="h-24 bg-slate-50 rounded-xl border border-slate-100"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
