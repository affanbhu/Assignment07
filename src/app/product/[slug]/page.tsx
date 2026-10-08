import "./product.css";

export const instant = false;

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

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
  markets: Market[];
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const products = await getProducts();

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    return (
      <main className="product-page">
        <div className="product-not-found">
          <h1>Product Not Found</h1>
          <p>এই পণ্যটি খুঁজে পাওয়া যায়নি।</p>
        </div>
      </main>
    );
  }

  /* -----------------------------
     PRICE CALCULATIONS
  ----------------------------- */

  const minimumPrice =
    product.markets?.length > 0
      ? Math.min(
          ...product.markets.map((market) => market.min)
        )
      : product.today;

  const maximumPrice =
    product.markets?.length > 0
      ? Math.max(
          ...product.markets.map((market) => market.max)
        )
      : product.today;

  const averagePrice =
    product.markets?.length > 0
      ? Math.round(
          product.markets.reduce(
            (total, market) =>
              total + (market.min + market.max) / 2,
            0
          ) / product.markets.length
        )
      : product.today;

  /* -----------------------------
     PRICE CHANGE TEXT
  ----------------------------- */

  const changeText =
    product.change.dir === "up"
      ? "আজ দাম বেড়েছে"
      : product.change.dir === "down"
      ? "আজ দাম কমেছে"
      : "আজ দামে কোনো পরিবর্তন নেই";

  return (
    <main className="product-page">

      <div className="product-container">

        {/* =========================
            BREADCRUMB
        ========================= */}

        <div className="product-breadcrumb">

          <span>হোম</span>

          <span className="breadcrumb-arrow">
            ›
          </span>

          <span>
            {product.categoryNameBn}
          </span>

          <span className="breadcrumb-arrow">
            ›
          </span>

          <span className="breadcrumb-current">
            {product.nameBn}
          </span>

        </div>


        {/* =========================
            PRODUCT HEADER
        ========================= */}

        <section className="product-header">

          <div className="product-main">

            {/* Product Image */}

            <div className="product-image">

              <img
                src={product.image}
                alt={product.nameBn}
              />

            </div>


            {/* Product Information */}

            <div className="product-info">

              <h1>
                {product.nameBn}
              </h1>

              <p className="product-unit">
                প্রতি {product.unit}
              </p>

              <p className="change-text">

                {product.change.dir === "up" && (
                  <span className="price-up">
                    ↑ {product.change.pct}%
                  </span>
                )}

                {product.change.dir === "down" && (
                  <span className="price-down">
                    ↓ {product.change.pct}%
                  </span>
                )}

                {product.change.dir === "flat" && (
                  <span className="price-flat">
                    → ০.০%
                  </span>
                )}

                <span className="change-description">
                  {" "}
                  {changeText}
                </span>

              </p>

            </div>

          </div>


          {/* Current Price */}

          <div className="current-price">

            <span className="current-price-label">
              আজকের দাম
            </span>

            <span className="current-price-value">
              ৳{product.today}
            </span>

            <span className="current-price-unit">
              টাকা / {product.unit}
            </span>

            <span
              className={`current-price-change ${product.change.dir}`}
            >
              {product.change.dir === "up" && "▲"}

              {product.change.dir === "down" && "▼"}

              {product.change.dir === "flat" && "—"}

              {" "}
              {product.change.pct}%
            </span>

          </div>

        </section>


        {/* =========================
            PRICE SECTION
        ========================= */}

        <section className="price-section">

          {/* Price Summary */}

          <h2>
            দামের সারসংক্ষেপ
          </h2>

          <div className="summary-grid">

            {/* Minimum */}

            <div className="summary-card">

              <span className="summary-label">
                সর্বনিম্ন দাম
              </span>

              <strong className="summary-price minimum">
                ৳{minimumPrice}
              </strong>

              <p className="summary-description">
                সবচেয়ে কম বাজারে
              </p>

            </div>


            {/* Maximum */}

            <div className="summary-card">

              <span className="summary-label">
                সর্বাধিক দাম
              </span>

              <strong className="summary-price maximum">
                ৳{maximumPrice}
              </strong>

              <p className="summary-description">
                সবচেয়ে বেশি বাজারে
              </p>

            </div>


            {/* Average */}

            <div className="summary-card">

              <span className="summary-label">
                গড় দাম
              </span>

              <strong className="summary-price average">
                ৳{averagePrice}
              </strong>

              <p className="summary-description">
                গড় বাজারদর
              </p>

            </div>

          </div>


          {/* =========================
              MARKET PRICES
          ========================= */}

          <h2 className="market-title">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="market-description">
            বিভিন্ন বাজারে এই পণ্যের বর্তমান দাম
          </p>


          {product.markets?.length > 0 ? (

            <div className="market-table-wrapper">

              <table className="market-table">

                <thead>

                  <tr>

                    <th>
                      বাজার
                    </th>

                    <th>
                      বিভাগ
                    </th>

                    <th>
                      সর্বনিম্ন
                    </th>

                    <th>
                      সর্বাধিক
                    </th>

                    <th>
                      গড়
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {product.markets.map((market) => {

                    const marketAverage =
                      Math.round(
                        (market.min + market.max) / 2
                      );

                    return (
                      <tr key={`${market.market}-${market.division}`}>

                        <td>
                          <strong>
                            {market.market}
                          </strong>
                        </td>

                        <td>
                          {market.division}
                        </td>

                        <td>
                          ৳{market.min}
                        </td>

                        <td>
                          ৳{market.max}
                        </td>

                        <td>
                          <strong>
                            ৳{marketAverage}
                          </strong>
                        </td>

                      </tr>
                    );

                  })}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="no-market-data">

              <p>
                এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
              </p>

            </div>

          )}

        </section>

      </div>

    </main>
  );
}