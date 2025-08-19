import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: UserI
  }

  interface User {
    id: string;
    email: string;
    role: string | any;
    image?: string;
    name: string;
  }

  interface Token {
    role: string;
    image?: string;
    name: string,
    sub: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }

}
