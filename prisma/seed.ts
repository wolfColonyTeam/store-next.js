import {PrismaClient} from "../lib/generated/prisma";
import productsJson from './produstList.json'
import categoriesJson from './categories.json'

const prisma = new PrismaClient();

async function seed() {
  const categoryMap = {};

  for (const categoryItem of categoriesJson) {
    const category: any = await prisma.category.create({
      data: {
        title: categoryItem.title,
        tag: categoryItem.tag,
        description: categoryItem.description,
      },
    });

    categoryMap[categoryItem.tag] = category.id;
  }

  for (const product of productsJson) {
    await prisma.product.create({
      data: {
        title: product.title,
        description: product.description,
        tag: product.tag,
        price: product.price,
        rating: product.rating,
        reviews: product.reviews,
        categoryId: categoryMap[product.tag],
        brand: product.brand,
        inStock: product.inStock,
        image: product.image,
      },
    });
  }
  console.log("Seed is done");
}

seed()
  .catch((e) => console.error(e))
