
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

  const handleSocialSignIn = async (provider: "google" | "github") => {
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
            <button
              type="button"
              disabled={loading || socialLoading !== ""}
              onClick={() => handleSocialSignIn("google")}
            >
              <span className="google-icon">G</span>
              {socialLoading === "google"
                ? "Google-এ নিয়ে যাওয়া হচ্ছে..."
                : "Google দিয়ে সাইন ইন করুন"}
            </button>

            <button
              type="button"
              disabled={loading || socialLoading !== ""}
              onClick={() => handleSocialSignIn("github")}
            >
              <span className="github-icon">●</span>
              {socialLoading === "github"
                ? "GitHub-এ নিয়ে যাওয়া হচ্ছে..."
                : "GitHub দিয়ে সাইন ইন করুন"}
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
