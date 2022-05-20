/*
  Warnings:

  - You are about to drop the column `content` on the `Media` table. All the data in the column will be lost.
  - Made the column `likeCount` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `endCoding` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "likeCount" SET NOT NULL;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "content",
ADD COLUMN     "endCoding" VARCHAR(50) NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ADD COLUMN     "url" VARCHAR(255) NOT NULL;
