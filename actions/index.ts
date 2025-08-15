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

export async function credentialLogin(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  console.log(email, " email", password, " password");

  // без try/catch: signIn обычно не бросает при неверных данных
  const res = await signIn("credentials", { email, password, redirect: false });
  console.log(res, " res server");

  if (!res) return { ok: false, message: "No response from auth server" };
  if (!res.ok)
    return { ok: false, message: res.error ?? "Invalid credentials" };

  return { ok: true };
}
