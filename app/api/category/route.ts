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
