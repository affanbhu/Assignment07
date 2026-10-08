
import Database from "better-sqlite3";
import { betterAuth } from "better-auth";

const db = new Database("auth.db");

export const auth = betterAuth({
  database: db,

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});