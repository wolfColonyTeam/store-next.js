"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions";
import clsx from "clsx";

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
  const navList = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contacts",
      href: "/contacts",
    },
  ];
  const pathname = usePathname();

  const isActive = (href: string) =>
    `bg-grayish-teal border border-grass p-2 hover:bg-grey ${pathname === href ? "bg-grey hover:bg-grey" : ""}`;

  return (
    <>
      <div className="flex gap-2">
        {navList.map((link: { name: string; href: string }) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "bg-grayish-teal border border-grass p-2 hover:bg-grey",
                {
                  "bg-grey ": pathname === link.href,
                },
              )}
            >
              {link.name}
            </Link>
          );
        })}
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
              <button
                type="submit"
                className="bg-grayish-teal border border-grass p-2 hover:bg-grey cursor-pointer"
              >
                Logout
              </button>
            </form>
          </>
        ) : (
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
