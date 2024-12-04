import { PegarFichasUseCase } from "@/use-cases/ficha/pegar-fichas";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PrismaFichaRepository } from "@/repositories/prisma/prisma-ficha-repository";

export function makePegarFichasUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const fichaRepository = new PrismaFichaRepository();
  const pegarFichasUseCase = new PegarFichasUseCase(
    igrejaRepository,
    equipeDirigenteRepository,
    fichaRepository
  );

  return pegarFichasUseCase;
}
