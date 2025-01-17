import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { makePegarUnicaTransactionUseCase } from "@/use-cases/@factories/transaction/make-pegar-unica-transaction-use-case";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { ErroTransactionNaoExiste } from "@/use-cases/@errors/transaction/erro-transaction-nao-existe";

export async function pegarUnicaTransaction(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pegarUnicaTransactionBodySchema = z.object({
    id: z.string(),
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { id, igrejaId, idUserEquipeDirigente } =
    pegarUnicaTransactionBodySchema.parse(request.body);

  try {
    const pegarUnicaTransactionUseCase = makePegarUnicaTransactionUseCase();

    const transaction = await pegarUnicaTransactionUseCase.execute({
      id,
      igrejaId,
      idUserEquipeDirigente,
    });

    return reply.status(200).send(
      transaction,
    );
  } catch (error) {
    if (
      error instanceof ErroTransactionNaoExiste ||
      error instanceof ErroAoCarregarPagina ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
