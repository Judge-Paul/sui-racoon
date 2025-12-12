import { Link } from "react-router";

export function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-4 py-4 md:px-8">
      <div className="glass-panel mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-6 py-3">
        <div className="flex items-center gap-2">
          <img src="/logo.png" className="h-8 w-8" />
          <span className="font-display text-lg font-bold tracking-tight text-slate-900">
            Racoon
          </span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <Link
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            to="#"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            to="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            to="#verify"
          >
            Verify
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            to="#docs"
          >
            Docs
          </Link>
        </div>
        <button className="group hidden cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold transition-all hover:bg-slate-200 sm:flex">
          <span>Connect Wallet</span>
          <span className="material-symbols-outlined text-sm text-slate-400 transition-colors group-hover:text-slate-600">
            account_balance_wallet
          </span>
        </button>
      </div>
    </nav>
  );
}
