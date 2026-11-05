import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { getAuthDatabase, getMongoClient } from "./mongodb";

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
const issuer = process.env.JWT_ISSUER ?? baseURL;

export const auth = betterAuth({
  appName: "Shohojog",
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL,
  database: mongodbAdapter(getAuthDatabase(), { client: getMongoClient() }),
  trustedOrigins: [baseURL, "http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  plugins: [
    jwt({
      jwt: {
        issuer,
        audience: issuer,
        expirationTime: "24h",
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }),
      },
    }),
  ],
});
