"use client";
import {useEffect, useState} from "react";

interface Category {
    _id: string;
    name: string;
    tag: string;
    description: string;
}

export async function GetCategories() {
    const res = await fetch("/api/category");

    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetCategories()
            .then(setCategories)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="px-3">
            <h1 className="text-heading-4 font-rufina mb-3">Categories</h1>
            <ul className="space-y-2">
                {categories.map((category) => (
                    <li className="p-5 border rounded-xl bg-white" key={category._id}>
                        <div className="flex items-center justify-between flex-row">
                            <div>
                                <h3 className="text-heading-5">{category.name}</h3>
                                <p className="text-small-text">{category.description}</p>
                            </div>

                            <div>
                                <span className="border border-grass rounded-xl px-2 py-1 mb-3">{category.tag}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
