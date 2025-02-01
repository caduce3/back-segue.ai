import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroAtualizarEvento } from "@/use-cases/@errors/pos/erro-atualizar-evento";
import { ErroEventoNaoExiste } from "@/use-cases/@errors/pos/erro-evento-nao-existe";
import { makeAtualizarEventoUseCase } from "@/use-cases/@factories/pos/make-editar-evento-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function atualizarEvento(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const atualizarEventoBodySchema = z.object({
    id: z.string().uuid(),
    igrejaId: z.string().uuid(),
    idUserEquipeDirigente: z.string().uuid(),
    nome: z.string().optional(),
    descricao: z.string().optional(),
    data: z.string().optional(),
    horario: z.string().optional(),
  });

  const {
    id,
    igrejaId,
    idUserEquipeDirigente,
    nome,
    descricao,
    data,
    horario,
  } = atualizarEventoBodySchema.parse(request.body);

  try {
    const atualizarEventoUseCase = makeAtualizarEventoUseCase();

    await atualizarEventoUseCase.execute({
      id,
      igrejaId,
      idUserEquipeDirigente,
      nome,
      descricao,
      data,
      horario,
    });
  } catch (error) {
    if (
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroAtualizarEvento ||
      error instanceof ErroEventoNaoExiste
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send({
    message: "Evento atualizado com sucesso!",
  });
}
