CREATE TABLE "Food" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "caloriesPer100g" INTEGER NOT NULL,
    "proteinPer100g" INTEGER NOT NULL,
    "fatPer100g" INTEGER NOT NULL,
    "carbsPer100g" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Food_name_check" CHECK (
        length("name") BETWEEN 1 AND 120
        AND instr("name", char(0)) = 0
        -- SQLite's default trim only removes ASCII spaces. Match JavaScript trim.
        AND "name" = trim("name", char(
            9, 10, 11, 12, 13, 32, 160, 5760,
            8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202,
            8232, 8233, 8239, 8287, 12288, 65279
        ))
    ),
    CONSTRAINT "Food_caloriesPer100g_check" CHECK (
        typeof("caloriesPer100g") = 'integer' AND "caloriesPer100g" BETWEEN 0 AND 10000
    ),
    CONSTRAINT "Food_proteinPer100g_check" CHECK (
        typeof("proteinPer100g") = 'integer' AND "proteinPer100g" BETWEEN 0 AND 1000
    ),
    CONSTRAINT "Food_fatPer100g_check" CHECK (
        typeof("fatPer100g") = 'integer' AND "fatPer100g" BETWEEN 0 AND 1000
    ),
    CONSTRAINT "Food_carbsPer100g_check" CHECK (
        typeof("carbsPer100g") = 'integer' AND "carbsPer100g" BETWEEN 0 AND 1000
    )
);
