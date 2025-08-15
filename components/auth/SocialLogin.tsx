import React from "react";
import { socialLogin } from "@/actions";

export const SocialLogin = () => {
  return (
    <form className="mt-3" action={socialLogin}>
      <button type="submit" name="action" value="google" className="form-btn">
        Sign in with Google
      </button>
      <button
        type="submit"
        name="action"
        value="github"
        className="form-btn bg-black mt-3"
      >
        Sign in with Github
      </button>
    </form>
  );
};
