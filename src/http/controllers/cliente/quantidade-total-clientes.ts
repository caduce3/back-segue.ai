import { ErroAoCarregarClientes } from "@/use-cases/@errors/cliente/cliente-erro-carregar";
import { makePegarQuantidadeTotalClienteUseCase } from "@/use-cases/@factories/clientes/make-quantidade-total-clientes-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function pegarQuantidadeTotalCliente(request: FastifyRequest, reply: FastifyReply) {
    const pegarQuantidadeTotalClienteBodySchema = z.object({
        date_init: z.string(),
        date_finish: z.string(),
    })

    const { 
        date_init, date_finish
    } = pegarQuantidadeTotalClienteBodySchema.parse(request.body)

    try {
        const pegarQuantidadeTotalClienteUseCase = makePegarQuantidadeTotalClienteUseCase()

        const qtdTotalCliente = await pegarQuantidadeTotalClienteUseCase.execute({
            date_init, date_finish
        })

        return reply.status(200).send({
            qtdTotalCliente
        })

    } catch (error) {
        if(
            error instanceof ErroAoCarregarClientes 
        )
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}