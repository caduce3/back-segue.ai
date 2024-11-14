import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { TelefoneDeveConterOzeDigitos } from "@/use-cases/@errors/erro-telefone-deve-ter-11-digitos";
import { DddInvalido } from "@/use-cases/@errors/erro-ddd-invalido";
import { CpfDeveConterOzeDigitos } from "@/use-cases/@errors/erro-cpf-deve-ter-11-digitos";
import { CpfInvalido } from "@/use-cases/@errors/erro-cpf-inválido";
import { makeAtualizarClienteUseCase } from "@/use-cases/@factories/clientes/make-atualizar-cliente-use-case";
import { ClienteNaoExiste } from "@/use-cases/@errors/cliente/cliente-nao-existe";
import { ErroAoAtualizarCliente } from "@/use-cases/@errors/cliente/cliente-erro-atualizar";
import { ClienteAlreadyExistsError } from "@/use-cases/@errors/cliente/cliente-ja-existe";
import { ErroAoAtualizarEnderecoCliente } from "@/use-cases/@errors/cliente/cliente-erro-atualizar-endereco";

export async function atualizarCliente(request: FastifyRequest, reply: FastifyReply) {
    const atualizarClienteBodySchema = z.object({
        id: z.string(),
        nome: z.string().optional(),
        email: z.string().email().optional(),
        cpf: z.string().optional(),
        telefone: z.string().optional()
    })

    const { id, nome, email, cpf, telefone } = atualizarClienteBodySchema.parse(request.body)

    try {
        const atualizarClienteUseCase = makeAtualizarClienteUseCase()

        await atualizarClienteUseCase.execute({
            id,
            nome,
            email,
            telefone,
            cpf
        })

    } catch (error) {
        if(error instanceof ClienteNaoExiste || error instanceof ErroAoAtualizarCliente ||

            error instanceof TelefoneDeveConterOzeDigitos ||
            error instanceof DddInvalido || 
            error instanceof CpfDeveConterOzeDigitos ||
            error instanceof CpfInvalido ||
            error instanceof ClienteAlreadyExistsError ||
            error instanceof ErroAoAtualizarEnderecoCliente
         ) {
            return reply.status(409).send({message: error.message})
        }
        throw error
    }

    return reply.status(200).send(
        {
            message: "Cliente atualizado com sucesso"
        }
    )
}