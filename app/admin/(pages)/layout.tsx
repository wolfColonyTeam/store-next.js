import type { Metadata } from "next";
import React from "react";
import { DollarSign, Package, Search, SquareStar, Users } from "lucide-react";
import Link from "next/link";
import { ConfirmModal } from "@/app/admin/ConfirmModal";
import AsideNav from "@/components/admin/AsideNav";

export const metadata: Metadata = { title: "Admin" };

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-stretch justify-between">
        <div className="min-h-screen bg-[--color-light-mint] text-[--color-grass]">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-[--color-lime]/40 backdrop-blur bg-[--color-light-mint]/80">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold text-[--color-olive]">
                  Admin Panel
                </h1>
              </div>

              <div className="hidden md:flex items-center gap-3">
                <div className="relative">
                  <input
                    className="h-10 w-72 rounded-xl bg-white/70 placeholder-[--color-light-grey] pl-10 pr-3 text-sm outline-none ring-1 ring-[--color-lime]/50 focus:ring-2 focus:ring-[--color-olive]"
                    placeholder="Search"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--color-grayish-teal]" />
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
            {/* Sidebar */}
            <AsideNav />
            {/* Main */}
            {children}
          </div>

          {/* Modal skeleton */}
          <ConfirmModal />
        </div>
      </div>
    </div>
  );
}
