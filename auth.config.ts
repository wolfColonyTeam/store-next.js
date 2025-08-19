import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import connectDb from "@/lib/dbConnect";
import User from "@/model/user.model";
import { CustomError } from "@/lib/utils";

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
        email: {},
        password: {},
        provider: {},
      },

      authorize: async (credentials) => {
        await connectDb();

        console.log(credentials, " credentials authorize server");

        const user = await User.findOne({
          email: credentials?.email,
          provider: credentials?.provider,
        });

        if (!user) throw new CustomError("Invalid credentials"); //no user found

        // TODO: replace with bcrypt.compare(...)
        const isValidPassword = credentials?.password === user.password;

        if (!isValidPassword) throw new CustomError("Invalid credentials");

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // for OAuth-providers one single branch
      console.log(" callbacks signIn server");
      if (account?.provider === "google" || account?.provider === "github") {
        await connectDb();

        const provider = account.provider as "google" | "github";
        const email = (profile as any)?.email || (user as any)?.email || null;
        if (!email) {
          throw new Error("Email should be provided"); // return exit creating user
        }

        const name =
          (profile as any)?.name ||
          (provider === "github" ? (profile as any)?.login : null) ||
          (user as any)?.name ||
          (email.includes("@") ? email.split("@")[0] : "User");

        const image = (profile as any)?.picture ?? (profile as any)?.avatar_url ?? (user as any)?.image ?? null;

        // create user
        let dbUser = await User.findOne({ email, provider });
        if (!dbUser) {
          dbUser = await User.create({name, email, image, provider,});
        }
        (user as any).id = dbUser.id;
        (user as any).role = dbUser.role;
        return true;
      }

      // credentials: id already exist from  authorize (in case if it does not)
      if (account?.provider === "credentials") {
        (user as any).id = (user as any).id || (user as any)?._id?.toString?.();
      }

      return true;
    },

    async jwt({token, user}) {
      console.log(" jwt server");
      if (user) {
        // then get role from authorize then callbacks signIn -> user
        token = {...token, role: user.role}
      }
      return token;
    },

    async session({session, token}) {
      console.log(" session server");
      session.user = {...session.user, id: token.sub as string, role: token.role}
      return session;
    },
  }
}  satisfies NextAuthConfig;

