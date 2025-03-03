import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroAtualizarEvento } from "@/use-cases/@errors/pos/erro-atualizar-evento";
import { ErroEventoNaoExiste } from "@/use-cases/@errors/pos/erro-evento-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
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
    horarioInicio: z.string().optional(),
    horarioFim: z.string().optional(),
    data: z.string().optional(),
    avaliacao: z.number().optional(),
  });

  const {
    id,
    igrejaId,
    idUserEquipeDirigente,
    nome,
    descricao,
    horarioInicio,
    horarioFim,
    data,
    avaliacao,
  } = atualizarEventoBodySchema.parse(request.body);

  try {
    const atualizarEventoUseCase = makeAtualizarEventoUseCase();

    await atualizarEventoUseCase.execute({
      id,
      igrejaId,
      idUserEquipeDirigente,
      nome,
      descricao,
      horarioInicio,
      horarioFim,
      data,
      avaliacao,
    });
  } catch (error) {
    if (
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroAtualizarEvento ||
      error instanceof ErroEventoNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(200).send({
    message: "Evento atualizado com sucesso!",
  });
}
