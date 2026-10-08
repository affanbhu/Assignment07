export const instant = false;

import Link from "next/link";
import "./category.css";

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

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

async function getCategory(category: string): Promise<Category> {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/categories/${category}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  return response.json();
}

async function getCategoryProducts(
  category: string
): Promise<Product[]> {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${category}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  return response.json();
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const [categoryInfo, products] = await Promise.all([
    getCategory(category),
    getCategoryProducts(category),
  ]);

  return (
    <main className="category-page">

      <section className="category-header">
        <div className="category-icon">
          {categoryInfo.icon}
        </div>

        <div>
          <h1>{categoryInfo.nameBn}</h1>
          <p>এই ক্যাটাগরির পণ্য ও পরিবর্তন</p>
        </div>
      </section>

      <section className="filter-bar">
        <span>সাজান</span>

        <select defaultValue="default">
          <option value="default">ডিফল্ট</option>
          <option value="price-low">কম দাম</option>
          <option value="price-high">বেশি দাম</option>
        </select>
      </section>

      <p className="product-count">
        মোট {products.length}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="product-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="product-card"
          >

            <div className="product-top">

              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.nameBn}
                />
              </div>

              <div className="product-info">
                <h2>{product.nameBn}</h2>
                <p>প্রতি {product.unit}</p>
              </div>

            </div>

            <div className="price-row">

              <div>
                <span className="price-label">
                  আজকের দাম
                </span>

                <div className="price">
                  ৳{product.today}

                  <span className="unit">
                    / {product.unit}
                  </span>
                </div>
              </div>

              <span
                className={`change ${product.change.dir}`}
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                  ? "▼"
                  : "→"}{" "}
                {product.change.pct}%
              </span>

            </div>

          </Link>
        ))}
      </div>

    </main>
  );
}