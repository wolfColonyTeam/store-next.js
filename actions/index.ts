"use server";

import { signIn, signOut } from "@/auth";

export const logoutAction = async () => {
  await signOut({ redirectTo: "/sign-in" });
};

export const socialLogin = async (formData: FormData) => {
  const action = formData.get("action");
  await signIn(String(action), { redirectTo: "/" });
  console.log(action, " action");
};
