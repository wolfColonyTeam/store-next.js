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

export async function createUserCredentials(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(name, email, password, " name email pasword");
}
