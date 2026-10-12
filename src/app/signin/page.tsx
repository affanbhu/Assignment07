
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import "./signin.css";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || `${provider} দিয়ে সাইন ইন করা যায়নি।`);
        setSocialLoading("");
      }
    } catch {
      toast.error(`${provider} দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।`);
      setSocialLoading("");
    }
  };

  return (
    <div className="signin-page">
      <main className="signin-main">
        <h1>সাইন ইন</h1>

        <p className="signin-subtitle">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <div className="signin-card">
          <form onSubmit={handleSignIn}>
            <label htmlFor="email">ইমেইল</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <label htmlFor="password">পাসওয়ার্ড</label>
            <input
              id="password"
              type="password"
              placeholder="আপনার পাসওয়ার্ড"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <button
              type="submit"
              className="submit-button"
              disabled={loading || socialLoading !== ""}
            >
              {loading ? "প্রবেশ করা হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="divider">
            <span>অথবা</span>
          </div>

          <div className="social-buttons">
            {/* Google sign-in */}
            <button
              type="button"
              disabled={loading || socialLoading !== ""}
              onClick={() => handleSocialSignIn("google")}
            >
              <svg
                className="google-icon"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
                />
                <path
                  fill="#34A853"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
                />
                <path
                  fill="#FBBC05"
                  d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
                />
                <path
                  fill="#EA4335"
                  d="M24 11.9c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3c1.6-4.9 6.1-8.5 11.4-8.5Z"
                />
              </svg>

              <span>
                {socialLoading === "google"
                  ? "Google-এ নিয়ে যাওয়া হচ্ছে..."
                  : "Google দিয়ে সাইন ইন করুন"}
              </span>
            </button>

            {/* GitHub sign-in */}
            <button
              type="button"
              disabled={loading || socialLoading !== ""}
              onClick={() => handleSocialSignIn("github")}
            >
              <svg
                className="github-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.83 1.96 3.25 1.96.78 0 1.4-.3 1.88-.78.08-.6.31-1.02.57-1.26-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.15a10.7 10.7 0 0 1 5.57 0c2.12-1.45 3.06-1.15 3.06-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.6 5.24-5.09 5.52.32.28.6.82.6 1.65v2.45c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              <span>
                {socialLoading === "github"
                  ? "GitHub-এ নিয়ে যাওয়া হচ্ছে..."
                  : "GitHub দিয়ে সাইন ইন করুন"}
              </span>
            </button>
          </div>

          <p className="signup-text">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup">সাইন আপ করুন</Link>
          </p>
        </div>

        <p className="back-home">
          ← <Link href="/">হোম পেজে ফিরে যান</Link>
        </p>
      </main>
    </div>
  );
}
