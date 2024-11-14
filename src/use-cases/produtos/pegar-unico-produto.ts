import { Produtos } from "@prisma/client";
import { ProdutoRepository } from "@/repositories/igreja-repository";
import { ProdutoNaoExiste } from "../@errors/produto/erro-produto-nao-existe";

interface pegarUnicoProdutoUseCaseRequest {
  id: string;
}

interface pegarUnicoProdutoUseCaseResponse {
  produto: Produtos;
}

export class PegarUnicoProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    id,
  }: pegarUnicoProdutoUseCaseRequest): Promise<pegarUnicoProdutoUseCaseResponse> {
    const produto = await this.produtoRepository.pegarUnicoProduto(id);
    if (!produto) throw new ProdutoNaoExiste();

    return {
      produto,
    };
  }
}
