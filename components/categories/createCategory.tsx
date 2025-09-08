import * as React from "react"
import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={"bg-green hover:bg-light-mint"}>Create category</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <div className={"p-5 rounded-2xl bg-white w-sm"}>
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
            <Button type="submit"
                    className={"border border-grass text-basic rounded px-2 py-1 mt-3 max-w-20 bg-light-mint hover:text-white bg-green"}>Create</Button>
          </form>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CreateCategory;
