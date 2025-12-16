import type { Route } from "./+types/_index";
import { Hero } from "~/components/landing/Hero";
import { Features } from "~/components/landing/Features";
import { HowItWorks } from "~/components/landing/HowItWorks";
import { EcosystemUtility } from "~/components/landing/EcosystemUtility";
import { PlatformPreview } from "~/components/landing/PlatformPreview";
import { CTA } from "~/components/landing/CTA";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Racoon - The On-Chain Student Passport" },
    {
      name: "description",
      content:
        "Issue, verify, and showcase student achievements — powered by the Sui blockchain.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <EcosystemUtility />
      <PlatformPreview />
      <CTA />
    </>
  );
}
