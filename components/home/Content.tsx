"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle,SheetTrigger,} from "@/components/ui/sheet";
import {Skeleton} from "@/components/ui/skeleton";
import { Filter, Search, X } from "lucide-react";
import { BRANDS, CATEGORIES, DEMO_PRODUCTS } from "@/components/home/data";
import StarRating from "@/components/home/StarRating";
import ProductsSkeleton from "@/components/home/ProductsSkeleton";
import { formatCurrency } from "@/lib/utils";
import ProductCard from "@/components/home/ProductCard";
import Product from "@/components/product/Product";

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
              placeholder="Search for products..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Label className="text-sm text-muted-foreground">Sorting</Label>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">By relevance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: increasing</SelectItem>
                <SelectItem value="price-desc">Price: decreasing</SelectItem>
                <SelectItem value="rating-desc">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="shrink-0 md:hidden">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0">
              <SheetHeader className="p-4">
                <SheetTitle>Filters</SheetTitle>
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
                  Reset Filters
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
              <CardTitle>Filters</CardTitle>
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
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Content */}
        <section className="min-h-[60vh]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Found:{" "}
              <span className="font-medium text-foreground">{total}</span>
            </p>
            <div className="md:hidden">
              <Label className="mr-2 text-sm text-muted-foreground">
                Sorting
              </Label>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="newest">The newest</SelectItem>
                  <SelectItem value="price-asc">Price ↑</SelectItem>
                  <SelectItem value="price-desc">Price ↓</SelectItem>
                  <SelectItem value="rating-desc">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products grid */}
          {loading ? (
            <ProductsSkeleton/>
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
              {/*<Product/>*/}
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
                Previous
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
                Next
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
        <AccordionTrigger>Price</AccordionTrigger>
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
                Reset
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Categories */}
      <AccordionItem value="categories">
        <AccordionTrigger>Categories</AccordionTrigger>
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
        <AccordionTrigger>Brands</AccordionTrigger>
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
        <AccordionTrigger>Minimum rating</AccordionTrigger>
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
                  <span className="text-sm">and higherе</span>
                </div>
                {minRating === r && <Badge variant="secondary">Chosen</Badge>}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Stock */}
      <AccordionItem value="stock">
        <AccordionTrigger>Availability</AccordionTrigger>
        <AccordionContent>
          <label className="flex cursor-pointer select-none items-center gap-2 rounded-lg border p-2 hover:bg-muted/50">
            <Checkbox
              checked={inStockOnly}
              onCheckedChange={(v) => setInStockOnly(Boolean(v))}
            />
            <span className="text-sm">Show only in stock</span>
          </label>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// ---------- Skeletons & Empty ----------
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Nothing found</CardTitle>
        <CardDescription>
          Try changing your search criteria or resetting your filters.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="secondary" onClick={onReset}>
          <X className="mr-2 h-4 w-4" /> Reset filters
        </Button>
      </CardFooter>
    </Card>
  );
}
