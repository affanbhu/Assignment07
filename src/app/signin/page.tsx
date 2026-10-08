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
  };

  return (
    <div className="signin-page">
      {/* Header */}
      <header className="signin-header">
        <div className="header-left">
          <div className="logo-box">ব</div>

          <div className="brand-info">
            <h2>বাজার দর</h2>
            <p>বাজারদর, ৬ অক্টোবর, ২০২৬</p>
          </div>
        </div>

        <div className="header-right">
          <Link href="/signin" className="signin-link">
            সাইন ইন
          </Link>

          <Link href="/signup" className="signup-button">
            সাইন আপ
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="main-nav">
        <Link href="/">হোম</Link>
        <Link href="/">দাম</Link>
        <Link href="/">বাজার</Link>
        <Link href="/">মাছ</Link>
        <Link href="/">মাংস</Link>
        <Link href="/">শাক-সবজি</Link>
        <Link href="/">মসলা</Link>
      </nav>

      {/* Price ticker */}
      <div className="price-ticker">
        <span>
          🥬 কাঁচা মরিচ <b>৪৮০ টাকা/কেজি</b> <small>▲ ৩.২%</small>
        </span>

        <span>
          🥔 আলু <b>৩৫ টাকা/কেজি</b> <small className="up">▲ ১.৫%</small>
        </span>

        <span>
          🍅 টমেটো <b>১২০ টাকা/কেজি</b> <small>▲ ২.৪%</small>
        </span>

        <span>
          🐟 রুই মাছ <b>৪৫০ টাকা/কেজি</b> <small>▲ ১.৮%</small>
        </span>

        <span>
          🐔 ব্রয়লার মুরগি <b>২১০ টাকা/কেজি</b> <small className="down">▼ ০.৮%</small>
        </span>
      </div>

      {/* Main */}
      <main className="signin-main">
        <h1>অ্যাকাউন্টে প্রবেশ করুন</h1>

        <p className="signin-subtitle">
          আপনার অ্যাকাউন্টে প্রবেশ করতে নিচের তথ্য দিন।
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

            {error && <p className="error-message">{error}</p>}

            {/* Sign in button */}
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? "প্রবেশ করা হচ্ছে..." : "অ্যাকাউন্টে প্রবেশ করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>অথবা</span>
          </div>

          {/* Social buttons */}
          <div className="social-buttons">
            <button
              type="button"
              onClick={() => alert("Google login এখনো সেটআপ করা হয়নি।")}
            >
              <span className="google-icon">G</span>
              Google দিয়ে সাইন ইন করুন
            </button>

            <button
              type="button"
              onClick={() => alert("GitHub login এখনো সেটআপ করা হয়নি।")}
            >
              <span className="github-icon">●</span>
              GitHub দিয়ে সাইন ইন করুন
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

      {/* Footer */}
      <footer className="signin-footer">
        <p>বাজার দর — প্রতিদিনের পণ্যের দাম এক নজরে।</p>
        <p>কোনো প্রশ্ন থাকলে, বাজার দর-এর সাথে যোগাযোগ করুন।</p>
      </footer>
    </div>
  );
}