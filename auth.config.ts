import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { CustomError } from "@/lib/utils";
import prisma from "@/lib/prisma";

interface User {
  id: string;
  email: string;
  role: string;
  image?: string | null;
  name: string | null;
  test?: string | null;
}

export default {
  providers: [
    Google({
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
          scope: "read:user user:email", // for github issue not returning email
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        provider: { label: "Provider", type: "text" },
      },

      async authorize(credentials, req): Promise<User | null> {
        console.log(credentials, req, " credentials, req");

        if (!credentials.email || !credentials.provider) {
          throw new CustomError("No email and provider"); //No email and provider
        }

        const user = await prisma.user.findFirst({
          where: { email: credentials.email, provider: credentials.provider },
        });
        return user
          ? {
              id: user.id,
              name: user.name ?? null,
              email: user.email ?? null,
              image: user.image ?? null,
              role: user.role,
            }
          : null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(" callbacks signIn server");

      if (account?.provider === "google" || account?.provider === "github") {
        const provider = account.provider as "google" | "github";
        const email = (profile as any)?.email || (user as any)?.email || null;

        if (!email) {
          throw new Error("Email should be provided"); // return exit creating user
        }

        const name =
          profile?.name ||
          (provider === "github" ? (profile as any)?.login : null) ||
          user?.name ||
          (email.includes("@") ? email.split("@")[0] : "User");

        const image =
          profile?.picture ?? profile?.avatar_url ?? user?.image ?? null;

        // create user
        let dbUser = await prisma.user.findFirst({ where: { email } });
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: { name, email, image, provider },
          });
        }
        return true;
      }
      return true;
    },

    async jwt({ token, user }) {
      // At the first login (after login/authorization) the user may be,
      // but in OAuth there is nothing in user.role → we take it from the DB.
      // In order not to hit the database every time, we do this only if the role has not yet been recorded.
      if (!token.role) {
        const email =
          (user?.email as string) ?? (token.email as string) ?? null;

        if (email) {
          const dbUser = await prisma.user.findUnique({
            where: { email },
            select: { role: true },
          });

          if (dbUser) {
            token.role = dbUser.role;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub as string,
        role: token.role ?? "USER",
      };
      return session;
    },
  },
} satisfies NextAuthConfig;
