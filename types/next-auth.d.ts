import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: string | unknown;
    image?: string | null;
    name: string | null;
  }
}
