import type { Route } from "./+types/home";
import { Navbar } from "~/components/landing/Navbar";
import { Hero } from "~/components/landing/Hero";
import { Features } from "~/components/landing/Features";
import { HowItWorks } from "~/components/landing/HowItWorks";
import { PlatformPreview } from "~/components/landing/PlatformPreview";
import { CTA } from "~/components/landing/CTA";
import { Footer } from "~/components/landing/Footer";

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
		<div className="min-h-screen bg-stone-50 text-slate-800 font-sans antialiased selection:bg-teal-100 selection:text-teal-900">
			<Navbar />
			<main>
				<Hero />
				<Features />
				<HowItWorks />
				<PlatformPreview />
				<CTA />
			</main>
			<Footer />
		</div>
	);
}
