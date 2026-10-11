// import { betterAuth } from "better-auth";
// import { nextCookies } from "better-auth/next-js";
// import Database from "better-sqlite3";

// export const auth = betterAuth({
//   database: new Database("./sqlite.db"),
//   emailAndPassword: {
//     enabled: true,
//     requireEmailVerification: false,
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//     },
//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID ?? "",
//       clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
//     },
//   },
//   plugins: [nextCookies()],
// });
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";

// On Vercel (serverless), SQLite can't persist — use in-memory storage
// Locally, use SQLite so users persist across restarts
const isVercel = process.env.VERCEL === "1";

export const auth = betterAuth({
  ...(isVercel ? {} : { database: new Database("./sqlite.db") }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github", "email-password"],
    },
  },
  plugins: [nextCookies()],
});
