
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f3f7f3] px-4 py-16 text-center">
      <h1 className="text-8xl font-bold text-green-700">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি।
      </h2>

      <p className="mt-3 max-w-md text-gray-600">
        আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে,
        এর ঠিকানা পরিবর্তন হয়েছে অথবা পেজটি বিদ্যমান নেই।
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}