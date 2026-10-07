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
      {/* Main Navbar */}
      <div className="mx-auto flex h-[82px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#079447] shadow-sm">
            <svg
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 9.5L5.5 19H18.5L20 9.5"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 9.5H21"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <path
                d="M7 9.5L8.5 5H15.5L17 9.5"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 13.5H15.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M10 16.5H14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="leading-none">
            <h1 className="text-[21px] font-bold tracking-tight text-gray-800">
              বাজার দর
            </h1>

            <p className="mt-1 text-[10px] font-medium text-gray-500">
              শুক্রবার, ৬ অক্টোবর, ২০২৬
            </p>
          </div>
        </Link>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100">
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

          <span className="text-sm font-medium text-gray-700">
            Rezwan
          </span>

          <span className="text-gray-500">⋮</span>
        </div>
      </div>

      {/* Categories */}
      <div className="border-t border-gray-100">
        <nav className="mx-auto flex max-w-[1500px] items-center gap-7 overflow-x-auto px-5 py-3 sm:px-8 lg:px-12">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug ?? category.id}`}
              className="flex shrink-0 items-center gap-1.5 text-[12px] font-medium text-gray-700 transition-colors hover:text-[#079447]"
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