import { Link } from "react-router";

export function Navbar() {
	return (
		<nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
			<div className="max-w-6xl mx-auto glass-panel rounded-2xl px-6 py-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="size-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
						<span className="material-symbols-outlined text-[20px]">
							fingerprint
						</span>
					</div>
					<span className="font-display font-bold text-lg tracking-tight text-slate-900">
						Racoon
					</span>
				</div>
				<div className="hidden md:flex items-center gap-8">
					<Link
						className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
						to="#"
					>
						Home
					</Link>
					<Link
						className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
						to="#features"
					>
						Features
					</Link>
					<Link
						className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
						to="#verify"
					>
						Verify
					</Link>
					<Link
						className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
						to="#docs"
					>
						Docs
					</Link>
				</div>
				<button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm font-semibold transition-all group">
					<span>Connect Wallet</span>
					<span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-slate-600 transition-colors">
						account_balance_wallet
					</span>
				</button>
			</div>
		</nav>
	);
}
