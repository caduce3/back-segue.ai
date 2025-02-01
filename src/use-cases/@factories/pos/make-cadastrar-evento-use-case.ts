import { PrismaPosRepository } from "@/repositories/prisma/prisma-pos-repository";
import { CadastrarEventoUseCase } from "@/use-cases/pos/cadastrar-evento";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makeCadastrarEventoUseCase() {
  const eventoRepository = new PrismaPosRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const cadastrarEventoUseCase = new CadastrarEventoUseCase(
    eventoRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return cadastrarEventoUseCase;
}
