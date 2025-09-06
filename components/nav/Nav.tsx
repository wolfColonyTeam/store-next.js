import React from "react";
import Links from "@/components/nav/Links";
import { auth } from "@/auth";
import Profile from "@/components/profile/Profile";

export default async function Nav() {
  const session = await auth();
  const isAuthed = Boolean(session?.user);

  console.log(session, " session 212121");
  console.log(isAuthed, " isAuthed 212121");

  return (
    <nav className="bg-grayish-teal p-4 text-white flex justify-between items-center">
      <Links
        isAuthed={isAuthed}
        userName={session?.user?.name ?? null}
        userEmail={session?.user?.email ?? null}
        userImage={session?.user?.image ?? null}
      />
      {isAuthed && <Profile />}
    </nav>
  );
}
