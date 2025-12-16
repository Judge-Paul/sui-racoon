export function PlatformPreview() {
  return (
    <section className="overflow-hidden bg-slate-950 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-20 text-center">
          <h2 className="font-display text-3xl font-bold text-white">
            Platform Preview
          </h2>
          <p className="mt-2 text-slate-400">
            Clean, functional, and built for clarity.
          </p>
        </div>
        <div className="space-y-24">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <div className="group relative w-full md:w-1/2">
              <div className="absolute inset-0 -z-10 rounded-full bg-teal-500/5 blur-3xl transition-colors duration-500 group-hover:bg-teal-500/10"></div>
              <div className="relative transform overflow-hidden rounded-2xl border border-slate-200 shadow-2xl transition-transform duration-500 ease-out hover:rotate-0 md:-rotate-1">
                <img
                  alt="Student Profile Dashboard"
                  className="h-auto w-full object-cover opacity-90 transition-opacity hover:opacity-100"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK8w5m0i2JZUl-arm-cic1i-VD47seQDptRhzbS4WUrcfS7M4uP9pz6R67FPFsMrhhqeQRQawJoU7NsIuGl5JHURoJUgcqbObKHSOuUw46KY1S8qKv-9lHsxbB58zeDPwzt4VHN5_hoHWJ_iTUhWUJLBsimdg_9jgesOk4fBjYPKTXuJtWH4rRZiDGCHZiFW-lrBA7dbGRsRJi_56Hqhrx7XUbiu9VyaxdK7FgQangpZohtfI6Lg49Zb3CoGdCQ84-q54rNdcPSqM"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 ring-inset"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-8">
              <div className="mb-6 inline-block rounded-xl border border-slate-800 bg-slate-900 p-3 shadow-sm">
                <span className="material-symbols-outlined text-white">
                  person
                </span>
              </div>
              <h3 className="font-display mb-4 text-2xl font-bold text-white">
                Student Profile
              </h3>
              <p className="mb-6 text-lg leading-relaxed text-slate-400">
                Your central hub. View all your collected badges, manage
                visibility settings, and generate public links for employers or
                universities.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  Drag & Drop curation
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  Rich media metadata display
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center gap-12 md:flex-row-reverse">
            <div className="group relative w-full md:w-1/2">
              <div className="absolute inset-0 -z-10 rounded-full bg-amber-500/5 blur-3xl transition-colors duration-500 group-hover:bg-amber-500/10"></div>
              <div className="relative transform overflow-hidden rounded-2xl border border-slate-200 shadow-2xl transition-transform duration-500 ease-out hover:rotate-0 md:rotate-1">
                <img
                  alt="Badge Detail View"
                  className="h-auto w-full object-cover opacity-90 transition-opacity hover:opacity-100"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNC9fc3bpnkH10z6xAO9Gfn71XT4fdZfIAyTQw8Cl_O8k9jJ-nXbF53PknX7ty9zbzuk-3cwfrQSdwnSF6hpwxj7oUsnpfA0o6dtC2ydj9T5I6CRHIjpPl5q445XeQIl7nsnnLTp6pPbD5JUfmG0VBV7zcjL4aEDJCJWgULYRHqse1Y75Y9Il5H_YGT47qgWHHIDvgP4fsQry53f31esJRkBhBKP5qj7cR9PQ6nuRKPcg1PFYXZNcd4Z8LkI2PNdhIW9mk_tQGdmI"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 ring-inset"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pr-8">
              <div className="mb-6 inline-block rounded-xl border border-slate-800 bg-slate-900 p-3 shadow-sm">
                <span className="material-symbols-outlined text-white">
                  verified
                </span>
              </div>
              <h3 className="font-display mb-4 text-2xl font-bold text-white">
                Badge Verification
              </h3>
              <p className="mb-6 text-lg leading-relaxed text-slate-400">
                Deep dive into any credential. See the issuer's DID, the
                timestamp, and the proof of attendance. Validated instantly
                against the blockchain.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                  Transparent on-chain history
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
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
