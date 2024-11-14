import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { FuncionarioNaoExiste } from "@/use-cases/@errors/funcionario/funcionario-nao-existe copy";
import { makeDeletarFuncionarioUseCase } from "@/use-cases/@factories/funcionarios/make-deletar-funcionario-use-case";

export async function deletarFuncionario(request: FastifyRequest, reply: FastifyReply) {
    const deletarFuncionarioBodySchema = z.object({
        id: z.string(),

    })

    const { id } = deletarFuncionarioBodySchema.parse(request.body)

    try {
        const deletarFuncionarioUseCase = makeDeletarFuncionarioUseCase()

        await deletarFuncionarioUseCase.execute({
            id
        })

    } catch (error) {
        if(error instanceof FuncionarioNaoExiste ) {
            return reply.status(409).send({message: error.message})
        }
        throw error
    }

    return reply.status(200).send(
        {
            message: "Funcionário deletado com sucesso"
        }
    )
}