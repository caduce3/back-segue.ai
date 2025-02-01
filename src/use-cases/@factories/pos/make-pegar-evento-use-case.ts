import { PrismaPosRepository } from "@/repositories/prisma/prisma-pos-repository";
import { PegarUnicoEventoUseCase } from "@/use-cases/pos/pegar-unico-evento";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makePegarUnicoEventoUseCase() {
  const eventoRepository = new PrismaPosRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const pegarUnicoEventoUseCase = new PegarUnicoEventoUseCase(
    eventoRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return pegarUnicoEventoUseCase;
}
