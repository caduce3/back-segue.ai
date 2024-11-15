import { CNPJjaExiste } from "@/use-cases/@errors/igreja/erro-cnpj-ja-existe";
import { EmailJaCadastrado } from "@/use-cases/@errors/igreja/erro-email-ja-existe";
import { makeCadastrarIgrejaUseCase } from "@/use-cases/@factories/igreja/make-cadastrar-igreja-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function cadastrarIgreja(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const cadastrarIgrejaBodySchema = z.object({
    nome: z.string(),
    cnpj: z.string(),
    email: z.string().email(),
    senha: z.string().min(6),
    telefone: z.string(),
    endereco: z.string(),
    cidade: z.string(),
    estado: z.string(),
    cep: z.string(),
  });

  const { nome, cnpj, email, senha, telefone, endereco, cidade, estado, cep } =
    cadastrarIgrejaBodySchema.parse(request.body);

  try {
    const cadastrarIgrejaUseCase = makeCadastrarIgrejaUseCase();

    await cadastrarIgrejaUseCase.execute({
      nome,
      cnpj,
      email,
      senha,
      telefone,
      endereco,
      cidade,
      estado,
      cep,
    });
  } catch (error) {
    if (
      error instanceof EmailJaCadastrado ||
      error instanceof CNPJjaExiste 
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send({
    message:
      "Igreja cadastrada com sucesso! Entre em contato com: cadulucenapj@gmail.com para ativar sua conta.",
  });
}
