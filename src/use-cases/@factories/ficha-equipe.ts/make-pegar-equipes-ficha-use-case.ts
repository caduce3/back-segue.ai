import { PegarEquipesFichaUseCase } from "@/use-cases/ficha-equipe/pegar-equipes-ficha";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PrismaFichaEquipeRepository } from "@/repositories/prisma/prisma-ficha-equipe-repository";

export function makePegarEquipesFichaUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const fichaEquipeRepository = new PrismaFichaEquipeRepository();
  const pegarEquipesFichaUseCase = new PegarEquipesFichaUseCase(
    igrejaRepository,
    equipeDirigenteRepository,
    fichaEquipeRepository
  );

  return pegarEquipesFichaUseCase;
}
