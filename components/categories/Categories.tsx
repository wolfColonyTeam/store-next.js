interface CategoryI {
    _id: string;
    name: string;
    tag: string;
    description: string;
}

export async function getCategories() {
    const response = await fetch("http://localhost:3000/api/category", {
        cache: "no-store",                                                                          //disable cache
    });

    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
}

export default async function Categories() {
    const categories = await getCategories();

    return (
        <div className="px-3">
            <h1 className="text-heading-4 font-rufina mb-3">Categories</h1>
            <ul className="space-y-3 flex flex-wrap space-x-6">
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
        </div>
    );
}
