import { PrismaPosRepository } from "@/repositories/prisma/prisma-pos-repository";
import { DeletarEventoUseCase } from "@/use-cases/pos/deletar-evento";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makeDeletarEventoUseCase() {
  const eventoRepository = new PrismaPosRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const deletarEventoUseCase = new DeletarEventoUseCase(
    eventoRepository,
    equipeDirigenteRepository
  );

  return deletarEventoUseCase;
}
