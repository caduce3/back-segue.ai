import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { makePegarClientesUseCase } from "@/use-cases/@factories/clientes/make-pegar-clientes-use-case";
import { ErroAoCarregarClientes } from "@/use-cases/@errors/cliente/cliente-erro-carregar";

export async function pegarClientes(request: FastifyRequest, reply: FastifyReply) {
    const pegarClientesBodySchema = z.object({
        page: z.number(),
        nome: z.string().optional(),
        email: z.string().optional(),
        telefone: z.string().optional(),
        cpf: z.string().optional(),
    })

    const { 
        page,
        nome,
        email,
        telefone,
        cpf
    } = pegarClientesBodySchema.parse(request.body)

    try {
        const pegarClientesUseCase = makePegarClientesUseCase()

        const { clientesList, totalItens, totalPages } = await pegarClientesUseCase.execute({
            page,
            nome,
            email,
            telefone,
            cpf
        })

        return reply.status(200).send({
            totalItens,
            totalPages,
            currentPage: page,
            clientesList
        })

    } catch (error) {
        if(
            error instanceof ErroAoCarregarClientes ||
            error instanceof ErroAoCarregarPagina)
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}