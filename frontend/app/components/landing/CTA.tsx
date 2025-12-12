export function CTA() {
  return (
    <section className="relative overflow-hidden bg-slate-900 px-4 py-24 text-center">
      <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[100px]"></div>
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[100px]"></div>
      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className="font-display mb-6 text-4xl font-bold text-white md:text-5xl">
          Begin Your Verified Journey with Racoon
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-slate-400">
          Join thousands of students and institutions building the future of
          academic trust on Sui.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="cursor-pointer rounded-xl bg-white px-8 py-4 font-bold text-slate-900 shadow-lg shadow-white/5 transition-colors hover:bg-slate-100">
            Connect Wallet
          </button>
          <button className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800 px-8 py-4 font-medium text-white transition-colors hover:bg-slate-700">
            Issue Badges
          </button>
        </div>
      </div>
    </section>
  );
}
