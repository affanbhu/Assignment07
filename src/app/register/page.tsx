
// "use client";

// import { useState } from "react";
// import "./register.css";

// export default function RegisterPage() {
//   const [message, setMessage] = useState("");

//   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const form = event.currentTarget;
//     const data = new FormData(form);
//     const password = data.get("password");
//     const confirmPassword = data.get("confirmPassword");

//     if (password !== confirmPassword) {
//       setMessage("পাসওয়ার্ড দুটি মিলছে না।");
//       return;
//     }

//     setMessage("রেজিস্ট্রেশন সম্পন্ন করতে অথেনটিকেশন সিস্টেম সংযুক্ত করতে হবে।");
//   }

//   return (
//     <main className="register-page">
//       <section className="register-content">
//         <header className="register-heading">
//           <h1>অ্যাকাউন্ট তৈরি করুন</h1>
//           <p>
//             নিজস্ব অ্যাকাউন্ট তৈরি করুন এবং বাজারদরের আপডেট পান
//           </p>
//         </header>

//         <div className="register-card">
//           <form onSubmit={handleSubmit}>
//             <div className="register-field">
//               <label htmlFor="name">নাম</label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 placeholder="আপনার সম্পূর্ণ নাম"
//                 autoComplete="name"
//                 required
//               />
//             </div>

//             <div className="register-field">
//               <label htmlFor="email">ইমেইল</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 autoComplete="email"
//                 required
//               />
//             </div>

//             <div className="register-field">
//               <label htmlFor="password">পাসওয়ার্ড</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="পাসওয়ার্ড দিন"
//                 autoComplete="new-password"
//                 minLength={8}
//                 required
//               />
//             </div>

//             <div className="register-field">
//               <label htmlFor="confirmPassword">
//                 পাসওয়ার্ড নিশ্চিত করুন
//               </label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 placeholder="আবার লিখুন"
//                 autoComplete="new-password"
//                 minLength={8}
//                 required
//               />
//             </div>

//             <button className="register-submit" type="submit">
//               অ্যাকাউন্ট তৈরি করুন
//             </button>

//             {message && (
//               <p className="register-message" role="status">
//                 {message}
//               </p>
//             )}
//           </form>

//           <div className="register-divider">
//             <span>অথবা</span>
//           </div>

//           <div className="social-register">
//             <button
//               className="social-button"
//               type="button"
//               onClick={() =>
//                 setMessage("Google sign-in এখনো সংযুক্ত করা হয়নি।")
//               }
//             >
//               <span className="google-mark" aria-hidden="true">G</span>
//               Google দিয়ে রেজিস্ট্রেশন
//             </button>

//             <button
//               className="social-button"
//               type="button"
//               onClick={() =>
//                 setMessage("GitHub sign-in এখনো সংযুক্ত করা হয়নি।")
//               }
//             >
//               <svg
//                 width="13"
//                 height="13"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.28-2.61 5.22-5.1 5.5.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
//               </svg>
//               GitHub দিয়ে রেজিস্ট্রেশন
//             </button>
//           </div>

//           <p className="register-login">
//             ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
//             <a href="/login">লগইন করুন</a>
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// } "use client";
"use client";

import { useState } from "react";
import "./register.css";

export default function RegisterPage() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const password = data.get("password")?.toString();
    const confirmPassword = data.get("confirmPassword")?.toString();

    if (!name || !email || !password || !confirmPassword) {
      setMessage("সব তথ্য সঠিকভাবে পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      setMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    setMessage(
      "রেজিস্ট্রেশন সম্পন্ন করতে অথেনটিকেশন সিস্টেম সংযুক্ত করতে হবে।"
    );
  }

  return (
    <main className="register-page">
      <section className="register-content">
        <header className="register-heading">
          <h1>অ্যাকাউন্ট তৈরি করুন</h1>
          <p>
            নিজস্ব অ্যাকাউন্ট তৈরি করুন এবং বাজারদরের আপডেট পান
          </p>
        </header>

        <div className="register-card">
          <form onSubmit={handleSubmit}>
            <div className="register-field">
              <label htmlFor="name">নাম</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="আপনার সম্পূর্ণ নাম"
                autoComplete="name"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="email">ইমেইল</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="password">পাসওয়ার্ড</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="পাসওয়ার্ড দিন"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="confirmPassword">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="আবার লিখুন"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <button className="register-submit" type="submit">
              অ্যাকাউন্ট তৈরি করুন
            </button>

            {message && (
              <p className="register-message" role="status">
                {message}
              </p>
            )}
          </form>

          <div className="register-divider">
            <span>অথবা</span>
          </div>

          <div className="social-register">
            <button
              className="social-button"
              type="button"
              onClick={() =>
                setMessage("Google sign-in এখনো সংযুক্ত করা হয়নি।")
              }
            >
              <span className="google-mark" aria-hidden="true">
                G
              </span>
              Google দিয়ে রেজিস্ট্রেশন
            </button>

            <button
              className="social-button"
              type="button"
              onClick={() =>
                setMessage("GitHub sign-in এখনো সংযুক্ত করা হয়নি।")
              }
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.28-2.61 5.22-5.1 5.5.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              GitHub দিয়ে রেজিস্ট্রেশন
            </button>
          </div>

          <p className="register-login">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <a href="/login">লগইন করুন</a>
          </p>
        </div>
      </section>
    </main>
  );
}