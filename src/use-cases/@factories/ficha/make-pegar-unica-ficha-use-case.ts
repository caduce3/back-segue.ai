import { PegarUnicaFichaUseCase } from "@/use-cases/ficha/pegar-unica-ficha";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PrismaFichaRepository } from "@/repositories/prisma/prisma-ficha-repository";

export function makePegarUnicaFichaUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const fichaRepository = new PrismaFichaRepository();
  const pegarUnicaFichaUseCase = new PegarUnicaFichaUseCase(
    igrejaRepository,
    equipeDirigenteRepository,
    fichaRepository
  );

  return pegarUnicaFichaUseCase;
}
