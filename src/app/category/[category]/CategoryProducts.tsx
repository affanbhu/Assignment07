
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  categoryIcon: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sort === "price-low") {
      items.sort((a, b) => a.today - b.today);
    } else if (sort === "price-high") {
      items.sort((a, b) => b.today - a.today);
    } else if (sort === "change") {
      items.sort(
        (a, b) =>
          Math.abs(b.change.pct) - Math.abs(a.change.pct)
      );
    }

    return items;
  }, [products, sort]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 10,
          background: "#fff",
          border: "1px solid #e0e8e2",
          borderRadius: 12,
          padding: "12px 16px",
          marginBottom: 14,
        }}
      >
        <label htmlFor="rice-sort" style={{ color: "#7b857e", fontSize: 13 }}>
          সাজান
        </label>

        <select
          id="rice-sort"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          style={{
            padding: "8px 10px",
            border: "1px solid #dce5de",
            borderRadius: 7,
            background: "#fff",
            color: "#344139",
            fontSize: 13,
          }}
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
          <option value="change">দামের পরিবর্তন</option>
        </select>
      </div>

      <p style={{ color: "#7b857e", fontSize: 13, margin: "16px 0 10px" }}>
        মোট {products.length}টি পণ্য দেখানো হচ্ছে
      </p>

      {products.length === 0 ? (
        <p>এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>
      ) : (
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
            gap: 12,
            alignItems: "stretch",
          }}
        >
          {sortedProducts.map((product) => {
            const up = product.change.dir === "up";
            const down = product.change.dir === "down";

            const color = up
              ? "#d93636"
              : down
              ? "#169653"
              : "#68736c";

            const background = up
              ? "#fff0f0"
              : down
              ? "#edf8f0"
              : "#f0f3f1";

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                style={{
                  display: "block",
                  color: "inherit",
                  textDecoration: "none",
                  background: "#fff",
                  border: "1px solid #e0e8e2",
                  borderRadius: 12,
                  padding: 12,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      flexShrink: 0,
                      borderRadius: 9,
                      background: "#f0f5f1",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 23,
                    }}
                  >
                    {product.image || product.categoryIcon || "🍚"}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <h2
                      style={{
                        fontSize: 14,
                        lineHeight: 1.5,
                        fontWeight: 700,
                        margin: 0,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {product.nameBn}
                    </h2>
                    <p style={{ margin: "2px 0 0", color: "#818b84", fontSize: 11 }}>
                      প্রতি {product.unit}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: 5,
                  }}
                >
                  <div>
                    <p style={{ color: "#818b84", fontSize: 10, margin: "0 0 4px" }}>
                      আজকের দাম
                    </p>
                    <p style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>
                      ৳{product.today}
                      <span style={{ fontSize: 10, color: "#818b84", fontWeight: 400 }}>
                        {" "}/ {product.unit}
                      </span>
                    </p>
                  </div>

                  <span
                    style={{
                      color,
                      background,
                      borderRadius: 20,
                      padding: "5px 8px",
                      fontSize: 10,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {up ? "▲" : down ? "▼" : "—"}{" "}
                    {Math.abs(product.change.pct)}%
                  </span>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </>
  );
}
