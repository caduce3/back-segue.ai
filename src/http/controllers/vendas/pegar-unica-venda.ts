import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makePegarUnicoCarrinhoUseCase } from "@/use-cases/@factories/carrinho/make-pegar-unico-carrinho";
import { CarrinhoNaoExiste } from "@/use-cases/@errors/carrinho/erro-carrinho-nao-existe";

export async function pegarUnicaVenda(request: FastifyRequest, reply: FastifyReply) {
    const pegarUnicaVendaParamsSchema = z.object({
        id: z.string()
    })

    const { 
        id
    } = pegarUnicaVendaParamsSchema.parse(request.params)

    try {
        const pegarUnicaVendaUseCase = makePegarUnicoCarrinhoUseCase()

        const carrinho = await pegarUnicaVendaUseCase.execute({
            id
        })

        return reply.status(200).send(carrinho)

    } catch (error) {
        if(
            error instanceof CarrinhoNaoExiste)
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}