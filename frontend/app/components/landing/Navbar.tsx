import { Link } from "react-router";
import { ConnectWalletButton } from "../ConnectWalletButton";

export function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-4 py-4 md:px-8">
      <div className="glass-panel mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-6 py-3">
        <Link to="/" className="flex cursor-pointer items-center gap-2">
          <img src="/logo.png" className="h-8 w-8" />
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Racoon
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {/* <Link
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
          </Link> */}
        </div>
        <ConnectWalletButton className="group hidden cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10 sm:flex">
          <span>Connect Wallet</span>
          <span className="material-symbols-outlined text-sm text-slate-400 transition-colors group-hover:text-white">
            account_balance_wallet
          </span>
        </ConnectWalletButton>
      </div>
    </nav>
  );
}
