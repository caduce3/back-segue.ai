import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makePegarUnicoEnderecoClienteUseCase } from "@/use-cases/@factories/enderecos/make-pegar-unico-endereco-use-case";
import { EnderecoClienteNaoExiste } from "@/use-cases/@errors/cliente/endereco-cliente-nao-existe";

export async function pegarUnicoEndereco(request: FastifyRequest, reply: FastifyReply) {
    const pegarUnicoEnderecoBodySchema = z.object({
        id: z.string()
    })

    const { 
        id
    } = pegarUnicoEnderecoBodySchema.parse(request.params)

    try {
        const pegarUnicoEnderecoUseCase = makePegarUnicoEnderecoClienteUseCase()

        const endereco = await pegarUnicoEnderecoUseCase.execute({
            id
        })

        return reply.status(200).send(endereco)

    } catch (error) {
        if(
            error instanceof EnderecoClienteNaoExiste)
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}