
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const categories = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

const tickerProducts = [
  { emoji: "🍚", name: "চাল", price: "৬৫", unit: "কেজি", change: "২.৫%", direction: "up" },
  { emoji: "🫘", name: "ডাল", price: "১২০", unit: "কেজি", change: "১.২%", direction: "down" },
  { emoji: "🛢️", name: "সয়াবিন তেল", price: "১৮০", unit: "লিটার", change: "৩.১%", direction: "up" },
  { emoji: "🥬", name: "সবজি", price: "৫০", unit: "কেজি", change: "২.০%", direction: "down" },
  { emoji: "🐟", name: "ইলিশ মাছ", price: "৮৫০", unit: "কেজি", change: "৪.২%", direction: "up" },
  { emoji: "🍗", name: "মুরগি", price: "২২০", unit: "কেজি", change: "১.৫%", direction: "down" },
  { emoji: "🥛", name: "দুধ", price: "১০০", unit: "লিটার", change: "১.৮%", direction: "up" },
  { emoji: "🌶️", name: "মসলা", price: "৩৫০", unit: "কেজি", change: "২.৩%", direction: "up" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      {/* FIRST ROW */}
      <div className="mx-auto flex min-h-[90px] max-w-[1500px] items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* LOGO */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 sm:gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#079447] shadow-sm sm:h-12 sm:w-12">
            <span className="text-2xl sm:text-3xl">🛒</span>
          </div>

          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-gray-800 sm:text-[22px]">
              বাজার দর
            </h1>
            <p className="mt-1 text-[9px] font-medium text-gray-500 sm:text-[11px]">
              শুক্রবার, ৬ অক্টোবর, ২০২৬
            </p>
          </div>
        </Link>

        {/* AUTHENTICATION / PROFILE */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isPending ? (
            <div
              className="h-9 w-20 animate-pulse rounded-lg bg-gray-100"
              aria-label="অ্যাকাউন্ট লোড হচ্ছে"
            />
          ) : user ? (
            <Link
              href="/profile"
              aria-label="আমার প্রোফাইল"
              className="flex max-w-[190px] items-center gap-2 rounded-lg border border-[#e0e8e1] bg-white px-2 py-1.5 transition hover:bg-green-50 sm:gap-3 sm:px-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8f2eb] text-sm font-semibold text-[#078d43]">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  (user.name?.trim()?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase()
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
                  {user.name || "আমার প্রোফাইল"}
                </p>
                <p className="text-[10px] text-gray-500">
                  প্রোফাইল দেখুন
                </p>
              </div>
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg border border-[#079447] px-3 py-2 text-xs font-medium text-[#079447] transition hover:bg-green-50 sm:px-4 sm:text-sm"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-[#079447] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#067c3b] sm:px-4 sm:text-sm"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* CATEGORY NAVIGATION */}
      <div className="border-t border-gray-100">
        <nav className="mx-auto flex max-w-[1500px] items-center justify-center gap-4 overflow-x-auto px-4 py-3 sm:gap-6 lg:gap-8">
          {categories.map((category) => {
            const categoryUrl = `/category/${category.slug}`;
            const isActive = pathname === categoryUrl;

            return (
              <Link
                key={category.id}
                href={categoryUrl}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-all sm:text-sm ${
                  isActive
                    ? "bg-[#079447] text-white shadow-sm"
                    : "text-gray-700 hover:bg-green-50 hover:text-[#079447]"
                }`}
              >
                <span className="text-[14px]">{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* PRICE TICKER */}
      <div className="overflow-hidden border-t border-gray-100 bg-[#f8faf9]">
        <div className="ticker-track flex w-max items-center py-2">
          {[0, 1].map((copy) => (
            <div className="flex items-center" key={copy}>
              {tickerProducts.map((product, index) => (
                <div
                  key={`${copy}-${index}`}
                  className="mx-5 flex shrink-0 items-center gap-2 whitespace-nowrap text-xs sm:mx-7 sm:text-sm"
                >
                  <span className="text-base sm:text-lg">{product.emoji}</span>
                  <span className="font-semibold text-gray-800">
                    {product.name}
                  </span>
                  <span className="text-gray-600">
                    {product.price} টাকা/{product.unit}
                  </span>
                  <span
                    className={
                      product.direction === "up"
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-500"
                    }
                  >
                    {product.direction === "up" ? "▲" : "▼"} {product.change}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* TICKER ANIMATION */}
      <style jsx>{`
        .ticker-track {
          animation: ticker 30s linear infinite;
        }

        @keyframes ticker {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </header>
  );
}