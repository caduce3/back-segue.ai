import { EmailJaCadastrado } from "@/use-cases/@errors/igreja/erro-email-ja-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeCadastrarUserEquipeDirigenteUseCase } from "@/use-cases/@factories/equipe-dirigente/make-cadastrar-user-equipe-dirigente-use-case";
import { TipoPasta } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function cadastrarUserEquipeDirigente(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const cadastrarUserEquipeDirigenteBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string().min(6),
    telefone: z.string(),
    ano: z.string().min(4).max(4),
    igrejaId: z.string(),
    pasta: z.enum([
      TipoPasta.FICHAS,
      TipoPasta.FINANCAS,
      TipoPasta.MONTAGEM,
      TipoPasta.PADRE,
      TipoPasta.PALESTRA,
      TipoPasta.POS,
    ]),
  });

  const { nome, email, senha, telefone, ano, igrejaId, pasta } =
    cadastrarUserEquipeDirigenteBodySchema.parse(request.body);

  try {
    const cadastrarUserEquipeDirigenteUseCase =
      makeCadastrarUserEquipeDirigenteUseCase();

    await cadastrarUserEquipeDirigenteUseCase.execute({
      nome,
      email,
      senha,
      telefone,
      ano,
      igrejaId,
      pasta,
    });
  } catch (error) {
    if (error instanceof EmailJaCadastrado) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send({
    message: "Jovem pasta cadastrado com sucesso!",
  });
}
