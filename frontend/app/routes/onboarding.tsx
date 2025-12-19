import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, X, Check, LoaderCircle, Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/onboarding";
import { useNavigate } from "react-router";
import { useCurrentWallet, useSuiClient } from "@mysten/dapp-kit";
import {
  STUDENT_PROFILE_CREATE_FN,
  STUDENT_PROFILE_STRUCT,
} from "~/constants/sui";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { toast } from "sonner";
import { bcs } from "@mysten/sui/bcs";

const profileSchema = z.object({
  displayName: z
    .string()
    .min(2, "Name is too short")
    .max(50, "Max 50 characters"),
  //   username: z
  //     .string()
  //     .min(3, "Username must be at least 3 characters")
  //     .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
  avatarUrl: z.url("Please select an avatar"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const AVATAR_OPTIONS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Chinelo&skinColor=bc6c42",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&skinColor=a05a33",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Max&skinColor=8d4526",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna&skinColor=75411f",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Willow&skinColor=5c2a00",
];

export function meta({ params }: Route.MetaArgs) {
  return [{ title: "Complete Sui Racoon Onboarding" }];
}

export default function OnboardingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: "",
      //   username: "",
      avatarUrl: AVATAR_OPTIONS[0],
    },
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { connectionStatus, currentWallet } = useCurrentWallet();
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const currentAvatar = watch("avatarUrl");

  const onSubmit = async (data: ProfileFormValues) => {
    setLoading(true);
    const txb = new Transaction();

    txb.moveCall({
      target: STUDENT_PROFILE_CREATE_FN,
      arguments: [
        txb.pure(
          bcs
            .vector(bcs.u8())
            .serialize(new TextEncoder().encode(data.displayName)),
        ),
        txb.pure(
          bcs
            .vector(bcs.u8())
            .serialize(new TextEncoder().encode(data.avatarUrl)),
        ),
      ],
    });
    signAndExecute(
      {
        transaction: txb,
      },
      {
        onSuccess: (result) => {
          toast.success("Profile created successfully!");
          navigate("/", { replace: true });
        },
        onError: () => {
          toast.error("Failed to create profile. Please try again.");
        },
        onSettled: () => {
          setLoading(false);
        },
      },
    );
  };

  useEffect(() => {
    const verifyAccess = async () => {
      if (connectionStatus === "disconnected") {
        navigate("/", { replace: true });
        return;
      }

      if (
        connectionStatus === "connected" &&
        currentWallet.accounts.length > 0
      ) {
        try {
          const ownedProfiles = await suiClient.getOwnedObjects({
            owner: currentWallet.accounts[0].address,
            filter: {
              StructType: STUDENT_PROFILE_STRUCT,
            },
          });

          if (ownedProfiles.data.length > 0) {
            navigate("/", { replace: true });
          }
        } catch {
          toast.error("Failed to load profile. Please try again.");
          navigate("/", { replace: true });
        }
      }
    };

    verifyAccess();
  }, [connectionStatus, currentWallet, suiClient, navigate]);

  if (connectionStatus !== "connected") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="animate-spin" size={60} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="glass-panel animate-fade-in-up relative w-full max-w-140 rounded-xl p-8 md:p-12"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="font-display mb-2 text-3xl font-bold tracking-tight text-white">
            Complete Your Profile
          </h1>
          <p className="text-[15px] leading-relaxed text-balance text-slate-400">
            Create your on-chain identity to start earning badges.
          </p>
        </div>

        <div className="mb-10 flex flex-col items-center">
          <div
            className="group relative cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="h-32 w-32 rounded-full border-2 border-blue-500/30 p-1.5 transition-colors group-hover:border-blue-500/50">
              <div className="h-full w-full overflow-hidden rounded-full bg-slate-800">
                <img
                  src={currentAvatar}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            {/* <div className="absolute right-1 bottom-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#0c1425] bg-slate-800 text-white shadow-lg">
              <Camera size={16} />
            </div> */}
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-4 cursor-pointer text-sm font-semibold text-blue-400 hover:text-blue-300"
          >
            Change Avatar
          </button>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-[13px] font-medium text-slate-300">
                Display Name *
              </label>
              {/* <span
                className={cn(
                  "text-[10px] tracking-widest uppercase",
                  errors.displayName ? "text-red-400" : "text-slate-500",
                )}
              >
                {watch("displayName").length}/50
              </span> */}
            </div>
            <input
              {...register("displayName")}
              className="h-13 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white transition-all focus:border-blue-500/50 focus:outline-none"
              placeholder="e.g., John Doe"
            />
            {errors.displayName && (
              <p className="text-xs text-red-400">
                {errors.displayName.message}
              </p>
            )}
          </div>

          {/* <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-[13px] font-medium text-slate-300">
                Username *
              </label>
              <span className="text-[10px] tracking-widest text-slate-500 uppercase">
                Unique ID
              </span>
            </div>
            <div className="relative">
              <span className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">
                @
              </span>
              <input
                {...register("username")}
                className="h-13 w-full rounded-xl border border-white/10 bg-white/5 pr-4 pl-8 text-white transition-all focus:border-blue-500/50 focus:outline-none"
                placeholder="username"
              />
            </div>
            {errors.username && (
              <p className="text-xs text-red-400">{errors.username.message}</p>
            )}
          </div> */}

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="group mt-4 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-400 font-bold text-slate-950 text-white shadow-[0_0_20px_rgba(96,165,250,0.3)] transition-all hover:bg-blue-300 hover:text-black active:scale-95 disabled:opacity-50"
          >
            {isSubmitting || loading ? "Completing..." : "Create Profile"}
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            )}
          </button>
        </div>

        {/* Avatar Selection Modal */}
        {isModalOpen && (
          <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm duration-200">
            <div className="glass-panel w-full max-w-md rounded-3xl p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-white">
                  Select Avatar
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                {AVATAR_OPTIONS.map((url) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setValue("avatarUrl", url)}
                    className={cn(
                      "relative aspect-square cursor-pointer overflow-hidden rounded-2xl border-2 transition-all hover:scale-105",
                      currentAvatar === url
                        ? "border-blue-400 ring-2 ring-blue-400/20"
                        : "border-transparent bg-white/5",
                    )}
                  >
                    <img
                      src={url}
                      alt="Option"
                      className="h-full w-full object-cover"
                    />
                    {currentAvatar === url && (
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-400/20">
                        <div className="rounded-full bg-blue-400 p-0.5">
                          <Check
                            size={14}
                            className="stroke-3 text-slate-950"
                          />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="h-12 w-full rounded-xl bg-white/10 font-semibold text-white transition-all hover:bg-white/20"
              >
                Confirm Selection
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
