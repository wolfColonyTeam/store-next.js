import React from "react";
import connectDb from "@/lib/dbConnect";
import Category from "@/model/category.model";
import CreateCategory from "@/components/categories/createCategory";

interface CategoryI {
    _id: string;
    name: string;
    tag: string;
    description: string;
}

export default async function CategoriesList() {
    await connectDb();
    const categories = await Category.find()                    //get data from BD

    return (
        <div className="px-3">
            <h1 className="text-heading-4 font-rufina mb-3">Categories</h1>
            <ul className="space-y-3 flex flex-wrap space-x-6 mb-5">
                {categories.map((category: CategoryI) => (
                    <li className="p-4 border rounded-xl bg-white w-sm cursor-pointer transition delay-100 duration-100 ease-in-out hover:scale-103"
                        key={category._id}>
                        <div className="flex justify-between flex-row">
                            <div>
                                <h3 className="text-heading-5">{category.name}</h3>
                                <p className="text-small-text">{category.description}</p>
                            </div>

                            <div>
                                <span className="border border-grass rounded-xl px-2 py-1 mb-3 bg-light-mint">{category.tag}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <CreateCategory/>
        </div>
    );
}
