"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { House, ContactRound, Telescope } from "lucide-react";

type Props = {
  isAuthed: boolean;
  userName?: string | null;
  userEmail?: string | null;
  userImage?: string | null;
};

export default function Links({ isAuthed, userEmail }: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const navList = [
    { name: "Home", href: "/", icon: <House className="w-4 mr-1" /> },
    { name: "About", href: "/about", icon: <Telescope className="w-4 mr-1" /> },
    {
      name: "Contacts",
      href: "/contacts",
      icon: <ContactRound className="w-4 mr-1" />,
    },
  ];

  const isActive = (href: string) =>
    `"bg-grayish-teal border border-white p-2 hover:bg-grey rounded-xl ${pathname === href ? "bg-grey" : ""}`;

  return (
    <>
      <div className="flex gap-2">
        {navList.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "bg-grayish-teal border border-white p-2 hover:bg-grey rounded-xl", //clsx - for conditional use of classes
                { "bg-grey ": pathname === link.href },
              )}
            >
              <div className="flex items-center justify-center">
                {link.icon}
                <span>{link.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {isAuthed && userEmail && (
        <>
          {session?.user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className={clsx(
                "bg-grayish-teal border border-white p-2 hover:bg-grey rounded-xl",
                { "bg-grey ": pathname.startsWith("/admin") },
              )}
            >
              Admin Panel
            </Link>
          )}
        </>
      )}

      <div className="logi-logout flex gap-2 items-center">
        {!isAuthed && (
          <>
            <Link className={isActive("/login")} href="/login">
              Login
            </Link>
            <Link className={isActive("/sign-up")} href="/sign-up">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
}
