import { AtualizarFichaEquipeUseCase } from "@/use-cases/ficha-equipe/atualizar-ficha-equipe";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PrismaFichaRepository } from "@/repositories/prisma/prisma-ficha-repository";
import { PrismaFichaEquipeRepository } from "@/repositories/prisma/prisma-ficha-equipe-repository";

export function makeAtualizarFichaEquipeUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const fichaRepository = new PrismaFichaRepository();
  const fichaEquipeRepository = new PrismaFichaEquipeRepository();
  const atualizarFichaEquipeUseCase = new AtualizarFichaEquipeUseCase(
    fichaEquipeRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return atualizarFichaEquipeUseCase;
}
