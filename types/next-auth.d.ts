import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: string | any;
    image?: string;
    name: string;
  }
}
