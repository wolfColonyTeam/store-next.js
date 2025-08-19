"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const RegisterForm = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !formState.name.trim() ||
      !formState.password.trim() ||
      !formState.email.trim()
    ) {
      setError("Fields should not be empty");
      return;
    }

    console.log(
      formState.name,
      formState.email,
      formState.password,
      " userName, email, password",
    );

    setIsLoading(true);
    const newUser = {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    };

    try {
      // const response = await fetch("/api/auth/signup", {});
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      console.log(response, " on client responce 1");
      console.log(data, " on client responce 2");

      if (!data.success) {
        setError(data.message);
        return;
      } else {
        toast.success("User created successfully");
        router.push("/login");
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-5">
      {error && <div className="text-red-600 font-bold">{error}</div>}
      <div>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          onChange={(e) =>
            setFormState({ ...formState, [e.target.name]: e.target.value })
          }
          id="name"
          name="name"
          placeholder="Name"
          className="form-input"
        />
      </div>
      <div>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          onChange={(e) =>
            setFormState({ ...formState, [e.target.name]: e.target.value })
          }
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
          onChange={(e) =>
            setFormState({ ...formState, [e.target.name]: e.target.value })
          }
          id="password"
          name="password"
          type="password"
          placeholder="Min 6 characters"
          className="form-input"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="form-btn bg-grass hover:bg-black-tree disabled:opacity-50"
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};
