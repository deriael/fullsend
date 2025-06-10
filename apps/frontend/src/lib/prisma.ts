import { PrismaClient } from '@prisma/client';
import { join } from 'path';

if (!process.env.DATABASE_URL) {
  // Fallback to the local SQLite database used by the backend
  process.env.DATABASE_URL = `file:${join(process.cwd(), '../backend/prisma/dev.db')}`;
}

// This prevents multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // Optional: logs database queries to the console
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}