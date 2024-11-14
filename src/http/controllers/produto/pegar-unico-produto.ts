import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makePegarUnicoProdutoUseCase } from "@/use-cases/@factories/produtos/make-pegar-unico-produto-use-case";
import { ProdutoNaoExiste } from "@/use-cases/@errors/produto/erro-produto-nao-existe";

export async function pegarUnicoProduto(request: FastifyRequest, reply: FastifyReply) {
    const pegarUnicoProdutoBodySchema = z.object({
        id: z.string()
    })

    const { 
        id
    } = pegarUnicoProdutoBodySchema.parse(request.params)

    try {
        const pegarUnicoProdutoUseCase = makePegarUnicoProdutoUseCase()

        const produto = await pegarUnicoProdutoUseCase.execute({
            id
        })

        return reply.status(200).send(produto)

    } catch (error) {
        if(
            error instanceof ProdutoNaoExiste)
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}