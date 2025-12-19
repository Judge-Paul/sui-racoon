import { useParams } from "react-router";
import type { Route } from "./+types/user.$address";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BadgeCard } from "~/components/badge-card";
import { FilterTabs } from "~/components/filter-tabs";
import { useSuiClient, useCurrentWallet, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { BADGE_STRUCT, STUDENT_PROFILE_STRUCT, STUDENT_PROFILE_CLAIM_BADGE_FN } from "~/constants/sui";
import { Loader2 } from "lucide-react";
import { Transaction } from "@mysten/sui/transactions";

interface BadgeData {
  objectId: string;
  title: string;
  description: string;
  category: string;
  issuer: string;
  issuedAt: number;
  evidenceUrl: string;
}

interface ProfileData {
  objectId: string;
  name: string;
  profilePictureUrl: string;
  badges: string[];
  isPublic: boolean;
}

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Racoon Profile: ${params.address}` },
    { name: "description", content: "View student achievements on Racoon." },
  ];
}

// Helper to decode vector<u8> to string
function decodeBytes(bytes: number[]): string {
  return new TextDecoder().decode(new Uint8Array(bytes));
}

export default function UserProfile(props: Route.ComponentProps) {
  const params = useParams();
  const address = params.address;
  const [activeTab, setActiveTab] = useState("All Badges");
  const [badges, setBadges] = useState<BadgeData[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [claimingBadge, setClaimingBadge] = useState<string | null>(null);

  const suiClient = useSuiClient();
  const { currentWallet, connectionStatus } = useCurrentWallet();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const isOwnProfile = connectionStatus === "connected" &&
    currentWallet?.accounts[0]?.address === address;

  // Fetch user's badges and profile
  useEffect(() => {
    const fetchUserData = async () => {
      if (!address) return;

      setLoading(true);
      try {
        // Fetch badges
        const ownedBadges = await suiClient.getOwnedObjects({
          owner: address,
          filter: { StructType: BADGE_STRUCT },
          options: { showContent: true },
        });

        const badgeDataList: BadgeData[] = [];
        for (const obj of ownedBadges.data) {
          if (obj.data?.content?.dataType === "moveObject") {
            const fields = obj.data.content.fields as any;
            badgeDataList.push({
              objectId: obj.data.objectId,
              title: decodeBytes(fields.title),
              description: decodeBytes(fields.description),
              category: decodeBytes(fields.category),
              issuer: fields.issuer,
              issuedAt: parseInt(fields.issued_at),
              evidenceUrl: decodeBytes(fields.evidence_url),
            });
          }
        }
        setBadges(badgeDataList);

        // Fetch profile
        const ownedProfiles = await suiClient.getOwnedObjects({
          owner: address,
          filter: { StructType: STUDENT_PROFILE_STRUCT },
          options: { showContent: true },
        });

        if (ownedProfiles.data.length > 0) {
          const profileObj = ownedProfiles.data[0];
          if (profileObj.data?.content?.dataType === "moveObject") {
            const fields = profileObj.data.content.fields as any;
            setProfile({
              objectId: profileObj.data.objectId,
              name: decodeBytes(fields.name),
              profilePictureUrl: decodeBytes(fields.profile_picture_url),
              badges: fields.badges || [],
              isPublic: fields.is_public,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [address, suiClient]);

  const handleClaimBadge = async (badgeId: string) => {
    if (!profile || !isOwnProfile) return;

    setClaimingBadge(badgeId);
    const txb = new Transaction();

    txb.moveCall({
      target: STUDENT_PROFILE_CLAIM_BADGE_FN,
      arguments: [
        txb.object(profile.objectId),
        txb.object(badgeId),
      ],
    });

    signAndExecute(
      { transaction: txb },
      {
        onSuccess: () => {
          toast.success("Badge claimed to your profile! 🎉");
          // Update local state
          setProfile(prev => prev ? {
            ...prev,
            badges: [...prev.badges, badgeId]
          } : null);
        },
        onError: (error) => {
          console.error("Claim error:", error);
          toast.error("Failed to claim badge");
        },
        onSettled: () => {
          setClaimingBadge(null);
        },
      }
    );
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${diffDays >= 14 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} mo ago`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl grow flex-col items-center px-4 py-8 pt-32 md:px-0">
      <section className="glass-panel animate-fade-in-up group relative mb-10 w-full overflow-hidden rounded-3xl p-6 md:p-10">
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]"></div>

        <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-linear-to-tr from-blue-500/20 to-transparent p-1 md:h-32 md:w-32">
                <img
                  className="h-full w-full rounded-full border-4 border-slate-950 object-cover shadow-sm"
                  alt="Profile picture"
                  src={profile?.profilePictureUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
                />
              </div>
            </div>

            <div className="flex flex-col items-center pt-2 sm:items-start">
              <h1 className="font-display mb-1 text-3xl font-bold tracking-tight text-white md:text-4xl">
                {profile?.name || "Anonymous Student"}
              </h1>
              <div className="mb-4 flex items-center gap-2 text-slate-400">
                <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-sm text-slate-300">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(address || "");
                    toast.info("Address copied!");
                  }}
                  className="cursor-pointer text-slate-500 transition-colors hover:text-white"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    content_copy
                  </span>
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                {profile && (
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>{" "}
                    Verified Student
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex w-full justify-center gap-3 md:mt-0 md:w-auto md:justify-end">
            <button
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 shadow-sm ease-in-out hover:scale-110 hover:bg-white/10 hover:text-white active:scale-90"
              title="Show QR Code"
            >
              <span className="material-symbols-outlined">qr_code_2</span>
            </button>
            <button className="flex h-11 cursor-pointer items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-slate-950 shadow-sm ease-in-out hover:scale-105 hover:bg-slate-200 active:scale-90">
              <span className="material-symbols-outlined text-[18px]">
                share
              </span>
              Share
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="shadow-card hover:shadow-card-hover group flex cursor-pointer flex-col gap-1 rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[103%] hover:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">Badges Earned</p>
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500/20 group-hover:text-blue-300">
              <span className="material-symbols-outlined text-[20px]">
                military_tech
              </span>
            </div>
          </div>
          <p className="font-display text-4xl font-bold text-white">{badges.length}</p>
        </div>
        <div className="shadow-card hover:shadow-card-hover group flex cursor-pointer flex-col gap-1 rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[103%] hover:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">Claimed to Profile</p>
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 transition-colors group-hover:bg-purple-500/20 group-hover:text-purple-300">
              <span className="material-symbols-outlined text-[20px]">
                verified
              </span>
            </div>
          </div>
          <p className="font-display text-4xl font-bold text-white">{profile?.badges.length || 0}</p>
        </div>
        <div className="shadow-card hover:shadow-card-hover group flex cursor-pointer flex-col gap-1 rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[103%] hover:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">Unique Issuers</p>
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/20 group-hover:text-emerald-300">
              <span className="material-symbols-outlined text-[20px]">
                school
              </span>
            </div>
          </div>
          <p className="font-display text-4xl font-bold text-white">
            {new Set(badges.map(b => b.issuer)).size}
          </p>
        </div>
      </section>

      <section className="flex w-full flex-col gap-8">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <h2 className="font-display text-2xl font-bold text-white">
            {isOwnProfile ? "Your Badges" : "User's Credentials"}
          </h2>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            <FilterTabs
              tabs={["All Badges", "Most Recent", "Claimed"]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>

        {badges.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined mb-4 text-6xl text-slate-600">
              military_tech
            </span>
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No Badges Yet</h3>
            <p className="text-slate-500">
              {isOwnProfile
                ? "You haven't received any badges yet. Complete courses or attend events to earn badges!"
                : "This user hasn't received any badges yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {badges
              .filter(badge => {
                if (activeTab === "Claimed") {
                  return profile?.badges.includes(badge.objectId);
                }
                return true;
              })
              .sort((a, b) => {
                if (activeTab === "Most Recent") {
                  return b.issuedAt - a.issuedAt;
                }
                return 0;
              })
              .map((badge) => (
                <div key={badge.objectId} className="relative">
                  <BadgeCard
                    title={badge.title}
                    image={badge.evidenceUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${badge.objectId}`}
                    category={badge.category}
                    date={formatDate(badge.issuedAt)}
                    organizationName={`${badge.issuer.slice(0, 6)}...${badge.issuer.slice(-4)}`}
                    organizationImage={`https://api.dicebear.com/7.x/identicon/svg?seed=${badge.issuer}`}
                  />
                  {isOwnProfile && !profile?.badges.includes(badge.objectId) && (
                    <button
                      onClick={() => handleClaimBadge(badge.objectId)}
                      disabled={claimingBadge === badge.objectId}
                      className="absolute bottom-4 left-4 right-4 flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-500 text-sm font-semibold text-white transition-all hover:bg-blue-400 disabled:opacity-50"
                    >
                      {claimingBadge === badge.objectId ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Claiming...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">add</span>
                          Add to Profile
                        </>
                      )}
                    </button>
                  )}
                  {profile?.badges.includes(badge.objectId) && (
                    <div className="absolute top-4 right-4 flex h-8 items-center gap-1 rounded-full bg-emerald-500/20 px-3 text-xs font-semibold text-emerald-400">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      Claimed
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </section>
    </main>
  );
}

