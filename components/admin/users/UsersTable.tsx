"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/actions/users.action";
import UserItem from "@/components/admin/users/UserItem";

type Users = Awaited<ReturnType<typeof getAllUsers>>;

export default function UsersTable({ users }: { users: Users }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Actions</TableHead>
            <TableHead className="w-[50px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Birth</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>UpdatedAt</TableHead>
            <TableHead>CreatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total users {users?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
