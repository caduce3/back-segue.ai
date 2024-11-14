import { ClientesRepository } from "@/repositories/cliente-repository";
import { EnderecoClienteNaoExiste } from "../@errors/cliente/endereco-cliente-nao-existe";
import { ErroAoDeletarEnderecoCliente } from "../@errors/cliente/error-deletar-endereco-cliente";
import { ProdutoRepository } from "@/repositories/igreja-repository";
import { ProdutoNaoExiste } from "../@errors/produto/erro-produto-nao-existe";
import { ErroDeletarProduto } from "../@errors/produto/erro-deletar-produto";

interface DeletarProdutoRequest {
  id_produto: string;
}

interface DeletarProdutoResponse {
  boolean: boolean;
}

export class DeletarProdutoUseCase {
  constructor(private produtosRepository: ProdutoRepository) {}

  async execute({
    id_produto,
  }: DeletarProdutoRequest): Promise<DeletarProdutoResponse> {
    const produtoExiste =
      await this.produtosRepository.findProdutoById(id_produto);
    if (!produtoExiste) throw new ProdutoNaoExiste();

    const deletarProduto =
      await this.produtosRepository.deletarProduto(id_produto);
    if (!deletarProduto) throw new ErroDeletarProduto();

    return {
      boolean: true,
    };
  }
}
