"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/actions";
import { LogOut, Contact, Mail, UserPen, Settings } from "lucide-react";
import React, { useState } from "react";
import { EditProfile } from "@/components/profile/EditProfile";

type ProfileProps = {
  userName: string;
  userEmail: string;
  userImage: string | null;
};

export default function DropdownProfile({
  userName,
  userEmail,
  userImage,
}: ProfileProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  console.log("Profile re render");
  return (
    <div>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger className="cursor-pointer outline-0">
          <div className="size-11">
            <img
              src={userImage ?? "https://github.com/shadcn.png"}
              alt="User img"
              className="rounded-full aspect-square size-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuLabel>
            <div className="flex items-center">
              <Contact className="size-4 mr-2" /> {userName ?? "User"}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <div className="flex items-center">
              <Mail className="size-4 mr-2" /> {userEmail ?? "user@email.com"}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setEditOpen(true);
              setMenuOpen(false);
            }}
            className="cursor-pointer"
          >
            <div className="flex items-center">
              <UserPen className="size-4 mr-2" /> Edit
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <div className="flex items-center">
              <Settings className="size-4 mr-2" /> Settings
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={async (e) => {
              e.preventDefault();
              await logoutAction();
            }}
            className="cursor-pointer"
          >
            <LogOut className="mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {editOpen && (
        <EditProfile
          userData={{ name: userName, email: userEmail }}
          editOpen={editOpen}
          onOpenEditProfile={setEditOpen}
        />
      )}
    </div>
  );
}
