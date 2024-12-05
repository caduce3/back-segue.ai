import { DeletarFichaEquipeUseCase } from "@/use-cases/ficha-equipe/deletar-ficha-equipe";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PrismaFichaEquipeRepository } from "@/repositories/prisma/prisma-ficha-equipe-repository";

export function makeDeletarFichaEquipeUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const fichaEquipeRepository = new PrismaFichaEquipeRepository();
  const deletarFichaEquipeUseCase = new DeletarFichaEquipeUseCase(
    equipeDirigenteRepository,
    igrejaRepository,
    fichaEquipeRepository
  );

  return deletarFichaEquipeUseCase;
}
