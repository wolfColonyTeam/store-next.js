"use client";

import { signIn } from "next-auth/react";
import { SocialLogin } from "@/components/auth/SocialLogin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormEvent } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Fields should not be empty");
      return;
    }

    setIsLoading(true);
    const response = await signIn("credentials", {
      email,
      password,
      provider: "credentials",
      redirect: false, //redirect later if everything is ok
    });

    console.log(response, " res LoginForm.tsx");

    if (response.error) {
      setError(
        response.error === "CredentialsSignin"
          ? "Invalid credentials"
          : "Something went wrong",
      );
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    toast.success("Logged in successful");
    router.push("/"); // where is protected route for example
    router.refresh();
  };
  return (
    <>
      {error && <div className="text-red-600 font-bold">{error}</div>}
      <form onSubmit={handleSignIn} className="space-y-5">
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="form-input"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="form-btn bg-orange-400 hover:bg-orange-500 disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In with email and password"}
        </button>
      </form>

      <SocialLogin />
    </>
  );
};
