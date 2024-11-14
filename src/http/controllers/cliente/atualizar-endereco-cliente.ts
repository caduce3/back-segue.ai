import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ClienteNaoExiste } from "@/use-cases/@errors/cliente/cliente-nao-existe";
import { ErroAoAtualizarCliente } from "@/use-cases/@errors/cliente/cliente-erro-atualizar";
import { ErroAoAtualizarEnderecoCliente } from "@/use-cases/@errors/cliente/cliente-erro-atualizar-endereco";
import { makeAtualizarEnderecoClienteUseCase } from "@/use-cases/@factories/clientes/make-atualizar-endereco-cliente-use-case";
import { EnderecoClienteNaoExiste } from "@/use-cases/@errors/cliente/endereco-cliente-nao-existe";

export async function atualizarEnderecoCliente(request: FastifyRequest, reply: FastifyReply) {
    const atualizarEnderecoClienteBodySchema = z.object({
        id_endereco: z.string(),
        endereco: z.object({
            rua: z.string().min(4).optional(),
            numero: z.string().min(1).optional(),
            bairro: z.string().min(4).optional(),
            cidade: z.string().min(4).optional(),
            estado: z.string().min(2).optional(),
            cep: z.string().min(5).optional()
        })
    })

    const { id_endereco, endereco } = atualizarEnderecoClienteBodySchema.parse(request.body)

    try {
        const atualizarEnderecoClienteUseCase = makeAtualizarEnderecoClienteUseCase()

        await atualizarEnderecoClienteUseCase.execute({
            id_endereco,
            endereco
        })

    } catch (error) {
        if(error instanceof ClienteNaoExiste || error instanceof ErroAoAtualizarCliente ||

            error instanceof EnderecoClienteNaoExiste ||
            error instanceof ErroAoAtualizarEnderecoCliente
         ) {
            return reply.status(409).send({message: error.message})
        }
        throw error
    }

    return reply.status(200).send(
        {
            message: "Endereço do cliente atualizado com sucesso"
        }
    )
}