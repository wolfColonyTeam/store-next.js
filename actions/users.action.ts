"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CreateUserType = { email: string; password: string; name: string };
type updateUserType = { name: string };

export const createUser = async (data: CreateUserType) => {
  try {
    const { name, email, password } = data;
    if (!name.trim() || !email.trim() || password.length < 4) {
      return { message: "Invalid input", status: 400 };
    }
    const existing = await prisma.user.findFirst({
      where: { email: email.trim() },
    });

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
  try {
    await prisma.user.update({
      where: { email },
      data: {
        name: formData.name ?? undefined,
        profile: {
          upsert: { update: { ...formData }, create: { ...formData } },
        },
      },
    });

    revalidatePath("/");
    return { message: "User updated", success: true };
  } catch (err) {
    console.log("Failed to update user ", err);
    return { message: "Failed to update user", success: false };
  }
};

export const getUserDataByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: { email },
      select: { name: true, email: true, image: true, profile: true },
    });
  } catch (err) {
    console.log("something went wrong in getUserByEmail ", err);
  }
};

export const getFullUserDataByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  } catch (err) {
    console.log("something went wrong in getUserByEmail ", err);
  }
};

export const getAllUsers = async () => {
  try {
    return await prisma.user.findMany({
      where: { NOT: { email: "admin@gmail.com" } },
      include: { profile: true },
    });
  } catch (err) {
    console.error(err, " Error in getAllUsers");
  }
};

export const deleteUser = async (email: string) => {
  try {
    await prisma.user.delete({ where: { email: email } });
    revalidatePath("/admin/users");
    return { message: "User deleted successfully", success: true };
  } catch (err) {
    console.error(err, " Error in deleteUser");
    return { message: "Failed to delete user", success: false };
  }
};
