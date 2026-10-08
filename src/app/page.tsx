"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";

type Product = {
  id: number;
  emoji: string;
  name: string;
  unit: string;
  price: string;
  change: string;
  type: "up" | "down" | "flat";
};

function ChangeBadge({
  type,
  value,
}: {
  type: Product["type"];
  value: string;
}) {
  if (type === "up") {
    return (
      <span className="rounded-full bg-[#fff0ef] px-2 py-1 text-[10px] font-semibold text-[#e5534b]">
        ▲ {value}
      </span>
    );
  }

  if (type === "down") {
    return (
      <span className="rounded-full bg-[#eaf8ef] px-2 py-1 text-[10px] font-semibold text-[#259653]">
        ▼ {value}
      </span>
    );
  }

  return (
    <span className="rounded-full bg-[#eef1ee] px-2 py-1 text-[10px] font-semibold text-[#747a74]">
      — ০.০%
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  const slug = product.name
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <Link
      href={`/product/${slug}`}
      className="block min-h-[120px] w-full rounded-xl border border-[#e2e8e3] bg-[#fbfdfb] p-3 shadow-sm transition hover:shadow-md"
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
          <p className="text-xs text-[#737b73]">
            আজকের দাম
          </p>

          <p className="mt-1 text-sm font-bold text-[#1b211c]">
            {product.price}
          </p>
        </div>

        <ChangeBadge
          type={product.type}
          value={product.change}
        />
      </div>
    </Link>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
        setLoading(false);
      });
  }, []);

  const risingProducts = useMemo(() => {
    return [...products]
      .filter((product) => product.type === "up")
      .sort(
        (a, b) =>
          Number(b.change.replace("%", "")) -
          Number(a.change.replace("%", ""))
      )
      .slice(0, 6);
  }, [products]);

  const fallingProducts = useMemo(() => {
    return [...products]
      .filter((product) => product.type === "down")
      .sort(
        (a, b) =>
          Number(b.change.replace("%", "")) -
          Number(a.change.replace("%", ""))
      )
      .slice(0, 6);
  }, [products]);

  const sortedProducts = useMemo(() => {
    const productList = [...products];

    if (sort === "low") {
      return productList.sort(
        (a, b) =>
          Number(a.price.replace(/[^\d]/g, "")) -
          Number(b.price.replace(/[^\d]/g, ""))
      );
    }

    if (sort === "high") {
      return productList.sort(
        (a, b) =>
          Number(b.price.replace(/[^\d]/g, "")) -
          Number(a.price.replace(/[^\d]/g, ""))
      );
    }

    return productList;
  }, [products, sort]);

  return (
    <main className="min-h-screen bg-[#f3f7f3] text-[#1d251e]">
      <Hero />

      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-12 text-center">
            <p className="text-sm text-[#6f776f]">
              পণ্য লোড হচ্ছে...
            </p>
          </div>
        ) : (
          <>
            {/* Section A — Top 6 Risers */}
            <section>
              <h2 className="mb-3 text-sm font-bold text-[#263028]">
                <span className="text-[#e64d45]">▲</span>{" "}
                আজ দাম বেড়েছে
              </h2>

              <ProductGrid products={risingProducts} />
            </section>

            {/* Section B — Top 6 Fallers */}
            <section className="mt-8">
              <h2 className="mb-3 text-sm font-bold text-[#263028]">
                <span className="text-[#249553]">▼</span>{" "}
                আজ দাম কমেছে
              </h2>

              <ProductGrid products={fallingProducts} />
            </section>

            {/* Section C — All Products */}
            <section
              id="সব-পণ্য"
              className="mt-10 scroll-mt-6"
            >
              <div className="mb-4">
                <h2 className="text-sm font-bold text-[#263028]">
                  সব পণ্য
                </h2>

                <p className="mt-1 text-xs text-[#858d85]">
                  বাজারের সকল পণ্যের বর্তমান দাম
                </p>
              </div>

              <div className="mb-4 flex justify-start sm:justify-end">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full rounded-md border border-[#dfe5df] bg-white px-3 py-2 text-xs text-[#596159] outline-none sm:w-auto"
                >
                  <option value="default">ডিফল্ট</option>
                  <option value="low">
                    দাম: কম থেকে বেশি
                  </option>
                  <option value="high">
                    দাম: বেশি থেকে কম
                  </option>
                </select>
              </div>

              <ProductGrid products={sortedProducts} />
            </section>
          </>
        )}
      </div>
    </main>
  );
}