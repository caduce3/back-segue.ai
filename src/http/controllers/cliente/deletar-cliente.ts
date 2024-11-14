import { ClienteAlreadyExistsError } from "@/use-cases/@errors/cliente/cliente-ja-existe";
import { makeDeletarClienteUseCase } from "@/use-cases/@factories/clientes/make-deletar-cliente-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletarCliente(request: FastifyRequest, reply: FastifyReply) {
    const deletarClienteBodySchema = z.object({
        id_cliente: z.string()
    })

    const { 
        id_cliente
    } = deletarClienteBodySchema.parse(request.body)

    try {
        const deletarClienteUseCase = makeDeletarClienteUseCase()

        await deletarClienteUseCase.execute({
            id_cliente
        })

        return reply.status(200).send({
            message: "Cliente deletado com sucesso!"
        });

    } catch (error) {
        if(
            error instanceof ClienteAlreadyExistsError
        )
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}