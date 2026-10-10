
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
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
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এবার সাইন ইন করুন।");
      router.push("/signin");
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignUp(provider: "google" | "github") {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সোশ্যাল লগইন করা যায়নি।");
        setSocialLoading("");
      }
    } catch {
      toast.error("সোশ্যাল লগইন চালু করা যায়নি। পরে আবার চেষ্টা করুন।");
      setSocialLoading("");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f1f6f1] px-4 py-8 sm:py-10">
      <header className="mb-5 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#26332a]">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-1 text-sm text-[#7b827b]">
          বিনা ঝামেলায় নতুন অ্যাকাউন্ট করে সব বিস্তারিত দাম দেখুন।
        </p>
      </header>

      <section className="w-full max-w-[440px] rounded-xl border border-[#e0e8e0] bg-[#fcfdfc] p-5 shadow-sm sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
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
              disabled={loading || socialLoading !== ""}
              className="h-[42px] w-full rounded-lg border border-[#e0e7e1] bg-transparent px-3 text-sm text-[#28332b] outline-none transition placeholder:text-[#929992] focus:border-[#079447] focus:ring-2 focus:ring-[#079447]/10"
            />
          </div>

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
              disabled={loading || socialLoading !== ""}
              className="h-[42px] w-full rounded-lg border border-[#e0e7e1] bg-transparent px-3 text-sm text-[#28332b] outline-none transition placeholder:text-[#929992] focus:border-[#079447] focus:ring-2 focus:ring-[#079447]/10"
            />
          </div>

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
              disabled={loading || socialLoading !== ""}
              className="h-[42px] w-full rounded-lg border border-[#e0e7e1] bg-transparent px-3 text-sm text-[#28332b] outline-none transition placeholder:text-[#929992] focus:border-[#079447] focus:ring-2 focus:ring-[#079447]/10"
            />
          </div>

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
              disabled={loading || socialLoading !== ""}
              className="h-[42px] w-full rounded-lg border border-[#e0e7e1] bg-transparent px-3 text-sm text-[#28332b] outline-none transition placeholder:text-[#929992] focus:border-[#079447] focus:ring-2 focus:ring-[#079447]/10"
            />
          </div>

          <button
            type="submit"
            disabled={loading || socialLoading !== ""}
            className="w-full rounded-lg bg-[#078d43] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067737] focus:outline-none focus:ring-2 focus:ring-[#078d43]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e1e7e2]" />
          <span className="text-xs text-[#737b74]">অথবা</span>
          <div className="h-px flex-1 bg-[#e1e7e2]" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={loading || socialLoading !== ""}
            onClick={() => handleSocialSignUp("google")}
            className="flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg border border-[#e0e7e1] bg-white px-2 py-2 text-xs font-medium text-[#303a32] transition hover:bg-[#f4f7f4] focus:outline-none focus:ring-2 focus:ring-[#079447]/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "google"
              ? "Google খুলছে..."
              : "Google দিয়ে চালিয়ে যান"}
          </button>

          <button
            type="button"
            disabled={loading || socialLoading !== ""}
            onClick={() => handleSocialSignUp("github")}
            className="flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg border border-[#e0e7e1] bg-white px-2 py-2 text-xs font-medium text-[#303a32] transition hover:bg-[#f4f7f4] focus:outline-none focus:ring-2 focus:ring-[#079447]/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "github"
              ? "GitHub খুলছে..."
              : "GitHub দিয়ে চালিয়ে যান"}
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-[#687169]">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#078d43] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </section>

      <Link
        href="/"
        className="mt-5 text-xs text-[#7b827b] transition hover:text-[#078d43]"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
