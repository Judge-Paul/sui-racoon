interface BadgeCardProps {
  title: string;
  image: string;
  category: string;
  date: string;
  organizationName: string;
  organizationImage: string;
}

export function BadgeCard({
  title,
  image,
  category,
  date,
  organizationName,
  organizationImage,
}: BadgeCardProps) {
  return (
    <div className="group shadow-card hover:shadow-card-hover relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1">
      <div className="relative mb-5 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-slate-50 to-slate-100 p-8">
        <div className="absolute h-32 w-32 rounded-full opacity-60 blur-2xl"></div>
        <img
          className="relative z-10 h-full w-full rounded-xl object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
          alt={title}
          src={image}
        />
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/10 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
          <button
            className="flex h-11 w-11 transform items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-all hover:scale-110 hover:bg-slate-900"
            title="View Details"
          >
            <span className="material-symbols-outlined text-[22px]">
              visibility
            </span>
          </button>
          <button
            className="flex h-11 w-11 transform items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-all hover:scale-110 hover:bg-slate-900"
            title="Verify On-Chain"
          >
            <span className="material-symbols-outlined text-[22px]">
              verified
            </span>
          </button>
        </div>
      </div>
      <div className="flex grow flex-col">
        <div className="mb-2 flex items-start justify-between">
          <span className="text-xs font-bold tracking-wider uppercase">
            {category}
          </span>
          <span className="font-mono text-xs text-slate-400">{date}</span>
        </div>
        <h3 className="font-display mb-3 text-xl leading-tight font-bold text-slate-900">
          {title}
        </h3>
        <div className="mt-auto flex items-center gap-2.5 border-t border-slate-50 pt-4">
          <img
            className="h-7 w-7 rounded-full border border-slate-100"
            alt={organizationName}
            src={organizationImage}
          />
          <span className="truncate text-sm font-medium text-slate-600">
            {organizationName}
          </span>
        </div>
      </div>
    </div>
  );
}
