// file: apps/frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header"; // Import the Header

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FULLSEND Auto Delovi",
  description: "Svi delovi za Vaš automobil na jednom mestu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body className={`${inter.className} bg-brand-black text-brand-white`}>
        <Header /> {/* Add the Header here */}
        {children}
      </body>
    </html>
  );
}
