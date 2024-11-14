import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarProdutos } from "@/use-cases/@errors/produto/erro-carregar-produtos";
import { makePegarCarrinhosUseCase } from "@/use-cases/@factories/carrinho/make-pegar-carrinhos-use-case";
import { ErroCarregarCarrinhos } from "@/use-cases/@errors/carrinho/erro-carregar-carrinhos";

export async function pegarVendas(request: FastifyRequest, reply: FastifyReply) {
    const pegarVendasBodySchema = z.object({
        page: z.number(),
        nome_cliente: z.string().optional(),
        nome_funcionario: z.string().optional()
    })

    const { 
        page,
        nome_cliente,
        nome_funcionario
    } = pegarVendasBodySchema.parse(request.body)

    try {
        const pegarCarrinhosUseCase = makePegarCarrinhosUseCase()

        const { carrinhosList, totalItens, totalPages } = await pegarCarrinhosUseCase.execute({
            page,
            nome_cliente,
            nome_funcionario
        })

        return reply.status(200).send({
            totalItens,
            totalPages,
            currentPage: page,
            carrinhosList
        })

    } catch (error) {
        if(
            error instanceof ErroAoCarregarProdutos ||
            error instanceof ErroCarregarCarrinhos)
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}