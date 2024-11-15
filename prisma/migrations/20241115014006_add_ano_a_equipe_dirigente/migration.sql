/*
  Warnings:

  - Added the required column `ano` to the `EquipeDirigente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EquipeDirigente" ADD COLUMN     "ano" TEXT NOT NULL;
