import { Produtos } from "@prisma/client";
import { PrismaProdutosRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { ProdutoNaoExiste } from "../@errors/produto/erro-produto-nao-existe";
import { ErroAoAtualizarProduto } from "../@errors/produto/erro-atualizar-produto";
import { ProdutoJaExiste } from "../@errors/produto/erro-produto-ja-existe";

interface AtualizarProdutoRequest {
  id_produto: string;
  nome?: string;
  descricao?: string;
  preco?: number;
  quantidadeDisponivel?: number;
}

interface AtualizarProdutoResponse {
  produto: Produtos;
}

export class AtualizarProdutoUseCase {
  constructor(private produtoRepository: PrismaProdutosRepository) {}

  async execute({
    id_produto,
    nome,
    descricao,
    preco,
    quantidadeDisponivel,
  }: AtualizarProdutoRequest): Promise<AtualizarProdutoResponse> {
    const produto = await this.produtoRepository.findProdutoById(id_produto);
    if (!produto) throw new ProdutoNaoExiste();

    if (nome && nome !== produto.nome) {
      const produtoJaExiste =
        await this.produtoRepository.findProdutoByNome(nome);
      if (produtoJaExiste) throw new ProdutoJaExiste();
    }

    const atualizarProduto = await this.produtoRepository.atualizarProduto(
      id_produto,
      {
        nome,
        descricao,
        preco,
        quantidadeDisponivel,
      }
    );
    if (!atualizarProduto) throw new ErroAoAtualizarProduto();

    return {
      produto: atualizarProduto,
    };
  }
}
