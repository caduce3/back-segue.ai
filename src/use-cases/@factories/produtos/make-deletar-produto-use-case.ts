import { PrismaProdutosRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { DeletarProdutoUseCase } from "@/use-cases/produtos/deletar-produto";

export function makeDeletarProdutoUseCase() {
  const produtosRepository = new PrismaProdutosRepository();
  const deletarProdutoUseCase = new DeletarProdutoUseCase(produtosRepository);

  return deletarProdutoUseCase;
}
