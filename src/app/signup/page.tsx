
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import "./signup.css";

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

  const isBusy = loading || socialLoading !== "";

  return (
    <main className="signup-page">
      <header className="signup-heading">
        <h1>অ্যাকাউন্ট তৈরি করুন</h1>
        <p>বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন</p>
      </header>

      <section className="signup-card">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-field">
            <label htmlFor="name">নাম</label>
            <input
              id="name"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
              disabled={isBusy}
            />
          </div>

          <div className="signup-field">
            <label htmlFor="email">ইমেইল</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              disabled={isBusy}
            />
          </div>

          <div className="signup-field">
            <label htmlFor="password">পাসওয়ার্ড</label>
            <input
              id="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
              disabled={isBusy}
            />
          </div>

          <div className="signup-field">
            <label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="আবার লিখুন"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              required
              disabled={isBusy}
            />
          </div>

          <button
            type="submit"
            className="signup-submit"
            disabled={isBusy}
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="signup-divider">
          <span>অথবা</span>
        </div>

        <div className="signup-socials">
          <button
            type="button"
            disabled={isBusy}
            onClick={() => handleSocialSignUp("google")}
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
                ? "Google খুলছে..."
                : "Google দিয়ে চালিয়ে যান"}
            </span>
          </button>

          <button
            type="button"
            disabled={isBusy}
            onClick={() => handleSocialSignUp("github")}
          >
            <svg
              className="github-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.83 1.96 3.25 1.96.78 0 1.4-.3 1.88-.78.08-.6.31-1.02.57-1.26-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.15a10.7 10.7 0 0 1 5.57 0c2.12-1.45 3.06-1.15 3.06-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.6 5.24-5.09 5.52.32.28.6.82.6 1.65v2.45c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
            </svg>

            <span>
              {socialLoading === "github"
                ? "GitHub খুলছে..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </span>
          </button>
        </div>

        <p className="signup-account">
          অ্যাকাউন্ট আছে? <Link href="/signin">সাইন ইন করুন</Link>
        </p>
      </section>

      <Link href="/" className="signup-back">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
