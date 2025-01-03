import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { makePegarTransactionsUseCase } from "@/use-cases/@factories/transaction/make-pegar-transactions-use-case";
import { ErroAoCarregarTransactions } from "@/use-cases/@errors/transaction/erro-carregar-transaction";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";

export async function pegarTransactions(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pegarTransactionsBodySchema = z.object({
    page: z.number().positive(),
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { page, igrejaId, idUserEquipeDirigente } = pegarTransactionsBodySchema.parse(request.body);

  try {
    const pegarTransactionsUseCase = makePegarTransactionsUseCase();

    const { transactionsList, totalItens, totalPages } =
      await pegarTransactionsUseCase.execute({
        page,
        igrejaId,
        idUserEquipeDirigente
      });

    return reply.status(200).send({
      totalItens,
      totalPages,
      currentPage: page,
      transactionsList,
    });
  } catch (error) {
    if (
      error instanceof ErroAoCarregarTransactions ||
      error instanceof ErroAoCarregarPagina ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
