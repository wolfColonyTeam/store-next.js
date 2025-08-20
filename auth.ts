import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {handlers, auth, signIn, signOut} = NextAuth({
    debug: true,
    secret: process.env.AUTH_SECRET,
    session: {strategy: "jwt"},
    ...authConfig,
});
