
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import "./signin.css";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়");
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      {/* Header */}
      

      {/* Main */}
      <main className="signin-main">
        <h1>সাইন ইন</h1>

        <p className="signin-subtitle">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <div className="signin-card">
          <form onSubmit={handleSignIn}>
            {/* Email */}
            <label htmlFor="email">ইমেইল</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <label htmlFor="password">পাসওয়ার্ড</label>

            <input
              id="password"
              type="password"
              placeholder="আপনার পাসওয়ার্ড"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Sign In Button */}
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? "প্রবেশ করা হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>অথবা</span>
          </div>

          {/* Social Buttons */}
          <div className="social-buttons">
            <button
              type="button"
              onClick={() =>
                alert("Google login এখনো সেটআপ করা হয়নি।")
              }
            >
              <span className="google-icon">G</span>
              Google দিয়ে সাইন ইন করুন
            </button>

            <button
              type="button"
              onClick={() =>
                alert("GitHub login এখনো সেটআপ করা হয়নি।")
              }
            >
              <span className="github-icon">●</span>
              GitHub দিয়ে সাইন ইন করুন
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="signup-text">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup">সাইন আপ করুন</Link>
          </p>
        </div>

        {/* Back to Home */}
        <p className="back-home">
          ← <Link href="/">হোম পেজে ফিরে যান</Link>
        </p>
      </main>
    </div>
  );
}