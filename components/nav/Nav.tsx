import React from "react";
import Links from "@/components/nav/Links";
import { auth } from "@/auth";

export default async function Nav() {
  const session = await auth();
  const isAuthed = Boolean(session?.user);

  console.log(session, " session");

  return (
    <nav className="bg-slate-600 p-4 text-white flex justify-between">
      <Links
        isAuthed={isAuthed}
        userName={session?.user?.name ?? null}
        userEmail={session?.user?.email ?? null}
        userImage={session?.user?.image ?? null}
      />
    </nav>
  );
}
