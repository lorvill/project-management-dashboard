CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- AlterTable
ALTER TABLE "accounts"
ADD COLUMN "password" TEXT;

INSERT INTO "accounts" (
    "id",
    "type",
    "provider",
    "provider_account_id",
    "password",
    "created_at",
    "updated_at",
    "user_id"
)
SELECT
    gen_random_uuid(),
    'credentials',
    'credentials',
    "email",
    "password",
    NOW(),
    NOW(),
    "id"
FROM "User"
WHERE "method" = 'CREDENTIALS'
    AND "password" IS NOT NULL
    AND "password" != ''
ON CONFLICT ("provider", "provider_account_id")
DO UPDATE SET
    "password" = EXCLUDED."password",
    "updated_at" = NOW();