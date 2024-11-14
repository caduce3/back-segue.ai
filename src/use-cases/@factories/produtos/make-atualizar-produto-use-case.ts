import { PrismaProdutosRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { AtualizarProdutoUseCase } from "@/use-cases/produtos/atualizar-produto";

export function makeAtualizarProdutoUseCase() {
  const produtosRepository = new PrismaProdutosRepository();
  const atualizarProdutoUseCase = new AtualizarProdutoUseCase(
    produtosRepository
  );

  return atualizarProdutoUseCase;
}
