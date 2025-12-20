import { ExternalLink, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "~/lib/utils";

interface BadgeCardProps {
  title: string;
  image: string;
  category: string;
  date: string;
  organizationName: string;
  organizationImage: string;
  description: string;
  objectId: string;
  issuerAddress: string;
}

export function BadgeCard({
  title,
  image,
  category,
  date,
  organizationName,
  organizationImage,
  description,
  objectId,
  issuerAddress,
}: BadgeCardProps) {
  const verifyOnChain = () => {
    window.open(`https://suiscan.xyz/devnet/object/${objectId}`, "_blank");
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 transition-all hover:border-blue-500/50">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute top-3 left-3">
          <span className="rounded-md border border-white/5 bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold tracking-wider text-blue-400 uppercase backdrop-blur-md">
            {category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex w-4/5 items-center gap-2 overflow-hidden">
            <img
              src={organizationImage}
              alt="Issuer"
              className="size-5 shrink-0 rounded-full"
            />
            <span className="truncate text-xs font-semibold text-slate-300">
              {organizationName}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(issuerAddress);
                toast.success("Issuer address copied");
              }}
              className="cursor-pointer text-white"
              title="Copy Wallet Address"
            >
              <Copy size={14} />
            </button>
          </div>
          <span className="shrink-0 text-[10px] font-medium text-slate-500">
            {date}
          </span>
        </div>

        <h3 className="mb-2 text-lg leading-tight font-bold text-white">
          {title}
        </h3>

        <div className="relative mb-6">
          <p
            className={cn(
              "line-clamp-3 text-sm leading-relaxed text-ellipsis text-slate-400 transition-all duration-300",
            )}
          >
            {description}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-white/5 pt-4">
          <button
            onClick={verifyOnChain}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600/10 py-2.5 text-xs font-bold text-blue-400 transition-all hover:bg-blue-600 hover:text-white"
          >
            <ExternalLink size={14} />
            Verify On-Chain
          </button>
        </div>
      </div>
    </div>
  );
}
