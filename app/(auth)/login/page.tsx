import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function Page() {
  return (
    <>
      <div className="max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <div>Log In page</div>
        <LoginForm />
      </div>
    </>
  );
}
