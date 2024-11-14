import { ErroDeletarProduto } from "@/use-cases/@errors/produto/erro-deletar-produto";
import { ProdutoNaoExiste } from "@/use-cases/@errors/produto/erro-produto-nao-existe";
import { makeDeletarProdutoUseCase } from "@/use-cases/@factories/produtos/make-deletar-produto-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletarProduto(request: FastifyRequest, reply: FastifyReply) {
    const deletarProdutoBodySchema = z.object({
        id_produto: z.string()
    })

    const { 
        id_produto
    } = deletarProdutoBodySchema.parse(request.body)

    try {
        const deletarProdutoUseCase = makeDeletarProdutoUseCase()

        await deletarProdutoUseCase.execute({
            id_produto
        })

        return reply.status(200).send({
            message: "Produto deletado com sucesso!"
        });

    } catch (error) {
        if(
            error instanceof ProdutoNaoExiste ||
            error instanceof ErroDeletarProduto
        )
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}