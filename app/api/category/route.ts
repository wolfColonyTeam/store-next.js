import {NextResponse} from "next/server";
import Category from "../../..//model/category.model";
import connectDB from "@/lib/dbConnect";

export async function GET() {
    await connectDB();

    try {
        const categories = await Category.find().sort({createdAt: -1});
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch categories"}, {status: 500});
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const {name} = await req.json();

        const created = await Category.create({
            name: name,
        });

        return NextResponse.json({
            message: "Category created",
            categoryId: created._id.toString(),
            status: 201,
            success: true,
        });
    } catch (error) {
        console.error("Create category error", error);
        return NextResponse.json({error: "Failed to fetch categories"}, {status: 500});
    }
}
