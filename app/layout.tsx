import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ToasterProvider from "@/providers/toaster-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netflix",
  description: "Top rated movies and TV series in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
