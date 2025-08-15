import React from "react";

export const RegisterForm = () => {
  return (
    <form action="" className="space-y-5">
      <div>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
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

      <button type="submit" className="form-btn">
        Sign Up
      </button>
    </form>
  );
};
