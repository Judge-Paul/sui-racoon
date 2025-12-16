import { useParams } from "react-router";
import type { Route } from "./+types/user.$address";
import { useState } from "react";
import { toast } from "sonner";
import { BadgeCard } from "~/components/badge-card";
import { FilterTabs } from "~/components/filter-tabs";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Racoon Profile: ${params.address}` },
    { name: "description", content: "View student achievements on Racoon." },
  ];
}

export default function UserProfile(props: Route.ComponentProps) {
  const params = useParams();
  const address = params.address;
  const [activeTab, setActiveTab] = useState("All Badges");
  console.log("props: ", props);
  console.log("params: ", params);

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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW0cRPBCbQKWL-ba4QzMpSl_HLe6L1D9vXDPqlnk_1o1DPH7gcjy3e3W2kTAtl46r3_UoXD2sDGMguBdfY_jG3UL9eb3ujRb-FmaAb0CP951OdvRc1BWXOki-leJwVRVmnKnqyyOyy_OdyTuCP1r8dpttqra955OS2tE4uE4BZKRi65GgsikUE3HpNm1FiK0gAkxAOPbfW_k8Lx8X4iPU-36EHRkbDS9vxWw5Va7yFBsC-bva1YRxWST3ONZUxeECJiSE7YE5gaac"
                />
              </div>
            </div>

            <div className="flex flex-col items-center pt-2 sm:items-start">
              <h1 className="font-display mb-1 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Alex Student
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
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>{" "}
                  Verified Student
                </span>
                {/* <span className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>{" "}
                  Sui Mainnet
                </span> */}
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
            {/* <button className="flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                <span className="material-symbols-outlined text-[18px]">
                  edit
                </span>
                Edit
              </button> */}
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
          <p className="font-display text-4xl font-bold text-white">12</p>
        </div>
        <div className="shadow-card hover:shadow-card-hover group flex cursor-pointer flex-col gap-1 rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[103%] hover:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">Organizations</p>
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 transition-colors group-hover:bg-purple-500/20 group-hover:text-purple-300">
              <span className="material-symbols-outlined text-[20px]">
                school
              </span>
            </div>
          </div>
          <p className="font-display text-4xl font-bold text-white">5</p>
        </div>
        <div className="shadow-card hover:shadow-card-hover group flex cursor-pointer flex-col gap-1 rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[103%] hover:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">Months Active</p>
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/20 group-hover:text-emerald-300">
              <span className="material-symbols-outlined text-[20px]">
                history
              </span>
            </div>
          </div>
          <p className="font-display text-4xl font-bold text-white">2</p>
        </div>
      </section>

      <section className="flex w-full flex-col gap-8">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <h2 className="font-display text-2xl font-bold text-white">
            User's Credentials
          </h2>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            <FilterTabs
              tabs={["All Badges", "Most Recent", "Verified"]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <BadgeCard
            title="Smart Contract 101"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCe9PDhFf-H1FooLQa3iTb5eqxEPqntVVa2MEWSwplIWoSUGGuZkK9yRqy_xXf_wfbKV34TKT5szIf9GiQhAapVWFxa9QBmGivfGkxmT9s2h0oJBW05bZyKfvJqZmMtswR4acYoGUAgH_jl-667M7NribS8ggFCGas6hznd9E6OIV_2p9w7k5sj-O8YmMiGFmL-13LpiNOIIwC0gMmcuxOUDNDgLww8pnRB3FKu2j5o_oMcO02W-_AXNsDqddNJQzAXwdif4BVNNIs"
            category="Tech"
            date="2 days ago"
            organizationName="Sui Foundation"
            organizationImage="https://lh3.googleusercontent.com/aida-public/AB6AXuCCI8IAvFqXoCfMZ-fz3CU3zmqK-pBHQI8BqWwjQkFAgLkDsX8tvSydmUx6uE8nKHT5r8rk4G02JFcrdFf-VDeygwrHqdijFn4VKhDsjyZBb-WtxRvE7y7Ps4g4eVRzzPPJIDavv4_fqRdbrdhq2VlK1YMGumDDwh9ZnGpx0EBvyPjXhEBR9RY7q5PG-EWXvMt3r4z7RUVTQ1aajSWqBGA-lEFvnQTwX0DD1qpHY7fwf6kD_AOvTZdA_vWtBkd4l9U3ardvCDtGcOI"
          />
          <BadgeCard
            title="Advanced UI Patterns"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBnw4K6WooQ941Ge25q8c6J2YEpUAVyVUoQa1D-k-RtFiK4KyCmiMkIrm0-ptME67l54i391dhJ5BgOc61oNbD-hLkETC0OOaieR_yjewT4V6K-GrHVchAy3Lw9y4LvvsoWKvck5Sqw1tTGaPEJ6IhzceiwoGRjTpDqm4f5ifJY4M7XKAWd5fwB--awj1F-4rrVXLYFFaPtRWJrDIouHlNJ0JmNNLN9jVfjfA7VGqelSoVYIDt2YgRkG6bSM_tnv0p44f2AXW9Y1iA"
            category="Design"
            date="1 week ago"
            organizationName="Design Academy"
            organizationImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBrbWq33UhizP1z2H5OwbWWt48cAkL-ALJfhQBPGpV8Wq7DI5X9OpIHo4iLpX6484O52hz9wlz4eOTC1W4FYYrDUraK-3VWv0c7qa2Ke9wY9FTMicVtnVS4ThYqvhYvJ9njtctyFXBcq4dLSsqeCQ91ENywJHOJGKOBQMO7FA5nUneHFs14Q08vqsMwj_rKzBkOd2ZOPkGXk_NbB8Y1jeyLB9mh5Lr2UCwMHDoJ0SmfMlseEaM1e4JKAXWsGWhnNXfvu48VCB2ksxA"
          />
          <BadgeCard
            title="Hackathon Winner 2023"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCDmw4V-NuIZzrMSx3DXE5Hgo6Aqx_IdaY_kjRbEuz8AngNwNd8eZQy972N9NSFtUTFgu4DVruNTzYHuAKP6NOxM39tEM9P2N4W6dQXR8F0bL9n5Upd9hqfZ2GXnbE1JYUoSsLu_JQFtTc_xBy59Jx1kPMMSCdKds4mpaMgnhnoJCGJ67YC2LPMFSswF8rJVRRwZc7c5nNolhecPxmJZYrdI6dDYTiOL7hPXFBHvh4nukypa6iBbdJSCgMlI9Bf4NfLH_Og1-Rv7MU"
            category="Event"
            date="1 mo ago"
            organizationName="Global Hack"
            organizationImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBMhwQhypI8ZqSIwOoAxB4z_3fG3dO63vVOrbvGdBYphbCpUWduOXDivLpxcYqjeY69TK9VE852-EYzCZVqL2P1ckTEl0DKli4oM2s181u6wIZI3SIR7yFQjKUwgCpcYA5ns35YJ-moMlAG-Fv1X7CRsVPm5SrP8ngIijzY3d1I42_DEyHe9i9Tc_gWH-anHa5xvv4wKbytbcYvZesxhGQseLJ-owR2JseWF9gdA_w1hLihA6KBVQa7NfmmlJOr3Co_U1qePHQ9kCw"
          />
          <BadgeCard
            title="Early Contributor"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDJLFVriMRoJqObfYJTXe81j7zZ3m7r1auw1PKs5Ae1ZWNCgv74E7i5ImsN17PpQgnPU_qF3hZmj5zVWql5qPaBPmeAG9AKapnMSb5W1bPfwXYYEVbv6Op4ZQlxDnfyN6gGrSsix61HhOPeSdhxpfEylxB1MvCN3V56GjQyLf9O7e-fkEkpsjxna8C3wGzh_gn097i1-6n8bDiT1qw09uSnwy1qfAQ1imBp3KMo81sGmHbuGh-M39VcloDgUHf-4WyzPKHoAODK-no"
            category="Community"
            date="2 mo ago"
            organizationName="Racoon DAO"
            organizationImage="https://lh3.googleusercontent.com/aida-public/AB6AXuAyQO-9AKVZb3R3LxZ1RRn7OfjyPPgxYRxRRPj9U1BFQSLdpc3o_rXfRMHt95XSk2OUVzMkqUkIhKN1CZ5QWVgzWO1zSIiBiTrIZ0cDBUsAmqA8AvVp_2cb_ByAElBKPfa1yhNh2r7ooBT-w5tZHhAjAqcwGfC5snxSh2d055els9PCCSPJR8TtUideSWhD5PWkDCNXCENpQ-wsKTlTmQNK_tSNz89lMyPSCChP9n2GJ97E8iwVwI3u2WisTdQNMn6BQewxZ4raTds"
          />
        </div>
      </section>
    </main>
  );
}
