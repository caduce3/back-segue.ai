import { CarrinhoNaoExiste } from "@/use-cases/@errors/carrinho/erro-carrinho-nao-existe";
import { ErroDeletarCarrinho } from "@/use-cases/@errors/carrinho/erro-deletar-carrinho";
import { makeDeletarCarrinhoUseCase } from "@/use-cases/@factories/carrinho/make-deletar-carrinho-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletarCarrinho(request: FastifyRequest, reply: FastifyReply) {
    const deletarCarrinhoBodySchema = z.object({
        id_carrinho: z.string()
    })

    const { 
        id_carrinho
    } = deletarCarrinhoBodySchema.parse(request.body)

    try {
        const deletarCarrinhoUseCase = makeDeletarCarrinhoUseCase()

        await deletarCarrinhoUseCase.execute({
            id_carrinho
        })

        return reply.status(200).send({
            message: "Carrinho deletado com sucesso!"
        });

    } catch (error) {
        if(
            error instanceof CarrinhoNaoExiste ||
            error instanceof ErroDeletarCarrinho
        )
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}