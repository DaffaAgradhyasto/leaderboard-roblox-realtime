import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roblox Charts - Real-time Game Leaderboard",
  description: "Discover trending and popular Roblox games in real-time. Live leaderboard with player counts, ratings, and more - updated every minute.",
  keywords: ["Roblox", "games", "leaderboard", "charts", "trending", "popular", "real-time"],
  authors: [{ name: "Roblox Charts" }],
  openGraph: {
    title: "Roblox Charts - Real-time Game Leaderboard",
    description: "Discover trending and popular Roblox games in real-time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
