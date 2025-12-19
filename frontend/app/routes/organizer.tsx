import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Loader2, Award, AlertCircle } from "lucide-react";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/organizer";
import { useCurrentWallet, useSuiClient, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import {
    BADGE_MINT_FN,
    ORGANIZER_PASS_STRUCT,
    CLOCK_OBJECT_ID,
} from "~/constants/sui";
import { Transaction } from "@mysten/sui/transactions";
import { toast } from "sonner";
import { bcs } from "@mysten/sui/bcs";

const badgeSchema = z.object({
    recipientAddress: z
        .string()
        .min(66, "Invalid Sui address")
        .max(66, "Invalid Sui address")
        .regex(/^0x[a-fA-F0-9]{64}$/, "Invalid Sui address format"),
    title: z
        .string()
        .min(2, "Title is too short")
        .max(100, "Max 100 characters"),
    description: z
        .string()
        .min(10, "Description is too short")
        .max(500, "Max 500 characters"),
    category: z
        .string()
        .min(2, "Category is too short")
        .max(50, "Max 50 characters"),
    evidenceUrl: z
        .string()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")),
});

type BadgeFormValues = z.infer<typeof badgeSchema>;

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Issue Badges - Racoon" },
        { name: "description", content: "Issue badges to students as an organizer." },
    ];
}

export default function OrganizerPage() {
    const [loading, setLoading] = useState(false);
    const [organizerPass, setOrganizerPass] = useState<string | null>(null);
    const [checkingPass, setCheckingPass] = useState(true);

    const { connectionStatus, currentWallet } = useCurrentWallet();
    const suiClient = useSuiClient();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BadgeFormValues>({
        resolver: zodResolver(badgeSchema),
        defaultValues: {
            recipientAddress: "",
            title: "",
            description: "",
            category: "",
            evidenceUrl: "",
        },
    });

    // Check if user has an organizer pass
    useEffect(() => {
        const checkOrganizerPass = async () => {
            if (connectionStatus !== "connected" || !currentWallet?.accounts[0]) {
                setCheckingPass(false);
                return;
            }

            try {
                const ownedPasses = await suiClient.getOwnedObjects({
                    owner: currentWallet.accounts[0].address,
                    filter: {
                        StructType: ORGANIZER_PASS_STRUCT,
                    },
                });

                if (ownedPasses.data.length > 0) {
                    setOrganizerPass(ownedPasses.data[0].data?.objectId || null);
                } else {
                    setOrganizerPass(null);
                }
            } catch (error) {
                console.error("Error checking organizer pass:", error);
                setOrganizerPass(null);
            } finally {
                setCheckingPass(false);
            }
        };

        checkOrganizerPass();
    }, [connectionStatus, currentWallet, suiClient]);

    const onSubmit = async (data: BadgeFormValues) => {
        if (!organizerPass) {
            toast.error("You don't have an organizer pass!");
            return;
        }

        setLoading(true);
        const txb = new Transaction();

        txb.moveCall({
            target: BADGE_MINT_FN,
            arguments: [
                txb.object(organizerPass),
                txb.object(CLOCK_OBJECT_ID),
                txb.pure.address(data.recipientAddress),
                txb.pure(
                    bcs
                        .vector(bcs.u8())
                        .serialize(new TextEncoder().encode(data.title))
                ),
                txb.pure(
                    bcs
                        .vector(bcs.u8())
                        .serialize(new TextEncoder().encode(data.description))
                ),
                txb.pure(
                    bcs
                        .vector(bcs.u8())
                        .serialize(new TextEncoder().encode(data.category))
                ),
                txb.pure(
                    bcs
                        .vector(bcs.u8())
                        .serialize(new TextEncoder().encode(data.evidenceUrl || ""))
                ),
            ],
        });

        signAndExecute(
            { transaction: txb },
            {
                onSuccess: (result) => {
                    toast.success("Badge minted successfully! 🎉");
                    console.log("Transaction result:", result);
                    reset();
                },
                onError: (error) => {
                    console.error("Transaction error:", error);
                    toast.error("Failed to mint badge. Please try again.");
                },
                onSettled: () => {
                    setLoading(false);
                },
            }
        );
    };

    // Not connected state
    if (connectionStatus !== "connected") {
        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="glass-panel animate-fade-in-up text-center rounded-xl p-8 max-w-md">
                    <AlertCircle className="mx-auto mb-4 h-12 w-12 text-yellow-400" />
                    <h1 className="font-display mb-2 text-2xl font-bold text-white">
                        Connect Your Wallet
                    </h1>
                    <p className="text-slate-400">
                        Please connect your wallet to issue badges.
                    </p>
                </div>
            </div>
        );
    }

    // Checking for organizer pass
    if (checkingPass) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
            </div>
        );
    }

    // No organizer pass
    if (!organizerPass) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="glass-panel animate-fade-in-up text-center rounded-xl p-8 max-w-md">
                    <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
                    <h1 className="font-display mb-2 text-2xl font-bold text-white">
                        Access Denied
                    </h1>
                    <p className="text-slate-400 mb-4">
                        You don't have an Organizer Pass. Only authorized organizers can issue badges.
                    </p>
                    <p className="text-xs text-slate-500">
                        Contact an admin to get an Organizer Pass for your address:
                    </p>
                    <code className="mt-2 block text-xs text-blue-400 break-all">
                        {currentWallet?.accounts[0]?.address}
                    </code>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-24">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="glass-panel animate-fade-in-up relative w-full max-w-xl rounded-xl p-8 md:p-12"
            >
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
                        <Award className="h-8 w-8 text-blue-400" />
                    </div>
                    <h1 className="font-display mb-2 text-3xl font-bold tracking-tight text-white">
                        Issue a Badge
                    </h1>
                    <p className="text-[15px] leading-relaxed text-balance text-slate-400">
                        Mint a badge NFT and send it directly to a student's wallet.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Recipient Address */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-medium text-slate-300">
                            Student Wallet Address *
                        </label>
                        <input
                            {...register("recipientAddress")}
                            className="h-13 w-full rounded-xl border border-white/10 bg-white/5 px-4 font-mono text-sm text-white transition-all focus:border-blue-500/50 focus:outline-none"
                            placeholder="0x..."
                        />
                        {errors.recipientAddress && (
                            <p className="text-xs text-red-400">
                                {errors.recipientAddress.message}
                            </p>
                        )}
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-medium text-slate-300">
                            Badge Title *
                        </label>
                        <input
                            {...register("title")}
                            className="h-13 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white transition-all focus:border-blue-500/50 focus:outline-none"
                            placeholder="e.g., Smart Contract 101 Completion"
                        />
                        {errors.title && (
                            <p className="text-xs text-red-400">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-medium text-slate-300">
                            Description *
                        </label>
                        <textarea
                            {...register("description")}
                            rows={3}
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:border-blue-500/50 focus:outline-none resize-none"
                            placeholder="Describe the achievement or credential..."
                        />
                        {errors.description && (
                            <p className="text-xs text-red-400">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-medium text-slate-300">
                            Category *
                        </label>
                        <input
                            {...register("category")}
                            className="h-13 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white transition-all focus:border-blue-500/50 focus:outline-none"
                            placeholder="e.g., Tech, Design, Event, Community"
                        />
                        {errors.category && (
                            <p className="text-xs text-red-400">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Evidence URL */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-medium text-slate-300">
                            Evidence URL (Optional)
                        </label>
                        <input
                            {...register("evidenceUrl")}
                            className="h-13 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white transition-all focus:border-blue-500/50 focus:outline-none"
                            placeholder="https://..."
                        />
                        {errors.evidenceUrl && (
                            <p className="text-xs text-red-400">
                                {errors.evidenceUrl.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group mt-4 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-400 font-bold text-slate-950 shadow-[0_0_20px_rgba(96,165,250,0.3)] transition-all hover:bg-blue-300 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Minting Badge..." : "Mint & Send Badge"}
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
            </form>
        </div>
    );
}
