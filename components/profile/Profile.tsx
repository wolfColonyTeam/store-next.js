import { auth } from "@/auth";
import DropdownProfile from "@/components/profile/DropdownProfile";
import { getUserByEmail } from "@/actions/users.action";

export default async function Profile() {
  console.log("Profile re render");
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);

  if (!session || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DropdownProfile
        userName={user?.name!}
        userEmail={user?.email!}
        userImage={user?.image!}
      />
    </div>
  );
}
