import { PegarUnicaFichaEquipeUseCase } from "@/use-cases/ficha-equipe/pegar-unica-ficha-equipe";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PrismaFichaEquipeRepository } from "@/repositories/prisma/prisma-ficha-equipe-repository";

export function makePegarUnicaFichaEquipeUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const fichaEquipeRepository = new PrismaFichaEquipeRepository();
  const pegarUnicaFichaEquipeUseCase = new PegarUnicaFichaEquipeUseCase(
    igrejaRepository,
    equipeDirigenteRepository,
    fichaEquipeRepository
  );

  return pegarUnicaFichaEquipeUseCase;
}
