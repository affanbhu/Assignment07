
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import "./profile.css";

export default function ProfilePage() {
  const router = useRouter();
  const redirectToastShown = useRef(false);
  const { data: session, isPending } = authClient.useSession();

  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session && !redirectToastShown.current) {
      redirectToastShown.current = true;
      toast.error("প্রোফাইল দেখতে আগে সাইন ইন করুন।");
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "সাইন আউট করা যায়নি।");
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
      <main className="profile-loading">
        <p>প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="profile-page">
      <div className="profile-container">
        <header className="profile-heading">
          <h1>আমার প্রোফাইল</h1>
          <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </header>

        <section className="profile-user-card">
          <div className="profile-avatar">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt="প্রোফাইল ছবি" />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

          <div className="profile-user-details">
            <h2>{user.name || "আপনার নাম"}</h2>
            <p>{user.email}</p>
          </div>

          <button
            type="button"
            className="profile-signout"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            <span aria-hidden="true">↪</span>
            {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </section>

        <section className="profile-details-card">
          <h2>তথ্য</h2>

          <div className="profile-information">
            <div className="profile-field">
              <label>নাম</label>
              <p className="profile-value">
                {user.name || "আপনার নাম"}
              </p>
            </div>

            <div className="profile-field">
              <label>ইমেইল</label>
              <p className="profile-value">{user.email}</p>
            </div>

            <Link
              href="/profile/update"
              className="profile-update-button profile-update-link"
            >
              Update Information
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
