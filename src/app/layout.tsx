import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
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

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${greatVibes.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col transition-colors duration-500">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
