"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CreateUserType = { email: string; password: string; name: string };
type updateUserType = { name: string };

export const createUser = async (data: CreateUserType) => {
  console.log(data, " data123");
  try {
    const { name, email, password } = data;
    if (!name.trim() || !email.trim() || password.length < 4) {
      return { message: "Invalid input", status: 400 };
    }
    const existing = await prisma.user.findFirst({
      where: { email: email.trim() },
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

export const updateUser = async (formData: updateUserType, email: string) => {
  console.log(formData, " data123");
  try {
    await prisma.user.update({
      where: { email: email },
      data: { ...formData },
    });

    revalidatePath("/");
    return { message: "User updated", success: true };
  } catch (err) {
    console.log("Failed to update user ", err);
    return { message: "Failed to update user", success: false };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findFirst({
      where: { email: email },
      select: { name: true, email: true, image: true },
    });
  } catch (err) {
    console.log("something went wrong in getUserByEmail ", err);
  }
};
