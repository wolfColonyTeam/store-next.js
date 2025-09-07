import { auth } from "@/auth";
import DropdownProfile from "@/components/profile/DropdownProfile";
import { getUserDataByEmail } from "@/actions/users.action";

type ProfileUserType = Awaited<ReturnType<typeof getUserDataByEmail>>;

export default async function Profile() {
  console.log("Profile re render");
  const session = await auth();
  const user: ProfileUserType = await getUserDataByEmail(session?.user?.email!);

  if (!session || !user) {
    return <div>Loading...</div>;
  }

  console.log(user, " user2 in Profile1111");

  return (
    <div>
      <DropdownProfile user={{ ...user }} />
    </div>
  );
}
