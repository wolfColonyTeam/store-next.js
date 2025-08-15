"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions";

type Props = {
  isAuthed: boolean;
  userName?: string | null;
  userEmail?: string | null;
  userImage?: string | null;
};

export default function Links({
  isAuthed,
  userName,
  userEmail,
  userImage,
}: Props) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    `nav-link ${pathname === href ? "bg-blue-700" : ""}`;

  return (
    <>
      <div className="flex gap-2">
        <Link className={isActive("/")} href="/">
          Home
        </Link>
        <Link className={isActive("/about")} href="/about">
          About
        </Link>
        <Link className={isActive("/contacts")} href="/contacts">
          Contacts
        </Link>
      </div>

      <div className="logi-logout flex gap-2 items-center">
        {isAuthed ? (
          <>
            {userName && (
              <span className="text-sm opacity-80 hidden sm:inline">
                name: {userName}
              </span>
            )}
            {userEmail && (
              <span className="text-sm opacity-80 hidden sm:inline">
                email: {userEmail}
              </span>
            )}
            {userImage && (
              <Image src={userImage} width={40} height={40} alt="Avatar" />
            )}
            <form action={logoutAction}>
              <button type="submit" className="nav-link">
                Logout
              </button>
            </form>
          </>
        ) : (
          <>
            <Link className={isActive("/login")} href="/sign-in">
              Sign In
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
