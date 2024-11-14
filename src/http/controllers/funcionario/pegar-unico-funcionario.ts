import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makePegarUnicoFuncionarioUseCase } from "@/use-cases/@factories/funcionarios/make-pegar-unico-funcionario-use-case";
import { FuncionarioNaoExiste } from "@/use-cases/@errors/funcionario/funcionario-nao-existe copy";

export async function getUnicoFuncionario(request: FastifyRequest, reply: FastifyReply) {
    const getUnicoFuncionarioBodySchema = z.object({
        id: z.string()
    })

    const { 
        id
    } = getUnicoFuncionarioBodySchema.parse(request.params)

    try {
        const getUnicoFuncionarioUseCase = makePegarUnicoFuncionarioUseCase()

        const funcionario = await getUnicoFuncionarioUseCase.execute({
            id
        })

        return reply.status(200).send(funcionario)

    } catch (error) {
        if(
            error instanceof FuncionarioNaoExiste)
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}