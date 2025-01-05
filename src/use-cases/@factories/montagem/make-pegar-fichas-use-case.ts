import { PegarFichasMontagemUseCase } from "@/use-cases/montagem/pegar-fichas-montagem";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PrismaFichaRepository } from "@/repositories/prisma/prisma-ficha-repository";

export function makePegarFichasMontagemUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const fichaRepository = new PrismaFichaRepository();
  const pegarFichasMontagemUseCase = new PegarFichasMontagemUseCase(
    igrejaRepository,
    equipeDirigenteRepository,
    fichaRepository
  );

  return pegarFichasMontagemUseCase;
}
