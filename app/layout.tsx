import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { lato, geistSans } from "@/app/ui/fonts";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import React from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
export const metadata: Metadata = {
  title: "IT store",
  description: "Shop for IT people - interesting things and gifts",
  keywords: "IT store, gifts",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    title: "Store",
    description: "Interesting things and gifts",
    siteName: "IT STORE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} ${geistSans.className} antialiased min-h-screen text-black bg-basic-white font-400`}
      >
        <div className="min-h-screen flex flex-col items-stretch justify-between">
          <SessionProvider>
            <Toaster />
            <Nav />
            {children}
            <Footer />
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
