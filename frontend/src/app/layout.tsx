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
    <body className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <header className="container mx-auto flex justify-center items-center pt-8 pb-8">
        <Header />
      </header>
        <main className="container mx-auto pt-12 pb-12">{children}</main>
      <footer className="container mx-auto flex justify-center items-center pt-8 pb-8">
        <Footer />
      </footer>
    </body>
    </html>
  );
}
