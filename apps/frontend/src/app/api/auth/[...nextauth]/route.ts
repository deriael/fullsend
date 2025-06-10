// file: apps/frontend/src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// We need to use the Prisma client from our backend
const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // We are only setting up the "Credentials" provider for now (email/password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // This is the logic that runs when a user tries to log in
      async authorize(credentials) {
        // 1. Ensure credentials object is valid
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // 2. Find the user in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // 3. Ensure user exists and has a password set
        if (!user || !user.password) {
          return null;
        }

        // 4. Compare the passwords
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // 5. If passwords match, return the user object to sign them in
        if (isPasswordCorrect) {
          return user;
        }

        // 6. If passwords don't match, return null
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET, // Your secret key
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
