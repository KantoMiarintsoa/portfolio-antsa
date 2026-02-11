import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Antsa Ratolojanahary — Video Editor & Photographer",
  description: "Portfolio of Antsa Ratolojanahary, video editor & photographer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
