import { PrismaClient } from '@prisma/client';

// following is only needed in development because of next.js hot loading after saving a file
// it prevents more then one instance of PrismaClient()
// globalThis is not effected by hot reloading
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

// in production you only need:
// export const db = new PrismaClient();
