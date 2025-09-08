"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, Search, ShoppingCart, Star, X } from "lucide-react";

// ---------- Types ----------
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

// ---------- Demo Data (replace with API) ----------
const CATEGORIES = [
  "Laptops",
  "Keyboards",
  "Mice",
  "Monitors",
  "Audio",
  "Accessories",
  "Apparel",
] as const;

const BRANDS = [
  "Apple",
  "Logitech",
  "Razer",
  "Dell",
  "ASUS",
  "Google",
  "Keychron",
  "Sony",
] as const;

const DEMO_PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Mechanical Keyboard K8 Pro",
    description: "Hot‑swappable, RGB, Gateron switches.",
    price: 99,
    rating: 4.6,
    reviews: 312,
    category: "Keyboards",
    brand: "Keychron",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2025-07-18T10:00:00.000Z",
  },
  {
    id: "p2",
    title: "Razer Viper Mini SE",
    description: "Ultralight gaming mouse for precision.",
    price: 69,
    rating: 4.4,
    reviews: 154,
    category: "Mice",
    brand: "Razer",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2025-06-02T09:00:00.000Z",
  },
  {
    id: "p3",
    title: "Logitech MX Master 3S",
    description: "Ergonomic productivity mouse with Flow.",
    price: 119,
    rating: 4.8,
    reviews: 2894,
    category: "Mice",
    brand: "Logitech",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2025-05-15T12:00:00.000Z",
  },
  {
    id: "p4",
    title: "ASUS ProArt 27",
    description: "Color‑accurate 27″ 4K monitor for creators.",
    price: 449,
    rating: 4.7,
    reviews: 673,
    category: "Monitors",
    brand: "ASUS",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f6?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2025-03-29T08:00:00.000Z",
  },
  {
    id: "p5",
    title: "MacBook Air M3 13",
    description: "Silent performance, all‑day battery.",
    price: 1199,
    rating: 4.9,
    reviews: 1031,
    category: "Laptops",
    brand: "Apple",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2025-02-10T10:00:00.000Z",
  },
  {
    id: "p6",
    title: "Google Pixel Buds Pro",
    description: "ANC earbuds with multi‑point connectivity.",
    price: 199,
    rating: 4.3,
    reviews: 840,
    category: "Audio",
    brand: "Google",
    inStock: false,
    image:
      "https://images.unsplash.com/photo-1518443952241-04e2b0a7a0f8?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2025-01-20T14:00:00.000Z",
  },
  {
    id: "p7",
    title: "Sony WH‑1000XM5",
    description: "Industry‑leading noise cancellation.",
    price: 349,
    rating: 4.8,
    reviews: 5203,
    category: "Audio",
    brand: "Sony",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1518441902113-c1d3d4c4e34a?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2024-12-08T07:00:00.000Z",
  },
  {
    id: "p8",
    title: "Dell XPS 15",
    description: "Premium 15″ laptop for power users.",
    price: 1899,
    rating: 4.6,
    reviews: 943,
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2025-04-21T11:30:00.000Z",
  },
  {
    id: "p9",
    title: "Magic Trackpad 2",
    description: "Multi‑Touch surface for precise control.",
    price: 129,
    rating: 4.5,
    reviews: 1320,
    category: "Accessories",
    brand: "Apple",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2025-06-10T16:00:00.000Z",
  },
  {
    id: "p10",
    title: "Razer BlackShark V2",
    description: "Esports headset with THX Spatial Audio.",
    price: 129,
    rating: 4.2,
    reviews: 410,
    category: "Audio",
    brand: "Razer",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1518441902113-c1d3d4c4e34a?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2025-07-05T18:00:00.000Z",
  },
  {
    id: "p11",
    title: "ASUS ROG Swift 32",
    description: "Fast 4K gaming monitor 144Hz.",
    price: 999,
    rating: 4.7,
    reviews: 267,
    category: "Monitors",
    brand: "ASUS",
    inStock: false,
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f6?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2025-08-01T10:00:00.000Z",
  },
  {
    id: "p12",
    title: "Logi MX Keys S",
    description: "Low‑profile keyboard with smart backlight.",
    price: 119,
    rating: 4.6,
    reviews: 1810,
    category: "Keyboards",
    brand: "Logitech",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2025-03-05T12:00:00.000Z",
  },
];

// ---------- Helpers ----------
const formatCurrency = (n: number) =>
  new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

function StarRating({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < full
              ? "fill-yellow-500 stroke-yellow-500"
              : half && i === full
                ? "fill-yellow-500/60 stroke-yellow-500/60"
                : "stroke-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

// ---------- Main Page ----------
export default function ShopHomePage() {
  // UI State
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("relevance");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;
  const [loading, setLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  // Derived lists
  const minPrice = 0;
  const maxPrice = 2500;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let items = DEMO_PRODUCTS.filter((p) => {
      const inCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category);
      const inBrand =
        selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const ratingOk = p.rating >= minRating;
      const stockOk = !inStockOnly || p.inStock;
      const matchesQ =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q);

      return (
        inCategory && inBrand && inPrice && ratingOk && stockOk && matchesQ
      );
    });

    switch (sort) {
      case "price-asc":
        items = items.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        items = items.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        items = items.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        items = items.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      default:
        // relevance: simple heuristic (rating & inStock first)
        items = items.sort((a, b) => {
          const aScore = (a.inStock ? 1 : 0) * 2 + a.rating;
          const bScore = (b.inStock ? 1 : 0) * 2 + b.rating;
          return bScore - aScore;
        });
    }

    return items;
  }, [
    search,
    selectedCategories,
    selectedBrands,
    priceRange,
    minRating,
    inStockOnly,
    sort,
  ]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (pageSafe - 1) * PAGE_SIZE,
    pageSafe * PAGE_SIZE,
  );

  useEffect(() => {
    // reset to first page on filters change
    setPage(1);
  }, [
    search,
    selectedCategories,
    selectedBrands,
    priceRange,
    minRating,
    inStockOnly,
    sort,
  ]);

  // ---------- Render ----------
  return (
    <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
      {/* Top bar: Search + Sort + Mobile Filters */}
      <div className="sticky top-2 z-30 mb-4 flex flex-col gap-3 rounded-2xl bg-background/70 p-3 backdrop-blur md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="flex w-full items-center gap-2">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
            <Input
              placeholder="Пошук товарів…"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Label className="text-sm text-muted-foreground">Сортування</Label>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">За релевантністю</SelectItem>
                <SelectItem value="newest">Найновіші</SelectItem>
                <SelectItem value="price-asc">Ціна: зростаюча</SelectItem>
                <SelectItem value="price-desc">Ціна: спадаюча</SelectItem>
                <SelectItem value="rating-desc">Рейтинг</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="shrink-0 md:hidden">
                <Filter className="mr-2 h-4 w-4" /> Фільтри
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0">
              <SheetHeader className="p-4">
                <SheetTitle>Фільтри</SheetTitle>
              </SheetHeader>
              <div className="h-[calc(100vh-8rem)] overflow-y-auto px-4 pb-4">
                <FiltersPanel
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                  minRating={minRating}
                  setMinRating={setMinRating}
                  inStockOnly={inStockOnly}
                  setInStockOnly={setInStockOnly}
                />
              </div>
              <SheetFooter className="p-4">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setPriceRange([minPrice, maxPrice]);
                    setMinRating(0);
                    setInStockOnly(false);
                  }}
                >
                  Скинути
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-20 hidden self-start md:block">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Фільтри</CardTitle>
              <CardDescription>Уточни підбір під себе</CardDescription>
            </CardHeader>
            <CardContent>
              <FiltersPanel
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                minRating={minRating}
                setMinRating={setMinRating}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
              />
              <Separator className="my-4" />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setPriceRange([minPrice, maxPrice]);
                    setMinRating(0);
                    setInStockOnly(false);
                  }}
                >
                  Скинути
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Content */}
        <section className="min-h-[60vh]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Знайдено:{" "}
              <span className="font-medium text-foreground">{total}</span>
            </p>
            <div className="md:hidden">
              <Label className="mr-2 text-sm text-muted-foreground">
                Сортування
              </Label>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Релевантність</SelectItem>
                  <SelectItem value="newest">Найновіші</SelectItem>
                  <SelectItem value="price-asc">Ціна ↑</SelectItem>
                  <SelectItem value="price-desc">Ціна ↓</SelectItem>
                  <SelectItem value="rating-desc">Рейтинг</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products grid */}
          {loading ? (
            <ProductsSkeleton />
          ) : paginated.length === 0 ? (
            <EmptyState
              onReset={() => {
                setSearch("");
                setSelectedCategories([]);
                setSelectedBrands([]);
                setPriceRange([minPrice, maxPrice]);
                setMinRating(0);
                setInStockOnly(false);
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginated.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pageSafe <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Попередня
              </Button>
              <div className="flex items-center gap-1 text-sm">
                <span className="rounded-md border px-3 py-1">{pageSafe}</span>
                <span className="text-muted-foreground">/</span>
                <span>{totalPages}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={pageSafe >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Наступна
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// ---------- Filters Panel ----------
function FiltersPanel(props: {
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  selectedCategories: string[];
  setSelectedCategories: (v: string[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (v: string[]) => void;
  minRating: number;
  setMinRating: (v: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
}) {
  const {
    priceRange,
    setPriceRange,
    selectedCategories,
    setSelectedCategories,
    selectedBrands,
    setSelectedBrands,
    minRating,
    setMinRating,
    inStockOnly,
    setInStockOnly,
  } = props;

  return (
    <Accordion
      type="multiple"
      defaultValue={["price", "categories", "brands", "rating", "stock"]}
      className="w-full"
    >
      {/* Price */}
      <AccordionItem value="price">
        <AccordionTrigger>Ціна</AccordionTrigger>
        <AccordionContent>
          <div className="px-1 py-2">
            <Slider
              value={priceRange}
              onValueChange={(val) =>
                setPriceRange([val[0], val[1]] as [number, number])
              }
              min={0}
              max={2500}
              step={10}
              className="py-3"
            />
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Badge variant="secondary">
                  {formatCurrency(priceRange[0])}
                </Badge>
                <span>—</span>
                <Badge variant="secondary">
                  {formatCurrency(priceRange[1])}
                </Badge>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-7"
                onClick={() => setPriceRange([0, 2500])}
              >
                Скинути
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Categories */}
      <AccordionItem value="categories">
        <AccordionTrigger>Категорії</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => {
              const checked = selectedCategories.includes(c);
              return (
                <label
                  key={c}
                  className="flex cursor-pointer select-none items-center gap-2 rounded-lg border p-2 hover:bg-muted/50"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(v) => {
                      const isOn = Boolean(v);
                      setSelectedCategories(
                        isOn
                          ? [...selectedCategories, c]
                          : selectedCategories.filter((x) => x !== c),
                      );
                    }}
                  />
                  <span className="text-sm">{c}</span>
                </label>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Brands */}
      <AccordionItem value="brands">
        <AccordionTrigger>Бренди</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 gap-2">
            {BRANDS.map((b) => {
              const checked = selectedBrands.includes(b);
              return (
                <label
                  key={b}
                  className="flex cursor-pointer select-none items-center gap-2 rounded-lg border p-2 hover:bg-muted/50"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(v) => {
                      const isOn = Boolean(v);
                      setSelectedBrands(
                        isOn
                          ? [...selectedBrands, b]
                          : selectedBrands.filter((x) => x !== b),
                      );
                    }}
                  />
                  <span className="text-sm">{b}</span>
                </label>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Rating */}
      <AccordionItem value="rating">
        <AccordionTrigger>Мінімальний рейтинг</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1, 0].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setMinRating(r)}
                className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left hover:bg-muted/50 ${
                  minRating === r ? "border-primary" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <StarRating value={r} />
                  <span className="text-sm">і вище</span>
                </div>
                {minRating === r && <Badge variant="secondary">Обрано</Badge>}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Stock */}
      <AccordionItem value="stock">
        <AccordionTrigger>Наявність</AccordionTrigger>
        <AccordionContent>
          <label className="flex cursor-pointer select-none items-center gap-2 rounded-lg border p-2 hover:bg-muted/50">
            <Checkbox
              checked={inStockOnly}
              onCheckedChange={(v) => setInStockOnly(Boolean(v))}
            />
            <span className="text-sm">Показувати лише в наявності</span>
          </label>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// ---------- Product Card ----------
function ProductCard({ p }: { p: Product }) {
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating value={p.rating} />
            <span className="text-xs text-muted-foreground">({p.reviews})</span>
          </div>
          <div className="text-base font-semibold">
            {formatCurrency(p.price)}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!p.inStock}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Додати в кошик
        </Button>
      </CardFooter>
    </Card>
  );
}

// ---------- Skeletons & Empty ----------
function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="rounded-2xl">
          <Skeleton className="aspect-[4/3] w-full" />
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-1/3" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-9 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Нічого не знайдено</CardTitle>
        <CardDescription>
          Спробуй змінити умови пошуку або скинути фільтри.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="secondary" onClick={onReset}>
          <X className="mr-2 h-4 w-4" /> Скинути фільтри
        </Button>
      </CardFooter>
    </Card>
  );
}
