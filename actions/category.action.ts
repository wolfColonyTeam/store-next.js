"use server";
import { PrismaClient } from "../lib/generated/prisma";
const prisma = new PrismaClient();

export const createCategoryAction = async (formData: FormData) => {
    try {
        const title = formData.get("title") as string;
        const tag = formData.get("tag") as string;
        const description = formData.get("description") as string;

        const newCategory = await prisma.category.create({data: {title, tag, description}})
        console.log('New category created:', newCategory);
    } catch (error) {
        console.log(error)
    }
}
