export function PlatformPreview() {
	return (
		<section className="py-24 bg-stone-50 overflow-hidden">
			<div className="max-w-6xl mx-auto px-4">
				<div className="text-center mb-20">
					<h2 className="font-display text-3xl font-bold text-slate-900">
						Platform Preview
					</h2>
					<p className="text-slate-500 mt-2">
						Clean, functional, and built for clarity.
					</p>
				</div>
				<div className="space-y-24">
					<div className="flex flex-col md:flex-row items-center gap-12">
						<div className="w-full md:w-1/2 relative group">
							<div className="absolute inset-0 bg-teal-500/5 blur-3xl rounded-full -z-10 group-hover:bg-teal-500/10 transition-colors duration-500"></div>
							<div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 transform md:-rotate-1 hover:rotate-0 transition-transform duration-500 ease-out">
								<img
									alt="Student Profile Dashboard"
									className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
									src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK8w5m0i2JZUl-arm-cic1i-VD47seQDptRhzbS4WUrcfS7M4uP9pz6R67FPFsMrhhqeQRQawJoU7NsIuGl5JHURoJUgcqbObKHSOuUw46KY1S8qKv-9lHsxbB58zeDPwzt4VHN5_hoHWJ_iTUhWUJLBsimdg_9jgesOk4fBjYPKTXuJtWH4rRZiDGCHZiFW-lrBA7dbGRsRJi_56Hqhrx7XUbiu9VyaxdK7FgQangpZohtfI6Lg49Zb3CoGdCQ84-q54rNdcPSqM"
								/>
								<div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl"></div>
							</div>
						</div>
						<div className="w-full md:w-1/2 md:pl-8">
							<div className="inline-block p-3 rounded-xl bg-white border border-slate-100 shadow-sm mb-6">
								<span className="material-symbols-outlined text-slate-900">
									person
								</span>
							</div>
							<h3 className="font-display text-2xl font-bold text-slate-900 mb-4">
								Student Profile
							</h3>
							<p className="text-slate-500 text-lg leading-relaxed mb-6">
								Your central hub. View all your collected badges, manage
								visibility settings, and generate public links for employers or
								universities.
							</p>
							<ul className="space-y-3">
								<li className="flex items-center gap-3 text-slate-600">
									<span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
									Drag & Drop curation
								</li>
								<li className="flex items-center gap-3 text-slate-600">
									<span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
									Rich media metadata display
								</li>
							</ul>
						</div>
					</div>
					<div className="flex flex-col md:flex-row-reverse items-center gap-12">
						<div className="w-full md:w-1/2 relative group">
							<div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full -z-10 group-hover:bg-amber-500/10 transition-colors duration-500"></div>
							<div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 transform md:rotate-1 hover:rotate-0 transition-transform duration-500 ease-out">
								<img
									alt="Badge Detail View"
									className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
									src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNC9fc3bpnkH10z6xAO9Gfn71XT4fdZfIAyTQw8Cl_O8k9jJ-nXbF53PknX7ty9zbzuk-3cwfrQSdwnSF6hpwxj7oUsnpfA0o6dtC2ydj9T5I6CRHIjpPl5q445XeQIl7nsnnLTp6pPbD5JUfmG0VBV7zcjL4aEDJCJWgULYRHqse1Y75Y9Il5H_YGT47qgWHHIDvgP4fsQry53f31esJRkBhBKP5qj7cR9PQ6nuRKPcg1PFYXZNcd4Z8LkI2PNdhIW9mk_tQGdmI"
								/>
								<div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl"></div>
							</div>
						</div>
						<div className="w-full md:w-1/2 md:pr-8">
							<div className="inline-block p-3 rounded-xl bg-white border border-slate-100 shadow-sm mb-6">
								<span className="material-symbols-outlined text-slate-900">
									verified
								</span>
							</div>
							<h3 className="font-display text-2xl font-bold text-slate-900 mb-4">
								Badge Verification
							</h3>
							<p className="text-slate-500 text-lg leading-relaxed mb-6">
								Deep dive into any credential. See the issuer's DID, the
								timestamp, and the proof of attendance. Validated instantly
								against the blockchain.
							</p>
							<ul className="space-y-3">
								<li className="flex items-center gap-3 text-slate-600">
									<span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
									Transparent on-chain history
								</li>
								<li className="flex items-center gap-3 text-slate-600">
									<span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
									1-click verification check
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
