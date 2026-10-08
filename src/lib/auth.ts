import Database from "better-sqlite3";
import { betterAuth } from "better-auth";

const db = new Database("auth.db");

export const auth = betterAuth({
  database: db,

  emailAndPassword: {
    enabled: true,
  },
});