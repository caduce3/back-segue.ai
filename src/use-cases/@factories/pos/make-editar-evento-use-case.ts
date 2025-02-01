import { PrismaPosRepository } from "@/repositories/prisma/prisma-pos-repository";
import { AtualizarEventoUseCase } from "@/use-cases/pos/atualizar-evento";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makeAtualizarEventoUseCase() {
  const eventoRepository = new PrismaPosRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const atualizarEventoUseCase = new AtualizarEventoUseCase(
    eventoRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return atualizarEventoUseCase;
}
