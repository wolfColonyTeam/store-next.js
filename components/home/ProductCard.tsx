// ---------- Product Card ----------
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import StarRating from "@/components/home/StarRating";
import { formatCurrency } from "@/lib/utils";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number; // in USD
  rating: number; // 0..5
  reviews: number;
  category: string;
  brand: string;
  inStock: boolean;
  image: string;
  createdAt: string; // ISO date
};

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-2 top-2 flex gap-2">
          {!p.inStock && <Badge variant="secondary">Немає в наявності</Badge>}
          <Badge className="bg-primary/90">{p.category}</Badge>
        </div>
      </div>
      <CardHeader className="space-y-1">
        <CardTitle className="line-clamp-1 text-base">{p.title}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-[2.5rem]">
          {p.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto space-y-2">
        <div className="flex flex-col items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating value={p.rating} />
            <span className="text-xs text-muted-foreground">({p.reviews})</span>
          </div>
          <div className="text-base font-semibold mt-2">
            {formatCurrency(p.price)}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!p.inStock}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
