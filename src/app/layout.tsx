import type { Metadata } from "next";
import "./globals.css";

// Use your live Vercel URL so OG previews resolve correctly.
const siteUrl = "https://offline-chess-rohanteja.vercel.app";

const ogTitle = "Offline Chess — Play Free Chess in Your Browser Now";
const description =
  "Play free chess in your browser with legal moves, move history, undo, and board flip. Fast, minimal, and works offline after load.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Offline Chess",
    template: "%s | Offline Chess"
  },
  description,
  applicationName: "Offline Chess",
  keywords: ["chess", "offline chess", "browser chess", "next.js", "chess.js"],
  authors: [{ name: "Rohan" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Offline Chess",
    title: ogTitle,
    description,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Offline Chess — browser chess board"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description,
    images: ["/opengraph-image"]
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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
