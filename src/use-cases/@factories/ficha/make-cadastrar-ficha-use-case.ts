import { CadastrarFichaUseCase } from "@/use-cases/ficha/cadastrar-ficha";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PrismaFichaRepository } from "@/repositories/prisma/prisma-ficha-repository";

export function makeCadastrarFichaUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const fichaRepository = new PrismaFichaRepository();
  const cadastrarFichaUseCase = new CadastrarFichaUseCase(
    fichaRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return cadastrarFichaUseCase;
}
