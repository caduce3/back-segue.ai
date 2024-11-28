import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeGastosPorCategoriaTransactionUseCase } from "@/use-cases/@factories/transaction/make-gastos-por-categoria-transaction-use-case";

export async function gastosPorCategoriaTransaction(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const gastosPorCategoriaTransactionBodySchema = z.object({
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
    dateInit: z.string(),
    dateFinish: z.string(),
  });

  const { igrejaId, idUserEquipeDirigente, dateInit, dateFinish } =
    gastosPorCategoriaTransactionBodySchema.parse(request.body);

  try {
    const gastosPorCategoriaTransaction =
      makeGastosPorCategoriaTransactionUseCase();

    const gastosPorCategoria = await gastosPorCategoriaTransaction.execute({
      igrejaId,
      idUserEquipeDirigente,
      dateInit,
      dateFinish,
    });

    return reply.status(200).send({
      gastosPorCategoria,
    });
  } catch (error) {
    if (
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
