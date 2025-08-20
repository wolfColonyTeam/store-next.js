import React from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Page() {
  return (
    <>
      <div className="max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <div>Sign up page</div>
        <RegisterForm />
      </div>
    </>
  );
}
