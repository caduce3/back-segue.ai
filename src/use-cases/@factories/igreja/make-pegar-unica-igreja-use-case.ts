import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PegarUnicaIgrejaUseCase } from "@/use-cases/igreja/pegar-unica-igreja";

export function makePegarUnicaIgrejaUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const pegarUnicaIgrejaUseCase = new PegarUnicaIgrejaUseCase(igrejaRepository);

  return pegarUnicaIgrejaUseCase;
}
