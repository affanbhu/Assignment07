
import Link from "next/link";
import CategoryProductList from "./CategoryProductList";

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
  slug: string;
  nameBn: string;
  icon: string;
};

const API_BASE =
  "https://openapi.programming-hero.com/api/bazardor";

async function getCategoryProducts(
  category: string
): Promise<Product[]> {
  const response = await fetch(
    `${API_BASE}/products?category=${encodeURIComponent(category)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch category products: ${response.status}`
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Products API did not return an array");
  }

  return data as Product[];
}

async function getCategoryDetails(
  category: string
): Promise<Category | null> {
  const response = await fetch(
    `${API_BASE}/categories/${encodeURIComponent(category)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  const data: unknown = await response.json();

  if (
    !data ||
    typeof data !== "object" ||
    !("slug" in data)
  ) {
    return null;
  }

  return data as Category;
}

function EmptyCategoryState() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#f3f7f3] px-4 py-12 text-[#1d251e]">
      <div className="w-full max-w-md rounded-2xl border border-[#e2e8e3] bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-5xl" aria-hidden="true">
          🛒
        </div>

        <h1 className="text-xl font-bold text-[#202820]">
          কোনো পণ্য পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#737b73]">
          এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি
          খুঁজে পাওয়া যায়নি।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#259653] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1e8045]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  let products: Product[];
  let categoryDetails: Category | null;

  try {
    [products, categoryDetails] = await Promise.all([
      getCategoryProducts(category),
      getCategoryDetails(category),
    ]);
  } catch (error) {
    console.error("Failed to load category page:", error);
    return <EmptyCategoryState />;
  }

  // Reject unknown category slugs, even if the API returns products.
  if (!categoryDetails || products.length === 0) {
    return <EmptyCategoryState />;
  }

  const categoryTitle =
    categoryDetails.nameBn ||
    products[0]?.categoryNameBn ||
    category;

  const categoryIcon =
    categoryDetails.icon ||
    products[0]?.categoryIcon ||
    "🛍️";

  return (
    <main className="min-h-screen bg-[#f3f7f3] text-[#1d251e]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-[#202820] sm:text-3xl">
            <span aria-hidden="true">{categoryIcon}</span>
            <span>{categoryTitle}</span>
          </h1>

          <p className="mt-2 text-sm text-[#7a8279]">
            এই ক্যাটাগরির পণ্যসমূহ
          </p>
        </div>

        <CategoryProductList products={products} />
      </div>
    </main>
  );
}
