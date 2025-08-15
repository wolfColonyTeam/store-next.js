import { CredentialsSignin, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/data/users";
import { use } from "react";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        return {
          createdAt: new Date(Date.now()),
          codes: [],
          name: profile.name ? profile.name : "",
          email: profile.email ? profile.email : profile.id,
          image: profile.picture ?? null,
          id: profile.id ? profile.id : "testid",
        };
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password) {
          throw new CredentialsSignin("Email and password are required");
        }

        const user = getUserByEmail(credentials?.email);

        if (!user?.password) {
          // либо null (даст generic сообщение), либо конкретно:
          throw new CredentialsSignin("Invalid email or password");
        }

        const ok = password === user.password;
        if (!ok) {
          throw new CredentialsSignin("Invalid email or password");
        }

        // success
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
