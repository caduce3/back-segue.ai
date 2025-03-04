import { PrismaPosRepository } from "@/repositories/prisma/prisma-pos-repository";
import { GetEventosByYearsUseCase } from "@/use-cases/pos/get-eventos-by-year";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makeGetEventosByYearsUseCase() {
  const eventoRepository = new PrismaPosRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const getEventosByYearsUseCase = new GetEventosByYearsUseCase(
    eventoRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return getEventosByYearsUseCase;
}
