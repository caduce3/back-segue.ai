import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makePegarQuantidadeTotalCarrinhoUseCase } from "@/use-cases/@factories/carrinho/make-pegar-qtd-total-carrinho-use-case";
import { ErroCarregarCardTotalCarrinho } from "@/use-cases/@errors/carrinho/erro-carregar-qtd-total-carrinho";

export async function pegarQuantidadeVendas(request: FastifyRequest, reply: FastifyReply) {
    const pegarQuantidadeVendasBodySchema = z.object({
        date_init: z.string(),
        date_finish: z.string(),
    })

    const { 
        date_init, date_finish
    } = pegarQuantidadeVendasBodySchema.parse(request.body)

    try {
        const pegarQtdCarrinhosUseCase = makePegarQuantidadeTotalCarrinhoUseCase()

        const qtd = await pegarQtdCarrinhosUseCase.execute({
            date_init, date_finish
        })

        return reply.status(200).send({
            qtd
        })

    } catch (error) {
        if(
            error instanceof ErroCarregarCardTotalCarrinho )
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}