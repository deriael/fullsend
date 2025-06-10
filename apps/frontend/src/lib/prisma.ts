import { PrismaClient } from '@prisma/client';

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