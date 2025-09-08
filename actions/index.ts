"use server";
import { signIn, signOut } from "@/auth";
import connectDb from "@/lib/dbConnect";
import Category from "@/model/category.model";


export const logoutAction = async () => {
  await signOut({ redirectTo: "/login" });
};

export const socialLogin = async (formData: FormData) => {
  const action = formData.get("action");
  await signIn(String(action), { redirectTo: "/" });
  console.log(action, " action");
};

export const createCategoryAction = async (formData: FormData) => {
  await connectDb();

  const name = formData.get("name");
  const description = formData.get("description");
  const tag = formData.get("tag");

  const newCategory = await Category.create({name, tag, description})

  console.log('New category created:', newCategory);
}
