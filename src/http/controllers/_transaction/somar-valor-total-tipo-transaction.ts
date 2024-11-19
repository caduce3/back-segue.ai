import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeSomarTotalTipoTransactionUseCase } from "@/use-cases/@factories/transaction/make-somar-valor-total-tipo-transactions";

export async function somarValorTotalTipoTransaction(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const somarValorTotalTipoTransactionBodySchema = z.object({
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
    dateInit: z.string(),
    dateFinish: z.string(),
  });

  const { igrejaId, idUserEquipeDirigente, dateInit, dateFinish } =
    somarValorTotalTipoTransactionBodySchema.parse(request.body);

  try {
    const somarValorTotalTipoTransactionUseCase =
      makeSomarTotalTipoTransactionUseCase();

    const total = await somarValorTotalTipoTransactionUseCase.execute({
      igrejaId,
      idUserEquipeDirigente,
      dateInit,
      dateFinish,
    });

    return reply.status(200).send({
      total,
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
