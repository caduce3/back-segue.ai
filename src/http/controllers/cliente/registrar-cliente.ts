import { ClienteAlreadyExistsError } from "@/use-cases/@errors/cliente/cliente-ja-existe";
import { CpfDeveConterOzeDigitos } from "@/use-cases/@errors/erro-cpf-deve-ter-11-digitos";
import { CpfInvalido } from "@/use-cases/@errors/erro-cpf-inválido";
import { DddInvalido } from "@/use-cases/@errors/erro-ddd-invalido";
import { TelefoneDeveConterOzeDigitos } from "@/use-cases/@errors/erro-telefone-deve-ter-11-digitos";
import { makeRegisterClienteUseCase } from "@/use-cases/@factories/clientes/make-registrar-cliente-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registrarCliente(request: FastifyRequest, reply: FastifyReply) {
    const registrarClienteBodySchema = z.object({
        nome: z.string().min(4),
        email: z.string().email(),
        telefone: z.string(),
        cpf: z.string(),
        endereco: z.object({
            rua: z.string().min(4),
            numero: z.string().min(1),
            bairro: z.string().min(4),
            cidade: z.string().min(4),
            estado: z.string().min(2),
            cep: z.string().min(5)
        }).optional()
    })

    const { 
        nome,
        email,
        telefone,
        cpf,
        endereco
    } = registrarClienteBodySchema.parse(request.body)

    try {
        const registrarClienteUseCase = makeRegisterClienteUseCase()

        const cliente = await registrarClienteUseCase.execute({
            nome,
            email,
            telefone,
            cpf,
            endereco
        })

        return reply.status(201).send({
            message: "Cliente criado com sucesso!",
            cliente
        })

    } catch (error) {
        if(
            error instanceof ClienteAlreadyExistsError ||
            error instanceof TelefoneDeveConterOzeDigitos ||
            error instanceof DddInvalido ||
            error instanceof CpfDeveConterOzeDigitos ||
            error instanceof CpfInvalido
        )
        {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}