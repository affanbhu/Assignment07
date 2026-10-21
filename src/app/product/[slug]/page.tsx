
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import "./product.css";

export const instant = false;

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number | string;
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
  markets?: Market[];
};

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor";

async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Product API failed: ${response.status}`);
  }

  const result: unknown = await response.json();

  if (Array.isArray(result)) {
    return result as Product[];
  }

  if (result && typeof result === "object") {
    const payload = result as {
      data?: unknown;
      products?: unknown;
      results?: unknown;
    };

    if (Array.isArray(payload.data)) {
      return payload.data as Product[];
    }

    if (Array.isArray(payload.products)) {
      return payload.products as Product[];
    }

    if (Array.isArray(payload.results)) {
      return payload.results as Product[];
    }
  }

  throw new Error("Unexpected product API response format.");
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);
}

function ProductLoadError() {
  return (
    <main className="product-page">
      <div className="product-not-found">
        <h1>পণ্যের তথ্য লোড করা যায়নি</h1>
        <p>
          ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
        </p>
        <Link href="/">হোম পেজে ফিরে যান</Link>
      </div>
    </main>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check whether the user is signed in.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect signed-out users to the sign-in page.
  if (!session) {
    redirect(
      `/signin?next=${encodeURIComponent(`/product/${slug}`)}`
    );
  }

  let products: Product[];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load product details:", error);
    return <ProductLoadError />;
  }

  const product = products.find(
    (item) =>
      String(item.slug) === slug ||
      String(item.id) === slug
  );

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];
  const direction = product.change?.dir ?? "flat";
  const percentage = Math.abs(product.change?.pct ?? 0);

  const minimumPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;

  const maximumPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, market) =>
          total + (market.min + market.max) / 2,
        0
      ) / markets.length
    : product.today;

  const changeText =
    direction === "up"
      ? "আজকের দাম বেড়েছে"
      : direction === "down"
        ? "আজকের দাম কমেছে"
        : "আজ দামে কোনো পরিবর্তন নেই";

  const imageIsUrl =
    typeof product.image === "string" &&
    /^(https?:\/\/|\/)/.test(product.image);

  return (
    <main className="product-page">
      <div className="product-container">
        <nav
          className="product-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link href="/">হোম</Link>
          <span className="breadcrumb-arrow">›</span>
          <Link href={`/category/${product.category}`}>
            {product.categoryNameBn || product.category}
          </Link>
          <span className="breadcrumb-arrow">›</span>
          <span className="breadcrumb-current">
            {product.nameBn}
          </span>
        </nav>

        <section className="product-header">
          <div className="product-main">
            <div className="product-image">
              {imageIsUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.nameBn}
                />
              ) : (
                <span>
                  {product.image || product.categoryIcon || "🍚"}
                </span>
              )}
            </div>

            <div className="product-info">
              <h1>{product.nameBn}</h1>

              <div className="product-category-tag">
                {product.categoryIcon}{" "}
                {product.categoryNameBn || product.category}
              </div>

              <p className="product-unit">
                প্রতি {product.unit}
              </p>

              <p className="change-text">
                <span className={`price-${direction}`}>
                  {direction === "up"
                    ? "↑"
                    : direction === "down"
                      ? "↓"
                      : "→"}{" "}
                  {formatPrice(percentage)}%
                </span>
                <span className="change-description">
                  {" "}{changeText}
                </span>
              </p>
            </div>
          </div>

          <div className="current-price">
            <span className="current-price-label">
              আজকের দাম
            </span>
            <span className="current-price-value">
              ৳{formatPrice(product.today)}
            </span>
            <span className="current-price-unit">
              টাকা / {product.unit}
            </span>
            <span className={`current-price-change ${direction}`}>
              {direction === "up"
                ? "▲"
                : direction === "down"
                  ? "▼"
                  : "—"}{" "}
              {formatPrice(percentage)}%
            </span>
          </div>
        </section>

        <section className="price-section">
          <h2>দামের সারসংক্ষেপ</h2>

          <div className="summary-grid">
            <div className="summary-card">
              <span className="summary-label">
                সর্বনিম্ন দাম
              </span>
              <strong className="summary-price minimum">
                ৳{formatPrice(minimumPrice)}
              </strong>
              <p className="summary-description">
                সবচেয়ে কম বাজারদর
              </p>
            </div>

            <div className="summary-card">
              <span className="summary-label">
                সর্বাধিক দাম
              </span>
              <strong className="summary-price maximum">
                ৳{formatPrice(maximumPrice)}
              </strong>
              <p className="summary-description">
                সবচেয়ে বেশি বাজারদর
              </p>
            </div>

            <div className="summary-card">
              <span className="summary-label">গড় দাম</span>
              <strong className="summary-price average">
                ৳{formatPrice(averagePrice)}
              </strong>
              <p className="summary-description">
                গড় বাজারদর
              </p>
            </div>
          </div>

          <h2 className="market-title">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <p className="market-description">
            বিভিন্ন বাজারে এই পণ্যের বর্তমান দাম
          </p>

          {markets.length > 0 ? (
            <div className="market-table-wrapper">
              <table className="market-table">
                <thead>
                  <tr>
                    <th>বাজার</th>
                    <th>বিভাগ</th>
                    <th>সর্বনিম্ন</th>
                    <th>সর্বাধিক</th>
                    <th>গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${market.division}-${index}`}
                    >
                      <td>
                        <strong>{market.market}</strong>
                      </td>
                      <td>{market.division}</td>
                      <td>৳{formatPrice(market.min)}</td>
                      <td>৳{formatPrice(market.max)}</td>
                      <td>
                        <strong>
                          ৳
                          {formatPrice(
                            (market.min + market.max) / 2
                          )}
                        </strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-market-data">
              <p>
                এই পণ্যের বাজারভিত্তিক তথ্য API থেকে পাওয়া যায়নি।
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

