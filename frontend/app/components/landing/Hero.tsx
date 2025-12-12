import { ConnectWalletButton } from "../ConnectWalletButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
      <div className="bg-gradient-mesh pointer-events-none absolute top-0 right-0 bottom-0 left-0 -z-10"></div>
      <div className="bg-teal-muted/10 animate-float absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full blur-3xl"></div>
      <div className="bg-amber-soft/10 animate-float-delayed absolute right-1/4 bottom-1/4 -z-10 h-80 w-80 rounded-full blur-3xl"></div>
      <div className="mx-auto max-w-6xl px-4 text-center">
        <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Live on Sui
          </span>
        </div>
        <h1 className="font-display mb-6 text-5xl leading-[1.1] font-bold tracking-tight text-balance text-slate-900 md:text-7xl">
          The On-Chain <br className="hidden md:block" />
          Student{" "}
          <span className="bg-linear-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
            Passport
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-balance text-slate-500 md:text-xl">
          Issue, verify, and showcase student achievements — secured by the Sui
          blockchain. A trustless credential layer for modern education.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ConnectWalletButton className="w-full transform cursor-pointer rounded-xl bg-slate-900 px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg sm:w-auto">
            Connect Wallet
          </ConnectWalletButton>
          <button className="glass-button w-full cursor-pointer rounded-xl px-8 py-3.5 font-semibold sm:w-auto">
            View Demo Profile
          </button>
        </div>
        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="shadow-soft relative rounded-2xl border border-slate-200/60 bg-white/50 p-2 backdrop-blur-sm">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-50">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdLQaK-XAU6dtLXR1cTi5gOmEgUfZPWOa37oMWh_zXke7KMaZ6Uq9rB7vL2XvBo4uHwm16LjC5aX8hnQd7V_Sb_yqFP_Syg0tH3RL7pgouPQmvwNOU8qk-og7UDk_tNn-JFaSNBksky22ULz7BlKp6Zz3LRsIQLMc0pJ96wdez9XVFKt7yL8rRmHyscjudIHpbG4nEeP1rzcDF5mYS2dBJ71YNnrOALhb-GRc5pjqNF1j0nnbm71cQYiuA_j946P0u4URvVF5hSXs')",
                }}
              ></div>
              <div className="absolute inset-0 bg-linear-to-t from-slate-50/50 to-transparent"></div>
              <div className="absolute right-8 bottom-[-10%] left-8 flex h-full flex-col gap-4 rounded-t-2xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-md md:right-20 md:left-20">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-slate-200"></div>
                    <div className="h-3 w-20 rounded bg-slate-100"></div>
                  </div>
                  <div className="ml-auto h-8 w-24 rounded-full border border-teal-100 bg-teal-50"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 rounded-xl border border-slate-100 bg-slate-50"></div>
                  <div className="h-24 rounded-xl border border-slate-100 bg-slate-50"></div>
                  <div className="h-24 rounded-xl border border-slate-100 bg-slate-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
