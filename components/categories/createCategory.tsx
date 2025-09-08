import React from 'react';
import {createCategoryAction} from "@/actions/category.action";

function CreateCategory() {
    const inputsData = [
        {
            type: "text",
            name: "title",
            placeholder: "title",
            label: "Title",
            id: "title",
        },
        {
            type: "text",
            name: "description",
            placeholder: "Description",
            label: "Description",
            id: "description",
        },
        {
            type: "text",
            name: "tag",
            placeholder: "Tag",
            label: "Tag",
            id: "tag",
        }
    ] as const;

    // type InputData = typeof inputsData[number];
    // type FormValues = {
    //     [K in InputData["name"]]: string;
    // };

    return (
        <div className={"border p-5 rounded-2xl bg-white w-sm"}>
            <h3 className={'mb-3'}>Create category</h3>
            <form action={createCategoryAction} className={"flex flex-col space-y-2 max-w-sm text-small-text"}>
                {inputsData.map((item) => (
                    <React.Fragment key={item.id}>
                        <label htmlFor="title">
                            {item.label}
                        </label>
                        <input
                            type={item.type}
                            id={item.id}
                            name={item.name}
                            placeholder={item.placeholder}
                            className={"border px-3 py-2 rounded"}
                            required
                        />
                    </React.Fragment>
                ))}
                <button type="submit" className={"border border-grass rounded px-2 py-1 mt-3 max-w-20 bg-light-mint"}>Create</button>
            </form>
        </div>
    );
}

export default CreateCategory;