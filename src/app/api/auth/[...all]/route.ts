
// import Database from "better-sqlite3";
// import { betterAuth } from "better-auth";

// const db = new Database("./auth.db");

// const socialProviders = {
//   ...(process.env.GOOGLE_CLIENT_ID &&
//   process.env.GOOGLE_CLIENT_SECRET
//     ? {
//         google: {
//           clientId: process.env.GOOGLE_CLIENT_ID,
//           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         },
//       }
//     : {}),
//   ...(process.env.GITHUB_CLIENT_ID &&
//   process.env.GITHUB_CLIENT_SECRET
//     ? {
//         github: {
//           clientId: process.env.GITHUB_CLIENT_ID,
//           clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         },
//       }
//     : {}),
// };

// export const auth = betterAuth({
//   baseURL: process.env.BETTER_AUTH_URL,
//   secret: process.env.BETTER_AUTH_SECRET,
//   database: db,

//   emailAndPassword: {
//     enabled: true,
//   },

//   socialProviders,
// });

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
