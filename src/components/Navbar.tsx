"use client";

import Link from "next/link";

const categories = [
  { id: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      {/* ================= MAIN NAVBAR ================= */}
      <div className="mx-auto flex min-h-[90px] max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">

        {/* ================= LOGO / BRAND - LEFT ================= */}
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
        >
          {/* Shopping Cart Logo */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#079447] shadow-sm sm:h-12 sm:w-12">
            <span className="text-2xl sm:text-3xl">🛒</span>
          </div>

          {/* Brand Name + Date */}
          <div className="flex min-w-0 flex-col">
            <h1 className="text-lg font-bold tracking-tight text-gray-800 sm:text-[22px]">
              বাজার দর
            </h1>

            <p className="mt-1 text-[9px] font-medium text-gray-500 sm:text-[11px]">
              শুক্রবার, ৬ অক্টোবর, ২০২৬
            </p>
          </div>
        </Link>

        {/* ================= USER - RIGHT ================= */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* User Avatar */}
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-100 sm:h-10 sm:w-10">
            <svg
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="#F1F1F1" />
              <circle cx="20" cy="14" r="6" fill="#222" />
              <path
                d="M9 36C10.5 28.5 14.5 25 20 25C25.5 25 29.5 28.5 31 36"
                fill="#222"
              />
              <path
                d="M15 12C16 9 18 8 21 8C24 8 26 10 26 13"
                stroke="#111"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Username */}
          <span className="hidden text-sm font-medium text-gray-700 sm:block">
            Rezwan
          </span>

          {/* More */}
          <span className="text-lg text-gray-500">⋮</span>
        </div>
      </div>

      {/* ================= CATEGORIES ================= */}
      <div className="border-t border-gray-100">
        <nav className="mx-auto flex max-w-[1500px] items-center gap-5 overflow-x-auto px-4 py-3 sm:gap-7 sm:px-8 lg:px-12">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium text-gray-700 transition-colors hover:text-[#079447] sm:text-[12px]"
            >
              <span className="text-[13px]">{category.icon}</span>

              <span>{category.nameBn}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}