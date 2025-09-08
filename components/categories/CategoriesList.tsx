"use server"

import React from "react";
import CreateCategory from "@/components/categories/createCategory";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import prisma from "@/lib/prisma";

export interface ICategory {
  id: string;
  title: string;
  description: string;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
}

export default async function CategoriesList() {
  const categories: ICategory[] = await prisma.category.findMany()   //get data from BG

  return (
    <div className="p-4 bg-white border rounded-xl">
      <div className={"flex flex-wrap flex justify-between"}>
        <h1 className="text-heading-4 font-rufina mb-3">Categories</h1>
        <CreateCategory/>
      </div>

      <Table>
        <TableCaption></TableCaption>
        <TableHeader>

          <TableRow>
            <TableHead className="text-heading-5 w-[100px]">Name</TableHead>
            <TableHead className="text-heading-5">Description</TableHead>
            <TableHead className="text-heading-5">Tag</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category, id) => (
            <TableRow key={category.id}>
              <TableCell>{category.title}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>{category.tag}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
