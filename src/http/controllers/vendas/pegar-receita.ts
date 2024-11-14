import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroCarregarCardTotalCarrinho } from "@/use-cases/@errors/carrinho/erro-carregar-qtd-total-carrinho";
import { makePegarReceitaUseCase } from "@/use-cases/@factories/carrinho/make-pegar-receita-use-case";
import { ErroCarregarGrafico } from "@/use-cases/@errors/carrinho/erro-carregar-grafico";

export async function pegarReceita(request: FastifyRequest, reply: FastifyReply) {
    const pegarReceitaBodySchema = z.object({
        date_init: z.string(),
        date_finish: z.string(),
    })

    const { 
        date_init, date_finish
    } = pegarReceitaBodySchema.parse(request.body)

    try {
        const pegarReceitaUseCase = makePegarReceitaUseCase()

        const qtd = await pegarReceitaUseCase.execute({
            date_init, date_finish
        })

        return reply.status(200).send({
            qtd
        })

    } catch (error) {
        if(
            error instanceof ErroCarregarGrafico )
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}