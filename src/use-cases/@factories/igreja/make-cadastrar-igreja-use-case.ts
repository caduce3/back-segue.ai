import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { CadastrarIgrejaUseCase } from "@/use-cases/igreja/cadastrar-igreja";

export function makeCadastrarIgrejaUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const cadastrarIgrejaUseCase = new CadastrarIgrejaUseCase(igrejaRepository);

  return cadastrarIgrejaUseCase;
}
