"use server";

import prisma from "@/lib/prisma";

type CreateUserType = {
  email: string;
  password: string;
  name: string;
};

export const createUser = async (data: CreateUserType) => {
  console.log(data, " data123");
  try {
    const { name, email, password } = data;
    if (!name.trim() || !email.trim() || password.length < 4) {
      return { message: "Invalid input", status: 400 };
    }
    const existing = await prisma.user.findFirst({
      where: {
        email: email.trim(),
      },
    });

    console.log(existing, " existing123");

    if (existing) {
      return { message: "User already exists", status: 409, success: false };
    }

    // TODO hash password
    // const hash = await bcrypt.hash(password, 10);

    const created = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        password: password,
        provider: "credentials",
      },
    });

    return {
      message: "User created",
      userId: created.id,
      status: 201,
      success: true,
    };
  } catch (err: any) {
    if (err?.code === 11000) {
      return { message: "User already exists", status: 409, success: false };
    }
    console.error("Create user error:", err);
    return { message: "Internal server error", status: 500, success: false };
  }
};
