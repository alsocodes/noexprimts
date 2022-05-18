/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('admin', 'client');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT E'admin';

-- DropTable
DROP TABLE "Role";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "bridePhoto" VARCHAR(255) NOT NULL,
    "brideNickName" VARCHAR(20) NOT NULL,
    "brideFullName" VARCHAR(200) NOT NULL,
    "brideParent" VARCHAR(255) NOT NULL,
    "brideAddress" VARCHAR(500) NOT NULL,
    "groomPhoto" VARCHAR(255) NOT NULL,
    "groomNickName" VARCHAR(20) NOT NULL,
    "groomFullName" VARCHAR(200) NOT NULL,
    "groomParent" VARCHAR(255) NOT NULL,
    "groomAddress" VARCHAR(500) NOT NULL,
    "marriageDate" VARCHAR(9) NOT NULL,
    "marriageStartTime" VARCHAR(5) NOT NULL,
    "marriageEndTime" VARCHAR(5) NOT NULL,
    "marriageLocation" VARCHAR(255) NOT NULL,
    "marriageAddress" VARCHAR(500) NOT NULL,
    "receptionDate" VARCHAR(9) NOT NULL,
    "receptionStartTime" VARCHAR(5) NOT NULL,
    "receptionEndTime" VARCHAR(5) NOT NULL,
    "receptionLocation" VARCHAR(255) NOT NULL,
    "receptionAddress" VARCHAR(500) NOT NULL,
    "unduhmantuDate" VARCHAR(9),
    "unduhmantuStartTime" VARCHAR(5),
    "unduhmantuEndTime" VARCHAR(5),
    "unduhmantuLocation" VARCHAR(255),
    "unduhmantuAddress" VARCHAR(500),
    "gpsCoordinates" TEXT,
    "maxGuests" INTEGER DEFAULT 500,
    "maxPhoto" INTEGER DEFAULT 10,
    "maxVideo" INTEGER DEFAULT 1,
    "hasGuestBook" BOOLEAN DEFAULT true,
    "hasPresent" BOOLEAN DEFAULT true,
    "liveUntil" VARCHAR(9),
    "hasCountdown" BOOLEAN DEFAULT true,
    "hasStories" BOOLEAN DEFAULT true,
    "hasQuotes" BOOLEAN DEFAULT true,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
