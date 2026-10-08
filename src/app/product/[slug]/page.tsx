
export const instant = false;

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};
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
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

function formatPrice(price: number) {
  return price.toLocaleString("bn-BD");
}

function getUnitText(unit: string) {
  if (unit === "kg") return "প্রতি কেজি";
  if (unit === "litre") return "প্রতি লিটার";
  if (unit === "dozen") return "প্রতি ডজন";
  if (unit === "piece") return "প্রতি পিস";

  return unit;
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
      <main className="min-h-screen bg-[#f3f7f3] px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#e2e8e3] bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">🔎</div>

          <h1 className="mt-4 text-xl font-bold text-[#202820]">
            পণ্য পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-sm text-[#737b73]">
            এই পণ্যটি খুঁজে পাওয়া যায়নি।
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f7f3] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ================= SUMMARY ================= */}
        <section className="rounded-2xl border border-[#e2e8e3] bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row">

            {/* Emoji */}
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-[#f1f4ef] text-6xl">
              {product.image}
            </div>

            {/* Product Information */}
            <div className="flex-1">

              {/* Title */}
              <h1 className="text-2xl font-bold text-[#202820] sm:text-3xl">
                {product.nameBn}
              </h1>

              {/* Market Summary */}
              <p className="mt-3 text-sm leading-7 text-[#687168]">
                {product.nameBn} এর বর্তমান বাজারদর এবং
                বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের
                বিস্তারিত তথ্য এখানে দেখুন।
              </p>

              {/* Category Tag */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f6ed] px-3 py-1 text-xs font-semibold text-[#16834b]">
                  {product.categoryIcon}
                  {product.categoryNameBn}
                </span>
              </div>

              {/* Unit */}
              <p className="mt-4 text-sm font-medium text-[#737b73]">
                {getUnitText(product.unit)}
              </p>

            </div>
          </div>

          {/* ================= PRICE ================= */}
          <div className="mt-8 border-t border-[#edf0ed] pt-6">

            <p className="text-sm text-[#737b73]">
              আজকের দাম
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">

              <p className="text-3xl font-bold text-[#1b211c]">
                ৳{formatPrice(product.today)}
              </p>

              {product.change.dir === "up" && (
                <span className="rounded-full bg-[#fff0ef] px-3 py-1 text-xs font-semibold text-[#e5534b]">
                  ▲ {Math.abs(product.change.pct)}%
                </span>
              )}

              {product.change.dir === "down" && (
                <span className="rounded-full bg-[#eaf8ef] px-3 py-1 text-xs font-semibold text-[#259653]">
                  ▼ {Math.abs(product.change.pct)}%
                </span>
              )}

              {product.change.dir === "flat" && (
                <span className="rounded-full bg-[#eef1ee] px-3 py-1 text-xs font-semibold text-[#747a74]">
                  — ০.০%
                </span>
              )}

            </div>

            <p className="mt-2 text-xs text-[#858d85]">
              {getUnitText(product.unit)}
            </p>

          </div>

        </section>

        {/* ================= PRICE HISTORY ================= */}
        <section className="mt-6 rounded-2xl border border-[#e2e8e3] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-bold text-[#202820]">
            দামের ইতিহাস
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

            <div className="rounded-xl bg-[#f5f7f5] p-4">
              <p className="text-xs text-[#737b73]">
                আজ
              </p>
              <p className="mt-1 font-bold text-[#202820]">
                ৳{formatPrice(product.today)}
              </p>
            </div>

            <div className="rounded-xl bg-[#f5f7f5] p-4">
              <p className="text-xs text-[#737b73]">
                গতকাল
              </p>
              <p className="mt-1 font-bold text-[#202820]">
                ৳{formatPrice(product.yesterday)}
              </p>
            </div>

            <div className="rounded-xl bg-[#f5f7f5] p-4">
              <p className="text-xs text-[#737b73]">
                গত সপ্তাহ
              </p>
              <p className="mt-1 font-bold text-[#202820]">
                ৳{formatPrice(product.lastWeek)}
              </p>
            </div>

            <div className="rounded-xl bg-[#f5f7f5] p-4">
              <p className="text-xs text-[#737b73]">
                গত মাস
              </p>
              <p className="mt-1 font-bold text-[#202820]">
                ৳{formatPrice(product.lastMonth)}
              </p>
            </div>

          </div>
        </section>

        {/* ================= MARKET PRICES ================= */}
        <section className="mt-6 rounded-2xl border border-[#e2e8e3] bg-white p-6 shadow-sm sm:p-8">

          <div>
            <h2 className="text-lg font-bold text-[#202820]">
              বাজারভিত্তিক দাম
            </h2>

            <p className="mt-1 text-sm text-[#737b73]">
              বিভিন্ন বাজারে সর্বনিম্ন ও সর্বোচ্চ দাম
            </p>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">

              <thead>
                <tr className="border-b border-[#e8ece8] text-[#737b73]">
                  <th className="px-3 py-3 font-medium">
                    বাজার
                  </th>

                  <th className="px-3 py-3 font-medium">
                    বিভাগ
                  </th>

                  <th className="px-3 py-3 font-medium">
                    সর্বনিম্ন
                  </th>

                  <th className="px-3 py-3 font-medium">
                    সর্বোচ্চ
                  </th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market) => (
                  <tr
                    key={`${market.market}-${market.division}`}
                    className="border-b border-[#f0f2f0] last:border-0"
                  >
                    <td className="px-3 py-3 font-medium text-[#303830]">
                      {market.market}
                    </td>

                    <td className="px-3 py-3 text-[#737b73]">
                      {market.division}
                    </td>

                    <td className="px-3 py-3 font-semibold text-[#16834b]">
                      ৳{formatPrice(market.min)}
                    </td>

                    <td className="px-3 py-3 font-semibold text-[#e5534b]">
                      ৳{formatPrice(market.max)}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </section>

      </div>
    </main>
  );
}