import NextAuth, { type DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import { NextResponse } from "next/server";
import { User } from "./types";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "./lib/server";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      // The type of extra info taken from your database and sent to front end from auth endpoint
      // See /pages/api/auth/[...nextauth].ts
      info: User;
    };
  }
}

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental,
} = NextAuth({
  secret: NEXTAUTH_SECRET,
  callbacks: {
    // Get extra user info from your database to pass to front-end
    // For front end, update next-auth.d.ts with session type
    async session({ session }: { session: any }) {
      const userInfo: User | null = await getUser(session.user.email);

      if (!userInfo) {
        throw new Error("User not found");
      }

      session.user.info = userInfo;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  // Configure one or more authentication providers
  // More info: https://next-auth.js.org/providers/
  providers: [
    // CredentialsProvider is used for the demo auth system
    // Replace this with a real provider, e.g. GitHub, Auth0
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const email: string = credentials.email as string;
        const user: User | null = await getUser(email);

        if (!user) {
          throw new Error("User not found");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.id,
          image: user.avatar,
        };
      },
    }),

    /*
    // Use GitHub authentication
    // import GithubProvider from "next-auth/providers/github";
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    */

    /*
    // Use Auth0 authentication
    // import Auth0Provider from "next-auth/providers/auth0";
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
    */

    // ...add more providers here
  ],
});
