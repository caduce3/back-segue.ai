import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAtualizarProdutoUseCase } from "@/use-cases/@factories/produtos/make-atualizar-produto-use-case";
import { ErroAoAtualizarProduto } from "@/use-cases/@errors/produto/erro-atualizar-produto";
import { ProdutoNaoExiste } from "@/use-cases/@errors/produto/erro-produto-nao-existe";
import { ProdutoJaExiste } from "@/use-cases/@errors/produto/erro-produto-ja-existe";

export async function atualizarProduto(request: FastifyRequest, reply: FastifyReply) {
    const atualizarProdutoBodySchema = z.object({
        id_produto: z.string(),
        nome: z.string().optional(),
        descricao: z.string().optional(),
        preco: z.number().optional(),
        quantidadeDisponivel: z.number().optional()
    })

    const { id_produto, nome, preco, descricao, quantidadeDisponivel } = atualizarProdutoBodySchema.parse(request.body)

    try {
        const atualizarProdutoUseCase = makeAtualizarProdutoUseCase()

        await atualizarProdutoUseCase.execute({
            id_produto,
            nome,
            descricao,
            preco,
            quantidadeDisponivel
        })

    } catch (error) {
        if(error instanceof ProdutoNaoExiste || error instanceof ErroAoAtualizarProduto || error instanceof ProdutoJaExiste
         ) {
            return reply.status(409).send({message: error.message})
        }
        throw error
    }

    return reply.status(200).send(
        {
            message: "Produto atualizado com sucesso"
        }
    )
}