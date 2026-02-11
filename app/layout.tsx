import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Antsa Ratolojanahary — Video Editor",
  description: "Portfolio of Antsa Ratolojanahary, video editor & storyteller",
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
