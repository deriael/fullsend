// file: apps/frontend/src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// We are not using a separate type for authOptions to avoid import errors.
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // If there are no credentials, immediately stop.
        if (!credentials) {
          return null;
        }

        // THE FIX: We will now be extremely direct.
        // We are telling TypeScript to trust us that these values are strings.
        // This 'as string' assertion is a forceful way to override the incorrect type inference.
        const email = credentials.email as string;
        const password = credentials.password as string;

        // Now we can safely check if the strings are empty or null.
        if (!email || !password) {
          return null;
        }

        // Find the user in the database.
        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user || !user.password) {
          return null;
        }

        // Compare the passwords.
        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.password
        );

        if (isPasswordCorrect) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };