import { ErroAoCriarCarrinho } from "@/use-cases/@errors/carrinho/erro-criar-carrinho";
import { ClienteNaoExiste } from "@/use-cases/@errors/cliente/cliente-nao-existe";
import { FuncionarioNaoExiste } from "@/use-cases/@errors/funcionario/funcionario-nao-existe copy";
import { ErroAoCriarItemCarrinho } from "@/use-cases/@errors/item-carrinho/erro-criar-item-carrinho";
import { ErroQuantidadeProdutoIndisponivel } from "@/use-cases/@errors/item-carrinho/erro-qtd-produtot";
import { ProdutoNaoExiste } from "@/use-cases/@errors/produto/erro-produto-nao-existe";
import { makeAtualizarCarrinhoUseCase } from "@/use-cases/@factories/carrinho/make-atualizar-carrinho-use-case";
import { makeCadastrarCarrinhoUseCase } from "@/use-cases/@factories/carrinho/make-cadastrar-carrinho-use-case";
import { makeCadastrarItemCarrinhoUseCase } from "@/use-cases/@factories/item-carrinho/make-cadastrar-item-carrinho-use-case";
import { makePegarUnicoProdutoUseCase } from "@/use-cases/@factories/produtos/make-pegar-unico-produto-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function cadastrarVenda(request: FastifyRequest, reply: FastifyReply) {
    const cadastrarVendaBodySchema = z.object({
        clienteId: z.string(),
        funcionarioId: z.string(),
        tipoPagamento: z.enum(["CREDITO", "DEBITO", "DINHEIRO"]),
        desconto: z.number().min(0),
        itens: z.array(z.object({
            produtoId: z.string(),
            unidadesProduto: z.number().min(1),
        }))
    });

    const { clienteId, funcionarioId, desconto, tipoPagamento, itens } = cadastrarVendaBodySchema.parse(request.body);

    try {
        const cadastrarCarrinhoUseCase = makeCadastrarCarrinhoUseCase();
        const cadastrarItemCarrinhoUseCase = makeCadastrarItemCarrinhoUseCase();
        const atualizarCarrinho = makeAtualizarCarrinhoUseCase();
        const pegarProduto = makePegarUnicoProdutoUseCase();

        //preciso verificar se todos os itens tem produto disponivel antes de criar o carrinho
        for (const item of itens) {
            const produto = await pegarProduto.execute({
                id: item.produtoId
            });

            if (produto.produto.quantidadeDisponivel < item.unidadesProduto) {
                throw new ErroQuantidadeProdutoIndisponivel(produto.produto.quantidadeDisponivel, produto.produto.nome);
            }
        }

        // Criar o carrinho inicialmente com subtotal 0
        const { carrinho } = await cadastrarCarrinhoUseCase.execute({
            clienteId,
            funcionarioId,
            desconto,
            tipoPagamento,
            subtotal: 0,
            valorTotal: 0, // Inicialmente como 0
        });

        let subtotal = 0;


        for (const item of itens) {
            const { itemCarrinho } = await cadastrarItemCarrinhoUseCase.execute({
                carrinhoId: carrinho.id,
                produtoId: item.produtoId,
                unidadesProduto: item.unidadesProduto,
            });

            subtotal += itemCarrinho.totalItemCarrinho;
        }

        const valorTotal = parseFloat((subtotal - (subtotal * (desconto / 100))).toFixed(2));

        const carrinhoAtualizado = await atualizarCarrinho.execute({
            id_carrinho: carrinho.id,
            subtotal,
            valorTotal,
        });

        return reply.status(201).send({ message: "Venda registrada com sucesso!", carrinhoAtualizado });

    } catch (error) {
        if (error instanceof ProdutoNaoExiste || error instanceof ErroAoCriarItemCarrinho ||
             error instanceof ClienteNaoExiste || error instanceof FuncionarioNaoExiste || 
             error instanceof ErroAoCriarCarrinho || error instanceof ErroQuantidadeProdutoIndisponivel) {
            return reply.status(409).send({ message: error.message });
        }

        throw error;
    }
}
