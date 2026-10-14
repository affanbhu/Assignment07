
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

type SortOption = "default" | "low" | "high";

function formatPrice(value: number): string {
  return `${value.toLocaleString("bn-BD")} টাকা`;
}

function ChangeBadge({ product }: { product: Product }) {
  const percentage = `${Math.abs(product.change.pct).toLocaleString("bn-BD")}%`;

  if (product.change.dir === "up") {
    return (
      <span className="shrink-0 rounded-full bg-[#eaf8ef] px-2 py-1 text-[10px] font-semibold text-[#259653]">
        ▲ {percentage}
      </span>
    );
  }

  if (product.change.dir === "down") {
    return (
      <span className="shrink-0 rounded-full bg-[#fff0ef] px-2 py-1 text-[10px] font-semibold text-[#e5534b]">
        ▼ {percentage}
      </span>
    );
  }

  return (
    <span className="shrink-0 rounded-full bg-[#eef1ee] px-2 py-1 text-[10px] font-semibold text-[#747a74]">
      — ০.০%
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block min-h-[120px] w-full min-w-0 rounded-xl border border-[#e2e8e3] bg-[#fbfdfb] p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f1f4ef] text-lg">
          {product.image || "🛍️"}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-[#202820]">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-[#7a8279]">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-[#737b73]">
            আজকের দাম
          </p>

          <p className="mt-1 text-sm font-bold text-[#1b211c]">
            {formatPrice(product.today)}
          </p>
        </div>

        <ChangeBadge product={product} />
      </div>
    </Link>
  );
}

function ProductSkeleton() {
  return (
    <div
      className="min-h-[120px] animate-pulse rounded-xl border border-[#e2e8e3] bg-white p-3"
      aria-hidden="true"
    >
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-full bg-[#e8eee8]" />

        <div className="flex-1 space-y-2 pt-1">
          <div className="h-3 w-3/4 rounded bg-[#e8eee8]" />
          <div className="h-3 w-1/2 rounded bg-[#eef1ee]" />
        </div>
      </div>

      <div className="mt-5 flex justify-between gap-3">
        <div className="space-y-2">
          <div className="h-3 w-16 rounded bg-[#eef1ee]" />
          <div className="h-4 w-24 rounded bg-[#e8eee8]" />
        </div>
        <div className="h-6 w-14 rounded-full bg-[#e8eee8]" />
      </div>
    </div>
  );
}

export default function CategoryProductList({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low") {
      return result.sort((a, b) => a.today - b.today);
    }

    if (sort === "high") {
      return result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs text-[#858d85]">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="category-sort"
            className="shrink-0 text-xs font-medium text-[#596159]"
          >
            সাজান:
          </label>

          <select
            id="category-sort"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="max-w-[210px] rounded-md border border-[#dfe5df] bg-white px-2 py-2 text-xs text-[#596159] outline-none focus:border-[#259653] sm:px-3"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}
    </section>
  );
}
