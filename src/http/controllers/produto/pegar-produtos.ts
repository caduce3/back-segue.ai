import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { makePegarProdutosUseCase } from "@/use-cases/@factories/produtos/make-pegar-produtos-use-case";
import { ErroAoCarregarProdutos } from "@/use-cases/@errors/produto/erro-carregar-produtos";

export async function pegarProdutos(request: FastifyRequest, reply: FastifyReply) {
    const pegarProdutosBodySchema = z.object({
        page: z.number(),
        nome: z.string().optional(),
        descricao: z.string().optional(),
        preco: z.number().optional(),
        quantidadeDisponivel: z.number().optional(),
    })

    const { 
        page,
        nome,
        descricao,
        preco,
        quantidadeDisponivel
    } = pegarProdutosBodySchema.parse(request.body)

    try {
        const pegarProdutosUseCase = makePegarProdutosUseCase()

        const { produtosList, totalItens, totalPages } = await pegarProdutosUseCase.execute({
            page,
            nome,
            descricao,
            preco,
            quantidadeDisponivel
        })

        return reply.status(200).send({
            totalItens,
            totalPages,
            currentPage: page,
            produtosList
        })

    } catch (error) {
        if(
            error instanceof ErroAoCarregarProdutos ||
            error instanceof ErroAoCarregarPagina)
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}