import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://offline-chess.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Offline Chess",
    template: "%s | Offline Chess"
  },
  description:
    "Play chess in the browser with legal moves, move history, and a clean layout. Works offline after load.",
  applicationName: "Offline Chess",
  keywords: ["chess", "offline", "react", "next.js", "chess.js"],
  authors: [{ name: "Rohan" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Offline Chess",
    title: "Offline Chess",
    description:
      "Play chess in the browser with legal moves, move history, and a clean layout.",
    locale: "en_US"
    // Optional: add after you have an image in /public/og.png (1200×630):
    // images: [{ url: "/og.png", width: 1200, height: 630, alt: "Offline Chess" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Offline Chess",
    description:
      "Play chess in the browser with legal moves, move history, and a clean layout."
    // Optional, same as OG:
    // images: ["/og.png"]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png"
  }
};
