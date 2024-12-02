import { ErroAoAtualizarUserEquipeDirigente } from "@/use-cases/@errors/equipeDirigente/erro-atualizar-user-equipe-dirigente";
import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeAtualizarUserEquipeDirigenteUseCase } from "@/use-cases/@factories/equipe-dirigente/make-atualizar-user-equipe-dirigente-use-case";
import { Status } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function atualizarUserEquipeDirigente(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const atualizarUserEquipeDirigenteBodySchema = z.object({
    id: z.string(),
    idUserEquipeDirigente: z.string(),
    igrejaId: z.string(),
    nome: z.string().optional(),
    email: z.string().optional(),
    telefone: z.string().optional(),
    status: z.nativeEnum(Status).optional(),
    pasta: z
      .enum([
        "PAROQUIA",
        "PADRE",
        "FINANCAS",
        "MONTAGEM",
        "POS",
        "PALESTRA",
        "FICHAS",
      ])
      .optional(),
    ano: z.string().optional(),
  });

  const {
    id,
    igrejaId,
    idUserEquipeDirigente,
    nome,
    email,
    telefone,
    status,
    pasta,
    ano,
  } = atualizarUserEquipeDirigenteBodySchema.parse(request.body);

  try {
    const atualizarUserEquipeDirigenteUseCase =
      makeAtualizarUserEquipeDirigenteUseCase();

    await atualizarUserEquipeDirigenteUseCase.execute({
      id,
      igrejaId,
      idUserEquipeDirigente,
      nome,
      email,
      telefone,
      status,
      pasta,
      ano,
    });
  } catch (error) {
    if (
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja ||
      error instanceof ErroAoAtualizarUserEquipeDirigente
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(200).send({
    message: "Usuário da ED atualizado com sucesso!",
  });
}
