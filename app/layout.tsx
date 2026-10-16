import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeProvider from "@/components/ThemeProvider";
import SideScrubber from "@/components/SideScrubber";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Anirudha Kurhade — Java & Distributed Systems Engineer",
  description: "Anirudha Kurhade builds Java and Spring Boot backends, distributed data pipelines, and applies AI to practical engineering bottlenecks.",
  metadataBase: new URL("https://anirudhakurhade.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: { title: "Anirudha Kurhade — Java & Distributed Systems Engineer", description: "Java, Spring Boot, distributed data systems, and practical AI engineering.", type: "website", url: "/" },
  twitter: { card: "summary_large_image", title: "Anirudha Kurhade — Java & Distributed Systems Engineer", description: "Java, Spring Boot, distributed data systems, and practical AI engineering." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}><body className="overflow-x-hidden"><ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}><SmoothScroll>{children}</SmoothScroll><SideScrubber /></ThemeProvider></body></html>;
}
