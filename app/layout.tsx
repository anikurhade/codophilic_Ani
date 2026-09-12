import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Anirudha Kurhade — Software Engineer",
  description: "Software Engineer specializing in Generative AI, scalable data pipelines, and resilient systems.",
  metadataBase: new URL("https://anikurhade.github.io/codophilic_Ani/"),
  openGraph: { title: "Anirudha Kurhade", description: "Software Engineer building intelligent systems.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geist.variable} ${mono.variable}`}><body><SmoothScroll>{children}</SmoothScroll></body></html>;
}
