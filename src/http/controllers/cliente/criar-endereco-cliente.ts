import { ErroAoCriarEnderecoCliente } from "@/use-cases/@errors/cliente/cliente-erro-criar-endereco";
import { ClienteNaoExiste } from "@/use-cases/@errors/cliente/cliente-nao-existe";
import { makeCriarEnderecoClienteUseCase } from "@/use-cases/@factories/clientes/make-adicionar-endereco-cliente-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function criarEnderecoCliente(request: FastifyRequest, reply: FastifyReply) {
    const criarEnderecoClienteBodySchema = z.object({
        id_cliente: z.string(),
        endereco: z.object({
            rua: z.string().min(4),
            numero: z.string().min(1),
            bairro: z.string().min(4),
            cidade: z.string().min(4),
            estado: z.string().min(2),
            cep: z.string().min(5)
        })
    })

    const { 
        id_cliente,
        endereco
    } = criarEnderecoClienteBodySchema.parse(request.body)

    try {
        const criarEnderecoClienteUseCase = makeCriarEnderecoClienteUseCase()

        const cliente = await criarEnderecoClienteUseCase.execute({
            id_cliente, 
            endereco
        })

        return reply.status(201).send({
            message: "Endereço do cliente criado com sucesso!",
            cliente
        })

    } catch (error) {
        if(
            error instanceof ClienteNaoExiste ||
            error instanceof ErroAoCriarEnderecoCliente 
        )
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}