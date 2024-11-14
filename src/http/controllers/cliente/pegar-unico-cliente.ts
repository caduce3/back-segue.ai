import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { FuncionarioNaoExiste } from "@/use-cases/@errors/funcionario/funcionario-nao-existe copy";
import { makePegarUnicoClienteUseCase } from "@/use-cases/@factories/clientes/make-pegar-unico-cliente-use-case";

export async function pegarUnicoCliente(request: FastifyRequest, reply: FastifyReply) {
    const pegarUnicoClienteBodySchema = z.object({
        id: z.string()
    })

    const { 
        id
    } = pegarUnicoClienteBodySchema.parse(request.params)

    try {
        const pegarUnicoClienteUseCase = makePegarUnicoClienteUseCase()

        const cliente = await pegarUnicoClienteUseCase.execute({
            id
        })

        return reply.status(200).send(cliente)

    } catch (error) {
        if(
            error instanceof FuncionarioNaoExiste)
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}