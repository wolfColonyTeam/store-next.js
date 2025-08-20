import React from "react";
import { socialLogin } from "@/actions";

export const SocialLogin = () => {
  return (
    <form className="mt-3" action={socialLogin}>
      <button
        type="submit"
        name="action"
        value="google"
        className="form-btn bg-grayish-teal"
      >
        Log in with Google
      </button>
      <button
        type="submit"
        name="action"
        value="github"
        className="form-btn bg-lime mt-3"
      >
        Log in with Github
      </button>
    </form>
  );
};
