"use client";

import { useMemo, useState } from "react";
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

const risingProducts: Product[] = [
  { id: 1, emoji: "🍊", name: "কমলা", unit: "প্রতি কেজি", price: "৬৪ টাকা", change: "২.১%", type: "up" },
  { id: 2, emoji: "🌾", name: "চাল", unit: "প্রতি কেজি", price: "৬৮ টাকা", change: "৩.২%", type: "up" },
  { id: 3, emoji: "🍆", name: "বেগুন", unit: "প্রতি কেজি", price: "৮৮ টাকা", change: "২.৮%", type: "up" },
  { id: 4, emoji: "🐟", name: "রুই মাছ", unit: "প্রতি কেজি", price: "৬৪০ টাকা", change: "১.৬%", type: "up" },
  { id: 5, emoji: "🥚", name: "ডিম", unit: "প্রতি ডজন", price: "১৫০ টাকা", change: "২.৪%", type: "up" },
  { id: 6, emoji: "🌽", name: "ভুট্টা (৫০০ গ্রাম)", unit: "প্রতি প্যাকেট", price: "১৪০ টাকা", change: "২.৬%", type: "up" },
];

const fallingProducts: Product[] = [
  { id: 7, emoji: "🌶️", name: "কাঁচামরিচ", unit: "প্রতি কেজি", price: "৯৯ টাকা", change: "২.৬%", type: "down" },
  { id: 8, emoji: "🥬", name: "শাক", unit: "প্রতি আঁটি", price: "৪৫ টাকা", change: "৪.৩%", type: "down" },
  { id: 9, emoji: "🥔", name: "আলু", unit: "প্রতি কেজি", price: "৭০ টাকা", change: "২.৫%", type: "down" },
  { id: 10, emoji: "🥕", name: "গাজর", unit: "প্রতি কেজি", price: "৮০ টাকা", change: "৫.২%", type: "down" },
  { id: 11, emoji: "🧅", name: "পেঁয়াজ", unit: "প্রতি কেজি", price: "৯০ টাকা", change: "৩.৮%", type: "down" },
  { id: 12, emoji: "🍗", name: "মুরগির মাংস", unit: "প্রতি কেজি", price: "২৯০ টাকা", change: "২.৯%", type: "down" },
];

const allProducts: Product[] = [
  { id: 13, emoji: "🥛", name: "গুঁড়ো দুধ", unit: "প্রতি কেজি", price: "৬৪৮ টাকা", change: "২.১%", type: "up" },
  { id: 14, emoji: "🥛", name: "মিল্ক পাউডার", unit: "প্রতি কেজি", price: "৮২০ টাকা", change: "১.৮%", type: "down" },
  { id: 15, emoji: "🥛", name: "সয়াবিন দুধ", unit: "প্রতি লিটার", price: "৯৫ টাকা", change: "০.০%", type: "flat" },
  { id: 16, emoji: "🥥", name: "নারিকেল তেল", unit: "প্রতি লিটার", price: "৬৬৫ টাকা", change: "০.০%", type: "flat" },
  { id: 17, emoji: "🌶️", name: "মরিচ", unit: "প্রতি কেজি", price: "১৪২ টাকা", change: "২.৩%", type: "up" },
  { id: 18, emoji: "🌶️", name: "শুকনা মরিচ", unit: "প্রতি কেজি", price: "৩৬৫ টাকা", change: "১.৫%", type: "up" },
  { id: 19, emoji: "🌶️", name: "লাল মরিচ", unit: "প্রতি কেজি", price: "৩২০ টাকা", change: "৪.২%", type: "down" },
  { id: 20, emoji: "🌶️", name: "কাঁচামরিচ", unit: "প্রতি কেজি", price: "১৩০ টাকা", change: "৪.১%", type: "down" },
  { id: 21, emoji: "🌶️", name: "মরিচ গুঁড়া", unit: "প্রতি কেজি", price: "৫২০ টাকা", change: "২.৬%", type: "up" },
  { id: 22, emoji: "🧂", name: "আয়োডিন লবণ", unit: "প্রতি কেজি", price: "৪৫ টাকা", change: "০.০%", type: "flat" },
  { id: 23, emoji: "🧂", name: "লবণ", unit: "প্রতি কেজি", price: "৩৮ টাকা", change: "০.০%", type: "flat" },
  { id: 24, emoji: "🧂", name: "প্যাকেট লবণ", unit: "প্রতি কেজি", price: "৪২ টাকা", change: "১.৮%", type: "down" },
  { id: 25, emoji: "🍚", name: "স্বর্ণমাছি চাল", unit: "প্রতি কেজি", price: "৭৪ টাকা", change: "২.১%", type: "up" },
  { id: 26, emoji: "🌶️", name: "কাঁচামরিচ", unit: "প্রতি কেজি", price: "৯৯ টাকা", change: "৪.৩%", type: "down" },
  { id: 27, emoji: "🍆", name: "বেগুন", unit: "প্রতি কেজি", price: "৮৮ টাকা", change: "২.৮%", type: "up" },
  { id: 28, emoji: "🍏", name: "আপেল", unit: "প্রতি কেজি", price: "৩২০ টাকা", change: "০.০%", type: "flat" },
  { id: 29, emoji: "🐟", name: "রুই মাছ", unit: "প্রতি কেজি", price: "৬৪০ টাকা", change: "৫.৬%", type: "up" },
  { id: 30, emoji: "🐟", name: "কাতলা মাছ", unit: "প্রতি কেজি", price: "৭২০ টাকা", change: "৩.১%", type: "down" },
  { id: 31, emoji: "🐟", name: "ইলিশ মাছ (কাটা)", unit: "প্রতি কেজি", price: "১,৮৫০ টাকা", change: "৬.৫%", type: "up" },
  { id: 32, emoji: "🥬", name: "পালং শাক", unit: "প্রতি আঁটি", price: "৩৫ টাকা", change: "২.৫%", type: "down" },
  { id: 33, emoji: "🥕", name: "গাজর", unit: "প্রতি কেজি", price: "৮০ টাকা", change: "২.৪%", type: "down" },
  { id: 34, emoji: "🍅", name: "টমেটো", unit: "প্রতি কেজি", price: "৯০ টাকা", change: "৩.৫%", type: "up" },
  { id: 35, emoji: "🥔", name: "আলু", unit: "প্রতি কেজি", price: "৭০ টাকা", change: "০.০%", type: "flat" },
  { id: 36, emoji: "🌽", name: "ভুট্টা (৫০০ গ্রাম)", unit: "প্রতি প্যাকেট", price: "১৪০ টাকা", change: "২.২%", type: "up" },
  { id: 37, emoji: "🌾", name: "চাল", unit: "প্রতি কেজি", price: "৬৮ টাকা", change: "৩.২%", type: "up" },
  { id: 38, emoji: "🌾", name: "মিনিকেট চাল", unit: "প্রতি কেজি", price: "৮৪ টাকা", change: "২.৭%", type: "down" },
  { id: 39, emoji: "🫘", name: "মসুর ডাল", unit: "প্রতি কেজি", price: "১৫০ টাকা", change: "১.৮%", type: "down" },
  { id: 40, emoji: "🫘", name: "ছোলা", unit: "প্রতি কেজি", price: "১২০ টাকা", change: "৩.১%", type: "up" },
  { id: 41, emoji: "🥒", name: "শসা", unit: "প্রতি কেজি", price: "৬০ টাকা", change: "১.৫%", type: "up" },
  { id: 42, emoji: "🥬", name: "লাল শাক", unit: "প্রতি আঁটি", price: "৩০ টাকা", change: "২.২%", type: "down" },
];

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
  return (
    <div className="min-h-[120px] w-full rounded-xl border border-[#e2e8e3] bg-[#fbfdfb] p-3 shadow-sm transition hover:shadow-md">
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

        <ChangeBadge type={product.type} value={product.change} />
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

export default function Home() {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const products = [...allProducts];

    if (sort === "low") {
      return products.sort(
        (a, b) =>
          Number(a.price.replace(/[^\d]/g, "")) -
          Number(b.price.replace(/[^\d]/g, ""))
      );
    }

    if (sort === "high") {
      return products.sort(
        (a, b) =>
          Number(b.price.replace(/[^\d]/g, "")) -
          Number(a.price.replace(/[^\d]/g, ""))
      );
    }

    return products;
  }, [sort]);

  return (
    <main className="min-h-screen bg-[#f3f7f3] text-[#1d251e]">
      <Hero />

      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section>
          <h2 className="mb-3 text-sm font-bold text-[#263028]">
            <span className="text-[#e64d45]">▲</span> আজ দাম বেড়েছে
          </h2>

          <ProductGrid products={risingProducts} />
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold text-[#263028]">
            <span className="text-[#249553]">▼</span> আজ দাম কমেছে
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

          <div className="mb-4 flex justify-start sm:justify-end">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-md border border-[#dfe5df] bg-white px-3 py-2 text-xs text-[#596159] outline-none sm:w-auto"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
            </select>
          </div>

          <ProductGrid products={sortedProducts} />
        </section>
      </div>
    </main>
  );
}