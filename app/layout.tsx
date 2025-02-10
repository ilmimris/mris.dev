import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
	title: {
		default: "mris.dev",
		template: "%s | mris.dev",
	},

	description:
		"Muhammad Rafiul Ilmi Syarifudin, Results-oriented Backend Software Engineer with a passion in AI & ML for building high-impact applications that improve operational efficiency",

	openGraph: {
		title: "mris.dev",
		description:
			"Muhammad Rafiul Ilmi Syarifudin, Results-oriented Backend Software Engineer with a passion in AI & ML for building high-impact applications that improve operational efficiency",
		url: "https://mris.dev",
		siteName: "mris.dev",
		images: [
			{
				url: "https://mris.dev/og.png",
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-US",
		type: "website",
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},

	twitter: {
		title: "mris_ilmi",
		card: "summary_large_image",
	},

	icons: {
		shortcut: "/favicon.png",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<head>
				<Analytics />
				<SpeedInsights />
			</head>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				{children}
			</body>
			<GoogleTagManager gtmId="GTM-5R9DK7S3" />
		</html>
	);
}
