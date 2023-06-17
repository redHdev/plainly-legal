import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// { log: ["query"] }; // Previously housed within PrismaClient();
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV != "production") globalForPrisma.prisma;
