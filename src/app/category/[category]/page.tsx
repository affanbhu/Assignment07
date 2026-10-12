
import Link from "next/link";
import "./category.css";

export const instant = false;

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

async function getCategoryProducts(
  category: string
): Promise<Product[]> {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(category)}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  const result = await response.json();
  const products = Array.isArray(result) ? result : result.data;

  if (!Array.isArray(products)) {
    throw new Error("Unexpected product API response");
  }

  return products;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const products = await getCategoryProducts(category);
  const categoryInfo = products[0];

  return (
    <main className="category-page">
      <div className="category-header">
        <div className="category-icon">
          {categoryInfo?.categoryIcon || "🍚"}
        </div>

        <div>
          <h1>{categoryInfo?.categoryNameBn || category}</h1>
          <p>এই ক্যাটাগরির পণ্য ও পরিবর্তন</p>
        </div>
      </div>

      <div className="filter-bar">
        <span>সাজান</span>
        <select defaultValue="default" aria-label="পণ্য সাজান">
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
          <option value="change">দামের পরিবর্তন</option>
        </select>
      </div>

      <p className="product-count">
        মোট {products.length}টি পণ্য দেখানো হচ্ছে
      </p>

      {products.length > 0 ? (
        <section className="product-grid">
          {products.map((product) => {
            const direction = product.change?.dir || "flat";

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="product-card"
              >
                <div className="product-top">
                  <div className="product-image">
                    {product.image &&
                    (product.image.startsWith("https://") ||
                      product.image.startsWith("http://") ||
                      product.image.startsWith("/")) ? (
                      <img
                        src={product.image}
                        alt={product.nameBn}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      product.image || product.categoryIcon || "🍚"
                    )}
                  </div>

                  <div className="product-info">
                    <h2>{product.nameBn}</h2>
                    <p>প্রতি {product.unit}</p>
                  </div>
                </div>

                <div className="price-row">
                  <div>
                    <span className="price-label">আজকের দাম</span>
                    <span className="price">
                      ৳{product.today}
                      <span className="unit"> /{product.unit}</span>
                    </span>
                  </div>

                  <span className={`change ${direction}`}>
                    {direction === "up"
                      ? "▲"
                      : direction === "down"
                      ? "▼"
                      : "—"}{" "}
                    {Math.abs(product.change?.pct ?? 0)}%
                  </span>
                </div>
              </Link>
            );
          })}
        </section>
      ) : (
        <div className="product-grid">
          <p>এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>
        </div>
      )}
    </main>
  );
}
