import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { FuncionarioAlreadyExistsError } from "@/use-cases/@errors/funcionario/funcionario-ja-existe";
import { makeRegisterFuncionarioUseCase } from "@/use-cases/@factories/funcionarios/make-register-funcionario-use-case";
import { TelefoneDeveConterOzeDigitos } from "@/use-cases/@errors/erro-telefone-deve-ter-11-digitos";
import { DddInvalido } from "@/use-cases/@errors/erro-ddd-invalido";
import { CpfDeveConterOzeDigitos } from "@/use-cases/@errors/erro-cpf-deve-ter-11-digitos";
import { CpfInvalido } from "@/use-cases/@errors/erro-cpf-inválido";

export async function registerFuncionario(request: FastifyRequest, reply: FastifyReply) {
    const registerFuncionarioBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha: z.string().min(6),
        cpf: z.string().min(11),
        telefone: z.string().min(11),

    })

    const { nome, email, senha, cpf, telefone} = registerFuncionarioBodySchema.parse(request.body)

    try {
        const registerFuncionarioUseCase = makeRegisterFuncionarioUseCase()

        await registerFuncionarioUseCase.execute({
            nome,
            email,
            senha,
            telefone,
            cpf
        })

    } catch (error) {
        if(error instanceof FuncionarioAlreadyExistsError ||
            error instanceof TelefoneDeveConterOzeDigitos ||
            error instanceof DddInvalido || 
            error instanceof CpfDeveConterOzeDigitos ||
            error instanceof CpfInvalido
        ) {
            return reply.status(409).send({message: error.message})
        }
        throw error
    }

    return reply.status(201).send({message: "Funcionário cadastrado com sucesso! Entre em contato com o time de desenvolvimento para ativar sua conta."})
}