/*
  Warnings:

  - Made the column `emailPrincipal` on table `Ficha` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ficha" ALTER COLUMN "emailPrincipal" SET NOT NULL;
