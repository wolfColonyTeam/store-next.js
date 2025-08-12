import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Nav() {
  return (
    <nav className="bg-black p-4 text-white flex justify-between">
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild>
          <Link href="/about">About</Link>
        </Button>
        <Button asChild>
          <Link href="/contacts">Contacts</Link>
        </Button>
      </div>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
}
