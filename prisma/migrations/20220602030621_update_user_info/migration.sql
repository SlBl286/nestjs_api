-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "folower" INTEGER[],
ADD COLUMN     "folowing" INTEGER[],
ADD COLUMN     "gender" INTEGER,
ADD COLUMN     "phone" VARCHAR(20);
