import { PrismaPosRepository } from "@/repositories/prisma/prisma-pos-repository";
import { PegarEventosUseCase } from "@/use-cases/pos/pegar-eventos";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makePegarEventosUseCase() {
  const eventoRepository = new PrismaPosRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const pegarEventosUseCase = new PegarEventosUseCase(
    eventoRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return pegarEventosUseCase;
}
