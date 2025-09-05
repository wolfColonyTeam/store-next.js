import React from "react";
import { createCategoryAction } from "@/actions";
import { Button } from "@/components/ui/button";

interface inputsDataI {
  type: string;
  name: string;
  placeholder: string;
  className: string;
  label: string;
  id: string;
}

function CreateCategory() {
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
  ];

  return (
    <div className={"border p-5 rounded-2xl bg-white w-sm"}>
      <h3 className={"mb-3"}>Create category</h3>
      <form
        action={createCategoryAction}
        className={"flex flex-col space-y-2 max-w-sm text-small-text"}
      >
        {inputsData.map((item: inputsDataI) => (
          <React.Fragment key={item.id}>
            <label htmlFor="title">{item.label}</label>
            <input
              type={item.type}
              id={item.id}
              name={item.name}
              placeholder={item.placeholder}
              className={item.className}
              required
            />
          </React.Fragment>
        ))}
        <Button
          variant={"secondary"}
          type="submit"
          className={
            "border cursor-pointer border-grass rounded px-2 py-1 mt-3 max-w-20 bg-light-mint"
          }
        >
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateCategory;
