
"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: updatedName,
      });

      if (result.error) {
        const errorMessage =
          result.error.message || "নাম আপডেট করা যায়নি।";

        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      await refetch();

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে।");
    } catch {
      const errorMessage = "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    setError("");
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(
          result.error.message || "সাইন আউট করা যায়নি।"
        );
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.replace("/signin");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0]">
        <p className="text-sm text-gray-500">
          প্রোফাইল লোড হচ্ছে...
        </p>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#f0f5f0] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-[680px]">
        {/* Profile Photo */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border border-[#e0e5e0] bg-[#d9d9d9]">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt="প্রোফাইল ছবি"
              className="h-full w-full object-cover"
            />
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-7 w-7 text-gray-500"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="8"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M5 20c.5-3.5 3.2-5.5 7-5.5s6.5 2 7 5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>

        {/* Page Heading */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold tracking-tight text-[#26332a]">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-[#788078]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Information Card */}
        <section className="mb-4 rounded-xl border border-[#e1e8e1] bg-[#fbfcfb] p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e1e7e1] bg-[#e8eee8]">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt="প্রোফাইল"
                  className="h-full w-full object-cover"
                />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 text-[#7c877e]"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M5 20c.5-3.5 3.2-5.5 7-5.5s6.5 2 7 5.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="truncate font-semibold text-[#26332a]">
                {user.name || "আপনার নাম"}
              </h2>
              <p className="mt-1 break-all text-sm text-[#778078]">
                {user.email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="shrink-0 self-start rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:self-center"
            >
              <span aria-hidden="true">↪ </span>
              {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>
        </section>

        {/* Edit Profile Form */}
        <section className="rounded-xl border border-[#e1e8e1] bg-[#fbfcfb] p-5 sm:p-6">
          <h2 className="mb-6 text-base font-semibold text-[#26332a]">
            তথ্য
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-medium text-[#303a32]"
              >
                নাম
              </label>

              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="আপনার নাম লিখুন"
                autoComplete="name"
                maxLength={100}
                required
                disabled={loading || signingOut}
                className="h-11 w-full rounded-lg border border-[#e0e7e0] bg-transparent px-3 text-sm text-[#26332a] outline-none transition placeholder:text-gray-400 focus:border-[#078d43] focus:ring-2 focus:ring-[#078d43]/10"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {message && (
              <p
                role="status"
                className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || signingOut}
              className="w-full rounded-lg bg-[#078d43] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067737] focus:outline-none focus:ring-2 focus:ring-[#078d43]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>

        {/* Back to Home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-[#6f796f] transition hover:text-[#078d43]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
