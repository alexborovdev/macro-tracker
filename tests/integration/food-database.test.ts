// @vitest-environment node
import { execSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { PrismaClient } from "../../src/generated/prisma/client";
import { getPrisma } from "../../src/lib/db";

// Next.js resolves this import at its server/client boundary.
vi.mock("server-only", () => ({}));

const food = {
  name: "Plain yogurt",
  caloriesPer100g: 723,
  proteinPer100g: 123,
  fatPer100g: 0,
  carbsPer100g: 47,
};

let testDirectory: string | undefined;
let databaseUrl: string;
let db: ReturnType<typeof getPrisma> | undefined;

beforeAll(() => {
  const databaseDirectory = join(process.cwd(), "prisma", "data");
  mkdirSync(databaseDirectory, { recursive: true });
  testDirectory = mkdtempSync(join(databaseDirectory, "test-"));
  databaseUrl = `file:${join(testDirectory, "food.sqlite")}`;

  execSync("npm run db:migrate", {
    // Prisma's SQLite migration engine can fail with RUST_LOG=warn or error (prisma/orm#29355).
    env: { ...process.env, DATABASE_URL: databaseUrl, RUST_LOG: "info" },
    stdio: "inherit",
    timeout: 20_000,
  });

  vi.stubEnv("DATABASE_URL", databaseUrl);
  db = getPrisma();
}, 30_000);

afterAll(async () => {
  try {
    await db?.$disconnect();
  } finally {
    vi.unstubAllEnvs();
    if (testDirectory) {
      rmSync(testDirectory, { recursive: true, force: true });
    }
  }
});

describe("Food persistence", () => {
  it("creates and reads a food with exact integer tenths", async () => {
    const prisma = getPrisma();
    const created = await prisma.food.create({ data: food });
    const stored = await prisma.food.findUniqueOrThrow({ where: { id: created.id } });
    const [storage] = await prisma.$queryRaw<{ proteinType: string }[]>`
      SELECT typeof("proteinPer100g") AS "proteinType" FROM "Food" WHERE "id" = ${created.id}
    `;

    expect(stored).toEqual(created);
    expect(stored).toMatchObject(food);
    expect(storage).toEqual({ proteinType: "integer" });
    expect(stored.id).toBeTruthy();
    expect(stored.createdAt).toBeInstanceOf(Date);
    expect(stored.updatedAt).toBeInstanceOf(Date);
  });

  it("allows duplicate names and accepts both ends of the nutrition ranges", async () => {
    const prisma = getPrisma();
    const minimum = await prisma.food.create({
      data: { ...food, caloriesPer100g: 0, proteinPer100g: 0, fatPer100g: 0, carbsPer100g: 0 },
    });
    const maximum = await prisma.food.create({
      data: { ...food, caloriesPer100g: 10_000, proteinPer100g: 1_000, fatPer100g: 1_000, carbsPer100g: 1_000 },
    });

    expect(maximum.id).not.toBe(minimum.id);
    expect(maximum.name).toBe(minimum.name);
  });
});

const invalidFoodFields = [
  ["name", ""],
  ["name", " \t\u00a0"],
  ["name", " Plain yogurt"],
  ["name", "Plain yogurt\0"],
  ["name", "a".repeat(121)],
  ["caloriesPer100g", -1],
  ["caloriesPer100g", 10_001],
  ["caloriesPer100g", 1.5],
  ["proteinPer100g", -1],
  ["proteinPer100g", 1_001],
  ["proteinPer100g", 1.5],
  ["fatPer100g", -1],
  ["fatPer100g", 1_001],
  ["fatPer100g", 1.5],
  ["carbsPer100g", -1],
  ["carbsPer100g", 1_001],
  ["carbsPer100g", 1.5],
] as const;

it.each(invalidFoodFields)("rejects invalid %s (%s) at the database boundary", async (field, value) => {
  const invalidFood = { ...food, [field]: value };
  const prisma = getPrisma();

  await expect(
    prisma.$executeRaw`
      INSERT INTO "Food" (
        "id", "name", "caloriesPer100g", "proteinPer100g", "fatPer100g", "carbsPer100g", "updatedAt"
      )
      VALUES (
        'invalid-food', ${invalidFood.name}, ${invalidFood.caloriesPer100g},
        ${invalidFood.proteinPer100g}, ${invalidFood.fatPer100g}, ${invalidFood.carbsPer100g}, CURRENT_TIMESTAMP
      )
    `,
  ).rejects.toThrow(`Food_${field}_check`);
});

it("reads the stored food through a new client after closing the original connection", async () => {
  const prisma = getPrisma();
  const created = await prisma.food.create({ data: food });
  await prisma.$disconnect();

  const adapter = new PrismaBetterSqlite3({ url: databaseUrl, fileMustExist: true });
  const reopened = new PrismaClient({ adapter });
  try {
    expect(await reopened.food.findUniqueOrThrow({ where: { id: created.id } })).toEqual(created);
  } finally {
    await reopened.$disconnect();
  }
});
