import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Curated Cupid — Luxury Romance Experiences",
  description:
    "Book bespoke romantic room setups, surprise packages, and custom luxury experiences. Crafted for unforgettable moments.",
  keywords: "romantic setup, surprise package, luxury romance, Valentine, anniversary",
  openGraph: {
    title: "Curated Cupid",
    description: "Luxury Romance Experiences, Built Just For You.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0B0B0F] text-white">
        {children}
      </body>
    </html>
  );
}
