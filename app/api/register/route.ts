import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, email, password } = (await request.json()) as {
    name: string;
    email: string;
    password: string;
  };
  console.log(request, " request");
};
