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
import React from "react";

type ProfileProps = {
  userName: string;
  userEmail: string;
  userImage: string;
};

export default function Profile({
  userName,
  userEmail,
  userImage,
}: ProfileProps) {
  console.log(userImage, " userImage");
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-0">
          <div className="size-11">
            <img
              src={userImage}
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
          <DropdownMenuItem className="cursor-pointer">
            <div className="flex items-center">
              <UserPen className="size-4 mr-2" /> Profile
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <div className="flex items-center">
              <Settings className="size-4 mr-2" /> Settings
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <form
              action={logoutAction}
              className="flex justify-center items-center"
            >
              <LogOut className="mr-2" />
              <button type="submit">Logout</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
