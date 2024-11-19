import { ErroCadastrarProduto } from "@/use-cases/@errors/produto/erro-cadastrar-produto";
import { ProdutoJaExiste } from "@/use-cases/@errors/produto/erro-produto-ja-existe";
import { makeCadastrarProdutoUseCase } from "@/use-cases/@factories/produtos/make-cadastrar-produto-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function cadastrarProduto(request: FastifyRequest, reply: FastifyReply) {
    const cadastrarProdutoBodySchema = z.object({
        nome: z.string().min(4),
        descricao: z.string().min(4).optional(),
        preco: z.number(),
        quantidadeDisponivel: z.number(),
    })

    const { 
        nome,
        descricao,
        preco,
        quantidadeDisponivel
    } = cadastrarProdutoBodySchema.parse(request.body)

    try {
        const cadastrarProdutoUseCase = makeCadastrarProdutoUseCase()

        const produto = await cadastrarProdutoUseCase.execute({
            nome,
            descricao: descricao ?? "",
            preco,
            quantidadeDisponivel
        })

        return reply.status(201).send({
            message: "Produto cadastrado com sucesso!",
            produto
        })

    } catch (error) {
        if(
            error instanceof ProdutoJaExiste ||
            error instanceof ErroCadastrarProduto
        )
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}