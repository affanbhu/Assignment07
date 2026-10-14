
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";

type Product = {
  id: number;
  emoji: string;
  name: string;
  unit: string;
  price: string | number;
  change: string | number;
  type: "up" | "down" | "flat";
};

function toEnglishDigits(value: string | number): string {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";
  const englishDigits = "0123456789";

  return String(value).replace(/[০-৯]/g, (digit) => {
    return englishDigits[bengaliDigits.indexOf(digit)];
  });
}

function parseBengaliPrice(value: string | number): number {
  const normalized = toEnglishDigits(value).replace(/[^\d.]/g, "");
  return Number(normalized) || 0;
}

function parseChange(value: string | number): number {
  const normalized = toEnglishDigits(value).replace(/[^\d.]/g, "");
  return Number(normalized) || 0;
}

function formatPrice(value: string | number): string {
  return `${parseBengaliPrice(value).toLocaleString("bn-BD")} টাকা`;
}

function ChangeBadge({
  type,
  value,
}: {
  type: Product["type"];
  value: string | number;
}) {
  if (type === "up") {
    return (
      <span className="shrink-0 rounded-full bg-[#eaf8ef] px-2 py-1 text-[10px] font-semibold text-[#259653]">
        ▲ {String(value)}
      </span>
    );
  }

  if (type === "down") {
    return (
      <span className="shrink-0 rounded-full bg-[#fff0ef] px-2 py-1 text-[10px] font-semibold text-[#e5534b]">
        ▼ {String(value)}
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
      href={`/product/${product.id}`}
      className="block min-h-[120px] w-full min-w-0 rounded-xl border border-[#e2e8e3] bg-[#fbfdfb] p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f1f4ef] text-lg">
          {product.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-[#202820]">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-[#7a8279]">
            {product.unit}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-[#737b73]">আজকের দাম</p>
          <p className="mt-1 text-sm font-bold text-[#1b211c]">
            {formatPrice(product.price)}
          </p>
        </div>

        <ChangeBadge type={product.type} value={product.change} />
      </div>
    </Link>
  );
}

function ProductSkeleton() {
  return (
    <div
      className="min-h-[120px] animate-pulse rounded-xl border border-[#e2e8e3] bg-white p-3 shadow-sm"
      aria-hidden="true"
    >
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 shrink-0 rounded-full bg-[#e8eee8]" />

        <div className="min-w-0 flex-1 space-y-2 pt-1">
          <div className="h-3 w-3/4 rounded bg-[#e8eee8]" />
          <div className="h-3 w-1/2 rounded bg-[#eef1ee]" />
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-2">
        <div className="space-y-2">
          <div className="h-3 w-16 rounded bg-[#eef1ee]" />
          <div className="h-4 w-24 rounded bg-[#e8eee8]" />
        </div>
        <div className="h-6 w-14 rounded-full bg-[#e8eee8]" />
      </div>
    </div>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-label="পণ্য লোড হচ্ছে"
      aria-busy="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load products.json");
        }

        return response.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoadError(false);
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
        setLoadError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const risingProducts = useMemo(() => {
    return [...products]
      .filter((product) => product.type === "up")
      .sort((a, b) => parseChange(b.change) - parseChange(a.change))
      .slice(0, 6);
  }, [products]);

  const fallingProducts = useMemo(() => {
    return [...products]
      .filter((product) => product.type === "down")
      .sort((a, b) => parseChange(b.change) - parseChange(a.change))
      .slice(0, 6);
  }, [products]);

  const sortedProducts = useMemo(() => {
    const productList = [...products];

    if (sort === "low") {
      return productList.sort(
        (a, b) => parseBengaliPrice(a.price) - parseBengaliPrice(b.price)
      );
    }

    if (sort === "high") {
      return productList.sort(
        (a, b) => parseBengaliPrice(b.price) - parseBengaliPrice(a.price)
      );
    }

    return productList;
  }, [products, sort]);

  return (
    <main className="min-h-screen bg-[#f3f7f3] text-[#1d251e]">
      <Hero />

      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="space-y-8 py-4">
            <section>
              <div className="mb-3 h-4 w-36 animate-pulse rounded bg-[#e2eae2]" />
              <ProductGridSkeleton count={6} />
            </section>

            <section>
              <div className="mb-3 h-4 w-36 animate-pulse rounded bg-[#e2eae2]" />
              <ProductGridSkeleton count={6} />
            </section>

            <section>
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-[#e2eae2]" />
              <div className="mb-4 mt-2 h-3 w-56 animate-pulse rounded bg-[#e8eee8]" />
              <div className="mb-4 h-9 w-48 animate-pulse rounded-md bg-[#e8eee8]" />
              <ProductGridSkeleton count={8} />
            </section>
          </div>
        ) : loadError ? (
          <div className="py-12 text-center">
            <p className="text-sm text-red-600">
              পণ্য লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
            </p>
          </div>
        ) : (
          <>
            <section>
              <h2 className="mb-3 text-sm font-bold text-[#263028]">
                <span className="text-[#259653]">▲</span> আজ দাম বেড়েছে
              </h2>
              <ProductGrid products={risingProducts} />
            </section>

            <section className="mt-8">
              <h2 className="mb-3 text-sm font-bold text-[#263028]">
                <span className="text-[#e5534b]">▼</span> আজ দাম কমেছে
              </h2>
              <ProductGrid products={fallingProducts} />
            </section>

            <section id="সব-পণ্য" className="mt-10 scroll-mt-6">
              <div className="mb-4">
                <h2 className="text-sm font-bold text-[#263028]">
                  সব পণ্য
                </h2>
                <p className="mt-1 text-xs text-[#858d85]">
                  বাজারের সকল পণ্যের বর্তমান দাম
                </p>
              </div>

              <div className="mb-4 flex items-center justify-start gap-2 sm:justify-end">
                <label
                  htmlFor="product-sort"
                  className="shrink-0 text-xs font-medium text-[#596159]"
                >
                  সাজান
                </label>

                <div className="relative w-full sm:w-auto">
                  <select
                    id="product-sort"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="w-full appearance-none rounded-md border border-[#dfe5df] bg-white px-3 py-2 pr-8 text-xs text-[#596159] outline-none sm:w-auto"
                  >
                    <option value="default">ডিফল্ট</option>
                    <option value="low">দাম: কম থেকে বেশি</option>
                    <option value="high">দাম: বেশি থেকে কম</option>
                  </select>

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#596159]">
                    ⌄
                  </span>
                </div>
              </div>

              <ProductGrid products={sortedProducts} />
            </section>
          </>
        )}
      </div>
    </main>
  );
}
