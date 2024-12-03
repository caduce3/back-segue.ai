import { DeletarFichaUseCase } from "@/use-cases/ficha/deletar-ficha";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PrismaFichaRepository } from "@/repositories/prisma/prisma-ficha-repository";
import { PrismaFichaEquipeRepository } from "@/repositories/prisma/prisma-ficha-equipe-repository";

export function makeDeletarFichaUseCase() {
  const fichaEquipeRepository = new PrismaFichaEquipeRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const fichaRepository = new PrismaFichaRepository();
  const deletarFichaUseCase = new DeletarFichaUseCase(
    fichaRepository,
    equipeDirigenteRepository,
    fichaEquipeRepository
  );

  return deletarFichaUseCase;
}
