/*
  Warnings:

  - You are about to alter the column `name` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `type` on the `Media` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name` on the `UserInfo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `nickname` on the `UserInfo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `bio` on the `UserInfo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `website` on the `UserInfo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Media" ALTER COLUMN "type" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "UserInfo" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "nickname" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "bio" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "website" SET DATA TYPE VARCHAR(100);
