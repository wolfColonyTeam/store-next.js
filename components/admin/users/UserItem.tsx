"use client";

import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { deleteUser, getFullUserDataByEmail } from "@/actions/users.action";
import { toast } from "react-hot-toast";
import { EditProfile } from "@/components/profile/EditProfile";
import { PencilOff, Trash } from "lucide-react";
import clsx from "clsx";
type User = Awaited<ReturnType<typeof getFullUserDataByEmail>>;

export default function UserItem({ user }: { user: User }) {
  if (!user) {
    return <div>Loading...</div>;
  }

  const [loading, setLoading] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editedEmail, setEditedEmail] = useState("");

  const handleDelete = async (email: string) => {
    if (!email) {
      return;
    }
    setLoading(true);
    try {
      const response = await deleteUser(email);

      if (response?.success) {
        toast.success(response?.message);
      }
    } catch (err) {
      console.error(err, "Failed to delete user");
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (mail: string) => {
    console.log("handleEdit clicked");
    setEditedEmail(mail);

    setLoading(true);
    try {
      const user = await getFullUserDataByEmail(mail);
      setEditUser(user);
      setEditOpen(true);
      console.log("useEffect 2");
    } catch (err) {
      console.log("something went wrong in useEffect ", err);
    } finally {
      setLoading(false);
    }
  };

  console.log(editedEmail, " editedEmail");

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center ">
            <Trash
              className={clsx("size-5 mr-3 fill-red-200 cursor-pointer", {
                "opacity-25 pointer-events-none": loading,
              })}
              onClick={() => handleDelete(user?.email!)}
            />
            <PencilOff
              className={clsx("size-5 fill-blue-500 cursor-pointer", {
                "opacity-25 pointer-events-none": loading,
              })}
              onClick={() => handleEdit(user?.email!)}
            />
          </div>
        </TableCell>
        <TableCell className="font-medium">
          <img
            src={user.image ?? "/user-default.webp"}
            alt="User Image"
            className="size-9 rounded-full"
          />
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.provider}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell className="max-w-17 truncate">
          {user.profile?.phone}
        </TableCell>
        <TableCell>
          {user.profile?.dateOfBirth?.toLocaleString("uk-UA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "Europe/Kyiv",
          }) || "no"}
        </TableCell>
        <TableCell>{user.profile?.gender}</TableCell>
        <TableCell>
          {user.updatedAt.toLocaleString("uk-UA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "Europe/Kyiv",
          })}
        </TableCell>
        <TableCell>
          {user.createdAt.toLocaleString("uk-UA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "Europe/Kyiv",
          })}
        </TableCell>
      </TableRow>
      {editUser && isEditOpen && (
        <EditProfile
          editOpen={isEditOpen}
          onOpenEditProfile={setEditOpen}
          user={editUser}
        />
      )}
    </>
  );
}
