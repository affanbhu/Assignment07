
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setError(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignUp(
    provider: "google" | "github"
  ) {
    setError("");

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        setError(
          result.error.message || "সোশ্যাল লগইন করা যায়নি।"
        );
      }
    } catch {
      setError(
        "সোশ্যাল লগইন চালু করা যায়নি। পরে আবার চেষ্টা করুন।"
      );
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f1f6f1] px-4 py-8 sm:py-10">
      {/* Header */}
      <header className="mb-5 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#26332a]">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-1 text-sm text-[#7b827b]">
          বিনা ঝামেলায় নতুন অ্যাকাউন্ট করে সব বিস্তারিত দাম দেখুন।
        </p>
      </header>

      {/* Signup Card */}
      <section className="w-full max-w-[440px] rounded-xl border border-[#e0e8e0] bg-[#fcfdfc] p-5 shadow-sm sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-xs font-medium text-[#303a32]"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
              className="h-[42px] w-full rounded-lg border border-[#e0e7e1] bg-transparent px-3 text-sm text-[#28332b] outline-none transition placeholder:text-[#929992] focus:border-[#079447] focus:ring-2 focus:ring-[#079447]/10"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-medium text-[#303a32]"
            >
              ইমেইল
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="h-[42px] w-full rounded-lg border border-[#e0e7e1] bg-transparent px-3 text-sm text-[#28332b] outline-none transition placeholder:text-[#929992] focus:border-[#079447] focus:ring-2 focus:ring-[#079447]/10"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-medium text-[#303a32]"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
              className="h-[42px] w-full rounded-lg border border-[#e0e7e1] bg-transparent px-3 text-sm text-[#28332b] outline-none transition placeholder:text-[#929992] focus:border-[#079447] focus:ring-2 focus:ring-[#079447]/10"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-xs font-medium text-[#303a32]"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="আবার লিখুন"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="h-[42px] w-full rounded-lg border border-[#e0e7e1] bg-transparent px-3 text-sm text-[#28332b] outline-none transition placeholder:text-[#929992] focus:border-[#079447] focus:ring-2 focus:ring-[#079447]/10"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#078d43] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067737] focus:outline-none focus:ring-2 focus:ring-[#078d43]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e1e7e2]" />
          <span className="text-xs text-[#737b74]">অথবা</span>
          <div className="h-px flex-1 bg-[#e1e7e2]" />
        </div>

        {/* Social Signup */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleSocialSignUp("google")}
            className="flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg border border-[#e0e7e1] bg-white px-2 py-2 text-xs font-medium text-[#303a32] transition hover:bg-[#f4f7f4] focus:outline-none focus:ring-2 focus:ring-[#079447]/20"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.05 5.05 0 0 1-2.2 3.31v2.77h3.57c2.09-1.92 3.27-4.75 3.27-8.09Z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.99 7.29-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.15a11 11 0 0 0 0 9.88l3.69-2.84Z"
              />
              <path
                fill="#EA4335"
                d="M12 5.37c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.37 12 .37a11 11 0 0 0-9.85 6.69l3.69 2.84C6.71 7.3 9.14 5.37 12 5.37Z"
              />
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignUp("github")}
            className="flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg border border-[#e0e7e1] bg-white px-2 py-2 text-xs font-medium text-[#303a32] transition hover:bg-[#f4f7f4] focus:outline-none focus:ring-2 focus:ring-[#079447]/20"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 fill-current"
              aria-hidden="true"
            >
              <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.01-.7.08-.69.08-.69 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.14a10.7 10.7 0 0 1 5.6 0c2.14-1.44 3.08-1.14 3.08-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.6 5.24-5.08 5.51.4.35.75 1.03.75 2.08v3.1c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-4 text-center text-xs text-[#687169]">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#078d43] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </section>

      {/* Back to Home */}
      <Link
        href="/"
        className="mt-5 text-xs text-[#7b827b] transition hover:text-[#078d43]"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
