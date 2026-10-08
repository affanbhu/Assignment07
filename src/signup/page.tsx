"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "সাইন আপ করা যায়নি।");
      return;
    }

    router.push("/");
  }

  return (
    <main className="min-h-screen bg-[#f3f7f3] px-4 py-12">
      <div className="mx-auto max-w-md rounded-2xl border border-[#e2e8e3] bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-[#202820]">
          সাইন আপ
        </h1>

        <p className="mt-2 text-sm text-[#737b73]">
          বাজার দর-এ নতুন অ্যাকাউন্ট তৈরি করুন।
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="আপনার নাম"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-[#dce3de] px-4 py-3 outline-none focus:border-[#079447]"
          />

          <input
            type="email"
            placeholder="ইমেইল"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-[#dce3de] px-4 py-3 outline-none focus:border-[#079447]"
          />

          <input
            type="password"
            placeholder="পাসওয়ার্ড"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full rounded-lg border border-[#dce3de] px-4 py-3 outline-none focus:border-[#079447]"
          />

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#079447] px-4 py-3 font-semibold text-white transition hover:bg-[#067b3b] disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন আপ"}
          </button>
        </form>
      </div>
    </main>
  );
}