import { CadastrarFichaEquipeUseCase } from "@/use-cases/ficha-equipe/cadastrar-ficha-equipe";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PrismaFichaRepository } from "@/repositories/prisma/prisma-ficha-repository";
import { PrismaFichaEquipeRepository } from "@/repositories/prisma/prisma-ficha-equipe-repository";

export function makeCadastrarFichaEquipeUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const fichaRepository = new PrismaFichaRepository();
  const fichaEquipeRepository = new PrismaFichaEquipeRepository();
  const cadastrarFichaEquipeUseCase = new CadastrarFichaEquipeUseCase(
    fichaEquipeRepository,
    fichaRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return cadastrarFichaEquipeUseCase;
}
