import { Produtos } from "@prisma/client";
import { ErroAoCarregarPagina } from "../@errors/erro-carregar-pagina";
import { ProdutoRepository } from "@/repositories/igreja-repository";
import { ErroAoCarregarProdutos } from "../@errors/produto/erro-carregar-produtos";

interface pegarProdutosUseCaseRequest {
  page: number;
  nome?: string;
  descricao?: string;
  preco?: number;
  quantidadeDisponivel?: number;
}

interface pegarProdutosUseCaseResponse {
  produtosList: Produtos[];
  totalItens: number;
  totalPages: number;
  currentPage: number;
}

export class PegarProdutosUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    page,
    nome,
    descricao,
    preco,
    quantidadeDisponivel,
  }: pegarProdutosUseCaseRequest): Promise<pegarProdutosUseCaseResponse> {
    if (page <= 0) page = 1;

    const take = 10;
    const { produtos, totalCount } = await this.produtoRepository.pegarProdutos(
      take,
      page,
      nome,
      descricao,
      preco,
      quantidadeDisponivel
    );

    if (!produtos || produtos.length === 0) {
      return {
        produtosList: [],
        totalItens: 0,
        totalPages: 0,
        currentPage: page,
      };
    }

    const totalPages = Math.ceil(totalCount / take);
    if (totalPages === 0) throw new ErroAoCarregarProdutos();
    if (page > totalPages) throw new ErroAoCarregarPagina();

    return {
      produtosList: produtos,
      totalItens: totalCount,
      totalPages,
      currentPage: page,
    };
  }
}
