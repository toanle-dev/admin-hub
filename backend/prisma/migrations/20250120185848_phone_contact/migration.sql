-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeliveryAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phoneContact" TEXT NOT NULL DEFAULT '',
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_DeliveryAddress" ("city", "complement", "country", "createdAt", "id", "number", "postalCode", "state", "street", "updatedAt") SELECT "city", "complement", "country", "createdAt", "id", "number", "postalCode", "state", "street", "updatedAt" FROM "DeliveryAddress";
DROP TABLE "DeliveryAddress";
ALTER TABLE "new_DeliveryAddress" RENAME TO "DeliveryAddress";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
