import { PrismaPalestraRepository } from "@/repositories/prisma/prisma-palestra-repository";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PegarUnicaPalestraUseCase } from "@/use-cases/palestra/pegar-unica-palestra";
export function makePegarUnicoPalestraUseCase() {
  const palestraRepository = new PrismaPalestraRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const pegarUnicoPalestraUseCase = new PegarUnicaPalestraUseCase(
    palestraRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return pegarUnicoPalestraUseCase;
}
