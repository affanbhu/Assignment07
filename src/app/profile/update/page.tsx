
"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import "../profile.css";
import "./update.css";

export default function UpdateProfilePage() {
  const router = useRouter();
  const redirectToastShown = useRef(false);

  const { data: session, isPending, refetch } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session && !redirectToastShown.current) {
      redirectToastShown.current = true;
      toast.error("প্রোফাইল আপডেট করতে আগে সাইন ইন করুন।");
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
        toast.error(
          result.error.message || "নাম আপডেট করা যায়নি।"
        );
        return;
      }

      await refetch();

      toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে।");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="profile-loading">
        <p>পেজ লোড হচ্ছে...</p>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-container">
        <header className="profile-heading">
          <h1>Update Information</h1>
          <p>আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।</p>
        </header>

        <section className="profile-details-card update-information-card">
          <h2>আপনার তথ্য</h2>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-field">
              <label htmlFor="update-name">Name</label>

              <input
                id="update-name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
                maxLength={100}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="profile-update-button"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Information"}
            </button>

            <Link href="/profile" className="update-cancel-link">
              Back to My Profile
            </Link>
          </form>
        </section>
      </div>
    </main>
  );
}
