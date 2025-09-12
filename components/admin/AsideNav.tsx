import Link from "next/link";
import {
  DollarSign,
  Package,
  ShoppingBasket,
  SquareStar,
  Users,
} from "lucide-react";

const AsideNav = () => {
  return (
    <aside className="rounded-2xl border border-[--color-lime]/40 bg-white/70 p-4">
      <nav className="space-y-1">
        <Link
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[--color-lime]/30 text-[--color-olive] font-semibold"
          href="/admin/users"
        >
          <Users className="h-4 w-4" /> Users
        </Link>
        <Link
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[--color-lime]/20"
          href="/admin/orders"
        >
          <Package className="h-4 w-4" /> Orders
        </Link>
        <Link
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[--color-lime]/20"
          href="/admin/transactions"
        >
          <DollarSign className="h-4 w-4" /> Transactions
        </Link>
        <Link
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[--color-lime]/20"
          href="/admin/categories"
        >
          <SquareStar className="h-4 w-4" /> Categories
        </Link>
        <Link
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[--color-lime]/20"
          href="/admin/products"
        >
          <ShoppingBasket className="h-4 w-4" /> Products
        </Link>
      </nav>
    </aside>
  );
};

export default AsideNav;
