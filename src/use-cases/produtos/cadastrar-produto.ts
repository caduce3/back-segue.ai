import { Produtos } from "@prisma/client";
import { ProdutoRepository } from "@/repositories/igreja-repository";
import { ProdutoJaExiste } from "../@errors/produto/erro-produto-ja-existe";
import { ErroCadastrarProduto } from "../@errors/produto/erro-cadastrar-produto";

interface CadastrarProdutoRequest {
  nome: string;
  descricao: string;
  preco: number;
  quantidadeDisponivel: number;
}

interface CadastrarProdutoResponse {
  produto: Produtos;
}

export class CadastrarProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    nome,
    descricao,
    preco,
    quantidadeDisponivel,
  }: CadastrarProdutoRequest): Promise<CadastrarProdutoResponse> {
    //verificar se o produto já existe pelo nome
    const produtoJaExiste =
      await this.produtoRepository.findProdutoByNome(nome);
    if (produtoJaExiste) throw new ProdutoJaExiste();

    const criarProduto = await this.produtoRepository.cadastrarProduto({
      nome,
      descricao,
      preco,
      quantidadeDisponivel,
    });

    if (!criarProduto) throw new ErroCadastrarProduto();

    return {
      produto: criarProduto,
    };
  }
}
