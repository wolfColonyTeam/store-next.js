"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createUser } from "@/actions/users.action";

export const RegisterForm = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  type User = Awaited<ReturnType<typeof createUser>>;

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
      const response: User = await createUser(newUser);
      console.log(response, " on client responce 2");

      if (!response.success) {
        setError(response.message);
        return;
      } else {
        toast.success("User created successfully");
        router.push("/login");
      }
      console.log(response, " response");
      console.log(error, " error");
    } catch (error: any) {
      setError(error);
      console.log(error, " error in catch RegisterForm");
    } finally {
      console.log(error, " error in finally RegisterForm");
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
