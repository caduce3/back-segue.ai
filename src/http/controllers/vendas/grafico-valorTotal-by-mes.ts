import { ErroCarregarGrafico } from "@/use-cases/@errors/carrinho/erro-carregar-grafico";
import { ErroCadastrarProduto } from "@/use-cases/@errors/produto/erro-cadastrar-produto";
import { ProdutoJaExiste } from "@/use-cases/@errors/produto/erro-produto-ja-existe";
import { makePegarSomaValorTotalByMesUseCase } from "@/use-cases/@factories/carrinho/make-pegar-soma-valorTotal-by-mes-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function pegarValorTotalPorMes(request: FastifyRequest, reply: FastifyReply) {
    const pegarValorTotalPorMesBodySchema = z.object({
        date_init: z.string(),
        date_finish: z.string(),
    })

    const { 
        date_init, date_finish
    } = pegarValorTotalPorMesBodySchema.parse(request.body)

    try {
        const pegarValorTotalPorMesUseCase = makePegarSomaValorTotalByMesUseCase()

        const dados = await pegarValorTotalPorMesUseCase.execute({
            date_init, date_finish
        })

        return reply.status(200).send({
            message: "Consulta realizada com sucesso!",
            dados
        })

    } catch (error) {
        if(
            error instanceof ErroCarregarGrafico 
        )
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}