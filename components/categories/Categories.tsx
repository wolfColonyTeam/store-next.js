import React from "react";

interface CategoryI {
    _id: string;
    name: string;
    tag: string;
    description: string;
}

interface inputsDataI {
    type: string,
    name: string,
    placeholder: string,
    className: string,
    label: string,
    id: string,
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

    const inputsData = [
        {
            type: "text",
            name: "name",
            placeholder: "title",
            className: "border px-3 py-2 rounded",
            label: "Title",
            id: "title",
        },
        {
            type: "text",
            name: "description",
            placeholder: "Description",
            className: "border px-3 py-2 rounded",
            label: "Description",
            id: "description",
        },
        {
            type: "text",
            name: "tag",
            placeholder: "Tag",
            className: "border px-3 py-2 rounded",
            label: "Tag",
            id: "tag",
        },
    ]

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

            <h3 className={'mb-3'}>Create category</h3>
            <form className={"mb-6 flex flex-col space-y-2 max-w-sm text-small-text"}>
                {inputsData.map((item: inputsDataI) => (
                    <React.Fragment key={item.id}>
                        <label htmlFor="title">
                            {item.label}
                        </label>
                        <input
                            type={item.type}
                            id={item.id}
                            name={item.name}
                            placeholder={item.placeholder}
                            className={item.className}
                        />
                    </React.Fragment>
                ))}

                <button type="submit" className={"border border-grass rounded px-2 py-1 mb-3 max-w-20 bg-light-mint"}>Create</button>
            </form>
        </div>
    );
}
