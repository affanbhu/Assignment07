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

async function getCategoryProducts(
  category: string
): Promise<Product[]> {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/categories/${category}`,
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

  const products = await getCategoryProducts(category);

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <h1 style={{ fontSize: "32px" }}>
        {products[0]?.categoryIcon}{" "}
        {products[0]?.categoryNameBn || category}
      </h1>

      <p style={{ color: "#666" }}>
        এই ক্যাটাগরির পণ্যসমূহ
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #ddd",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "50px" }}>
              {product.image}
            </div>

            <h2 style={{ marginTop: "10px" }}>
              {product.nameBn}
            </h2>

            <p style={{ color: "#666" }}>
              প্রতি {product.unit}
            </p>

            <h3
              style={{
                fontSize: "24px",
                marginTop: "15px",
              }}
            >
              ৳{product.today}
            </h3>

            <p
              style={{
                color:
                  product.change.dir === "up"
                    ? "green"
                    : product.change.dir === "down"
                    ? "red"
                    : "#666",
              }}
            >
              {product.change.dir === "up"
                ? "↑"
                : product.change.dir === "down"
                ? "↓"
                : "→"}{" "}
              {product.change.pct}%
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}