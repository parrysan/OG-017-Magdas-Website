import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Magda — Curated Real Estate Investment in Poland",
  description: "Premium commercial real estate opportunities in Poland. Carefully selected for serious investors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
