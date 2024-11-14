import { EnderecoClienteNaoExiste } from "@/use-cases/@errors/cliente/endereco-cliente-nao-existe";
import { ErroAoDeletarEnderecoCliente } from "@/use-cases/@errors/cliente/error-deletar-endereco-cliente";
import { makeDeletarEnderecoClienteUseCase } from "@/use-cases/@factories/clientes/make-deletar-endereco-cliente-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletarEnderecoCliente(request: FastifyRequest, reply: FastifyReply) {
    const deletarEnderecoClienteBodySchema = z.object({
        id_endereco: z.string()
    })

    const { 
        id_endereco
    } = deletarEnderecoClienteBodySchema.parse(request.body)

    try {
        const deletarEnderecoClienteUseCase = makeDeletarEnderecoClienteUseCase()

        await deletarEnderecoClienteUseCase.execute({
            id_endereco
        })

        return reply.status(200).send({
            message: "Endereço deletado com sucesso!"
        });

    } catch (error) {
        if(
            error instanceof EnderecoClienteNaoExiste ||
            error instanceof ErroAoDeletarEnderecoCliente 
        )
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}