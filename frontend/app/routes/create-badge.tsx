import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useCurrentWallet,
  useSuiClient,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { toast } from "sonner";
import { Loader2, X, Plus } from "lucide-react";
import {
  BADGE_MINT_BATCH_FN,
  CLOCK_OBJECT_ID,
  ORGANIZER_PASS_STRUCT,
} from "~/constants/sui";
import { Transaction } from "@mysten/sui/transactions";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  recipients: z
    .array(z.string().regex(/^0x[a-fA-F0-9]{64}$/, "Invalid Sui address"))
    .min(1, "Please add at least one recipient"),
});

type FormData = z.infer<typeof schema>;

export function meta() {
  return [
    { title: "Create Badge - Racoon" },
    {
      name: "description",
      content: "Create badges and mint them to a list of recipient wallets.",
    },
  ];
}

export default function CreateBadgePage() {
  const { connectionStatus, currentWallet } = useCurrentWallet();
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const [checkingPass, setCheckingPass] = useState(true);
  const [recipientInput, setRecipientInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      recipients: [],
    },
  });

  const recipients = watch("recipients");

  useEffect(() => {
    const checkPass = async () => {
      if (connectionStatus !== "connected" || !currentWallet?.accounts[0]) {
        setCheckingPass(false);
        return;
      }
      try {
        await suiClient.getOwnedObjects({
          owner: currentWallet.accounts[0].address,
          filter: { StructType: ORGANIZER_PASS_STRUCT },
        });
      } catch (e) {
        console.error("Pass check error:", e);
      } finally {
        setCheckingPass(false);
      }
    };
    checkPass();
  }, [connectionStatus, currentWallet, suiClient]);

  const addRecipients = (text: string) => {
    const rawAddresses = text
      .split(/[,\n\s]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const validNewAddresses = rawAddresses.filter(
      (addr) => /^0x[a-fA-F0-9]{64}$/.test(addr) && !recipients.includes(addr),
    );

    if (validNewAddresses.length > 0) {
      setValue("recipients", [...recipients, ...validNewAddresses], {
        shouldValidate: true,
      });
      setRecipientInput("");
    } else if (rawAddresses.length > 0) {
      toast.error("Invalid or duplicate Sui address");
    }
  };

  const removeRecipient = (index: number) => {
    const updated = recipients.filter((_, i) => i !== index);
    setValue("recipients", updated, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const tx = new Transaction();

      tx.moveCall({
        target: BADGE_MINT_BATCH_FN as any,
        arguments: [
          tx.object(CLOCK_OBJECT_ID),
          // Use tx.pure("vector<address>", data.recipients) instead
          tx.pure("vector<address>", data.recipients),
          tx.pure.string(data.title),
          tx.pure.string(data.description),
          tx.pure.string("General"),
          tx.pure.string(""),
        ],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: () => {
            toast.success(
              `Successfully minted ${data.recipients.length} badges!`,
            );
            reset();
          },
          onError: (err) => {
            toast.error(err.message || "Transaction failed");
          },
        },
      );
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (connectionStatus !== "connected") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="glass-panel max-w-md rounded-xl border border-white/10 bg-slate-900/50 p-8 text-center backdrop-blur-md">
          <h1 className="mb-2 text-2xl font-bold text-white">Connect Wallet</h1>
          <p className="text-slate-400">
            Please connect your Sui wallet to access the Badge Creator.
          </p>
        </div>
      </div>
    );
  }

  if (checkingPass) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass-panel rounded-2xl border border-white/10 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Create Badge
            </h1>
            <p className="mt-2 text-slate-400">
              Issue soulbound badges to multiple recipients in a single
              transaction.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Badge Title
              </label>
              <input
                {...register("title")}
                placeholder="e.g. Suinami Volunteers"
                className={`w-full rounded-xl border ${errors.title ? "border-red-500" : "border-white/10"} bg-white/5 px-4 py-3 text-white transition-all placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:outline-none`}
              />
              {errors.title && (
                <p className="mt-1.5 text-xs font-medium text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={3}
                placeholder="Describe the achievement or event..."
                className={`w-full resize-none rounded-xl border ${errors.description ? "border-red-500" : "border-white/10"} bg-white/5 px-4 py-3 text-white transition-all placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:outline-none`}
              />
              {errors.description && (
                <p className="mt-1.5 text-xs font-medium text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Recipients ({recipients.length})
              </label>
              <div
                className={`min-h-[140px] w-full rounded-xl border ${errors.recipients ? "border-red-500" : "border-white/10"} bg-white/5 p-3 transition-all focus-within:ring-2 focus-within:ring-blue-500/50`}
              >
                <div className="flex flex-wrap gap-2">
                  {recipients.map((addr, idx) => (
                    <div
                      key={addr}
                      className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/20 px-2.5 py-1 font-mono text-xs text-blue-100"
                    >
                      <span>
                        {addr.slice(0, 6)}...{addr.slice(-4)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeRecipient(idx)}
                        className="transition-colors hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <input
                    value={recipientInput}
                    onChange={(e) => setRecipientInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addRecipients(recipientInput);
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      addRecipients(e.clipboardData.getData("text"));
                    }}
                    placeholder={
                      recipients.length === 0
                        ? "Paste Sui addresses..."
                        : "Add more..."
                    }
                    className="min-w-[150px] flex-1 border-none bg-transparent py-1 text-sm text-white outline-none"
                  />
                </div>
              </div>
              {errors.recipients && (
                <p className="mt-1.5 text-xs font-medium text-red-400">
                  {errors.recipients.message}
                </p>
              )}
              <p className="mt-2 text-[11px] text-slate-500 italic">
                Press Enter or comma to add multiple addresses.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-500 font-bold text-slate-950 shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400 disabled:bg-slate-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing Transaction...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Mint {recipients.length} Badge{recipients.length !== 1 && "s"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
