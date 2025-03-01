import { PrismaPalestraRepository } from "@/repositories/prisma/prisma-palestra-repository";
import { CadastrarPalestraUseCase } from "@/use-cases/palestra/cadastrar-palestra";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makeCadastrarPalestraUseCase() {
  const palestraRepository = new PrismaPalestraRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const cadastrarPalestraUseCase = new CadastrarPalestraUseCase(
    palestraRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return cadastrarPalestraUseCase;
}
