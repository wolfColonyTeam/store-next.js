"use server";

import prisma from "@/lib/prisma";
import { CustomError } from "@/lib/utils";

export const createUser = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  console.log(data, " data123");
  try {
    const { name, email, password } = data;

    // Базовая валидация (минимум, без зависимостей)
    if (!name.trim() || !email.trim() || password.length < 6) {
      return { message: "Invalid input", status: 400 };
    }

    // check if exist user in db email + provider=credentials
    const existing = await prisma.user.findFirst({
      where: {
        email: email.trim(),
      },
    });

    console.log(existing, " existing123");

    if (existing) {
      return {
        message: "User already exists",
        status: 409,
        success: false,
      };
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
      userId: created.id.toString(),
      status: 201,
      success: true,
    };
  } catch (err: any) {
    // catch duplicate (if there is unique by email+provider)
    if (err?.code === 11000) {
      return { message: "User already exists", status: 409, success: false };
    }
    console.error("Create user error:", err);
    return { message: "Internal server error", status: 500, success: false };
  }
};
