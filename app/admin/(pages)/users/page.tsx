import UsersTable from "@/components/admin/users/UsersTable";
import { getAllUsers, getUserDataByEmail } from "@/actions/users.action";

export default async function Page() {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 1000);
  // });
  const users = await getAllUsers();

  // console.log(users, " all users");
  return (
    <div className="overflow-x-auto max-w-full">
      <UsersTable users={users} />
    </div>
  );
}
