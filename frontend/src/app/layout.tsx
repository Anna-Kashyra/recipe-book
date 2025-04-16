import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: "Recipe Book",
  description: "Best Recipes for all",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <div
      className="grid grid-rows-[100px_1fr_100px] items-center justify-items-center min-h-screen px-20 gap-10 sm:px-15">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
    </body>
    </html>
  );
}
