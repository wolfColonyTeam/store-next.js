"use client";

import { signIn } from "@/auth";
import { SocialLogin } from "@/components/auth/SocialLogin";
import { credentialLogin } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormEvent } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const formData = new FormData(event.currentTarget);

      if (!formData.get("email") || !formData.get("password")) {
        setError("Email or Password should be empty");
        return;
      }

      console.log(formData.get("email"), " formData");
      const response = await credentialLogin(formData);
      console.log("dddddddddda111111");
      console.log(response, " response LoginForm");

      // if (!response.ok) {
      //   console.log(response, " !response in if");
      //   console.log("response error when try to login");
      // } else {
      //   console.log(response, " response in else");
      //   router.push("/");
      // }
    } catch (err) {
      console.log(err, "ddddddddddd");
    }
  };
  return (
    <>
      {error && <div className="text-red-600 font-bold">{error}</div>}
      <form className="space-y-5" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
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
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="form-input"
          />
        </div>

        <button
          type="submit"
          className="form-btn bg-orange-400 hover:bg-orange-500"
        >
          Sign In with email and password
        </button>
      </form>

      <SocialLogin />
    </>
  );
};
