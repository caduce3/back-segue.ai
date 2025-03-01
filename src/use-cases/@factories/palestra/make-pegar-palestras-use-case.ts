import { PrismaPalestraRepository } from "@/repositories/prisma/prisma-palestra-repository";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PegarPalestrasUseCase } from "@/use-cases/palestra/pegar-palestras";

export function makePegarPalestrasUseCase() {
  const palestraRepository = new PrismaPalestraRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const pegarPalestrasUseCase = new PegarPalestrasUseCase(
    palestraRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return pegarPalestrasUseCase;
}
