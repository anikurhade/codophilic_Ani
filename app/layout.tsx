import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SpotifyWidget from "@/components/SpotifyWidget";
import ThemeProvider from "@/components/ThemeProvider";
import SideScrubber from "@/components/SideScrubber";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Anirudha Kurhade — Backend Architect & AI Engineer",
  description: "Anirudha Kurhade is a Software Development Engineer specializing in Generative AI, robust data pipelines, and scalable backend architecture.",
  metadataBase: new URL("https://anikurhade.github.io/codophilic_Ani/"),
  openGraph: { title: "Anirudha Kurhade — Backend Architect & AI Engineer", description: "Software Development Engineer building intelligent systems and scalable backend platforms.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}><body className="overflow-x-hidden"><ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}><SmoothScroll>{children}</SmoothScroll><SpotifyWidget /><SideScrubber /></ThemeProvider></body></html>;
}
