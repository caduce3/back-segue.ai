import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { FuncionarioAlreadyExistsError } from "@/use-cases/@errors/funcionario/funcionario-ja-existe";
import { makeAtualizarFuncionarioUseCase } from "@/use-cases/@factories/funcionarios/make-atualizar-funcionario-use-case"
import { FuncionarioNaoExiste } from "@/use-cases/@errors/funcionario/funcionario-nao-existe copy";
import { ErroAoAtualizarFuncionario } from "@/use-cases/@errors/funcionario/funcionario-erro-atualizar";
import { TelefoneDeveConterOzeDigitos } from "@/use-cases/@errors/erro-telefone-deve-ter-11-digitos";
import { DddInvalido } from "@/use-cases/@errors/erro-ddd-invalido";
import { CpfDeveConterOzeDigitos } from "@/use-cases/@errors/erro-cpf-deve-ter-11-digitos";
import { CpfInvalido } from "@/use-cases/@errors/erro-cpf-inválido";

export async function atualizarFuncionario(request: FastifyRequest, reply: FastifyReply) {
    const atualizarFuncionarioBodySchema = z.object({
        id: z.string(),
        nome: z.string().optional(),
        email: z.string().email().optional(),
        cpf: z.string().optional(),
        telefone: z.string().optional(),
        status: z.enum(["ATIVO", "INATIVO"]).optional(),
        cargo: z.enum(["PROPRIETARIO", "ADMINISTRADOR", "COLABORADOR"]).optional()

    })

    const { id, nome, email, cpf, telefone, status, cargo} = atualizarFuncionarioBodySchema.parse(request.body)

    try {
        const atualizarFuncionarioUseCase = makeAtualizarFuncionarioUseCase()

        await atualizarFuncionarioUseCase.execute({
            id,
            nome,
            email,
            telefone,
            cpf,
            status,
            cargo
        })

    } catch (error) {
        if(error instanceof FuncionarioNaoExiste || error instanceof ErroAoAtualizarFuncionario ||

            error instanceof TelefoneDeveConterOzeDigitos ||
            error instanceof DddInvalido || 
            error instanceof CpfDeveConterOzeDigitos ||
            error instanceof CpfInvalido ||
            error instanceof FuncionarioAlreadyExistsError
         ) {
            return reply.status(409).send({message: error.message})
        }
        throw error
    }

    return reply.status(201).send(
        {
            message: "Funcionário atualizado com sucesso"

        }
    )
}