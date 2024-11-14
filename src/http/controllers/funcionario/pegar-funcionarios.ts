import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makePegarFuncionariosUseCase } from "@/use-cases/@factories/funcionarios/make-pegar-funcionarios-use-case";
import { ErroAoCarregarFuncionarios } from "@/use-cases/@errors/funcionario/funcionario-erro-carregar";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";

export async function getFuncionarios(request: FastifyRequest, reply: FastifyReply) {
    const getFuncionariosBodySchema = z.object({
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
    } = getFuncionariosBodySchema.parse(request.body)

    try {
        const getFuncionariosUseCase = makePegarFuncionariosUseCase()

        const { funcionariosList, totalItens, totalPages } = await getFuncionariosUseCase.execute({
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
            funcionariosList
        })

    } catch (error) {
        if(
            error instanceof ErroAoCarregarFuncionarios ||
            error instanceof ErroAoCarregarPagina)
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}