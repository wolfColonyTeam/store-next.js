import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Nav() {
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
    <nav className="bg-black p-4 text-white flex justify-between">
      <div className="flex gap-2">
        {navList.map((link: { name: string; href: string }) => {
          return (
            <Button asChild>
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/sign">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
}
