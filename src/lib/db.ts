import "server-only";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

let prisma: PrismaClient | undefined;

export function getPrisma(): PrismaClient {
  if (prisma) {
    return prisma;
  }

  const url = process.env.DATABASE_URL;
  if (!url || !url.startsWith("file:") || url.length === "file:".length) {
    throw new Error("Set DATABASE_URL to a SQLite file URL before using the database.");
  }

  const adapter = new PrismaBetterSqlite3({ url, fileMustExist: true });
  prisma = new PrismaClient({ adapter });
  return prisma;
}
