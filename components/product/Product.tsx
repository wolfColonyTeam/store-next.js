import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";
import React from "react";
import StarRating from "@/components/home/StarRating";

export type ProductType = {
  id: string;
  title: string;
  description: string;
  price: number; // in USD
  rating: number; // 0..5
  reviews: number;
  category: string;
  brand: string;
  tag: string;
  inStock: boolean;
  image: string;
  createdAt: string;
  updatedAt:string;
}

export default function Product(props: { product: ProductType }) {
  const {product} = props;

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={product.image} alt={product.title}
             className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy"/>

        <div className="absolute left-2 top-2 flex gap-2">
          {!product.inStock && <Badge variant="secondary">Out of stock</Badge>}
          <Badge className="bg-primary/90">{product.tag}</Badge>
        </div>
      </div>

      <CardHeader className="space-y-1">
        <CardTitle className="line-clamp-1 text-base">{product.title}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating value={Number(product.rating)}/>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="text-base font-semibold">
            {/*{formatCurrency(product.price)}*/}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" disabled={!product.inStock}><ShoppingCart className="mr-2 h-4 w-4"/> Add to cart</Button>
      </CardFooter>
    </Card>
  )
}
