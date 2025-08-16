"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Nav() {
  const pathname = usePathname();

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

  return (
    <nav className="bg-grayish-teal p-4 text-white flex justify-between">
      <div className="flex gap-2">
        {navList.map((link: { name: string; href: string }) => {
          return (
            <Button
              asChild
              className="bg-grayish-teal border border-grass p-2 hover:bg-grey"
            >
              <Link
                key={link.name}
                href={link.href}
                className={clsx("bg-grass hover:bg-grey", {
                  "bg-grey ": pathname === link.href,
                })}
              >
                {link.name}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button
          asChild
          className="bg-grayish-teal border border-grass p-2 hover:bg-grey"
        >
          <Link href="/login">Login</Link>
        </Button>
        <Button
          asChild
          className="bg-grayish-teal border border-grass p-2 hover:bg-grey"
        >
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
}
