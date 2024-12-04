import { AtualizarFichaUseCase } from "@/use-cases/ficha/atualizar-ficha";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PrismaFichaRepository } from "@/repositories/prisma/prisma-ficha-repository";

export function makeAtualizarFichaUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const fichaRepository = new PrismaFichaRepository();
  const atualizarFichaUseCase = new AtualizarFichaUseCase(
    fichaRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return atualizarFichaUseCase;
}
