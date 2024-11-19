import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { ErroAoDeletarTransaction } from "@/use-cases/@errors/transaction/erro-deletar-transaction";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { ErroTransactionNaoExiste } from "@/use-cases/@errors/transaction/erro-transaction-nao-existe";
import { makeDeletarTransactionUseCase } from "@/use-cases/@factories/transaction/make-deletar-transaction-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletarTransaction(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deletarTransactionBodySchema = z.object({
    id: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { id, idUserEquipeDirigente } = deletarTransactionBodySchema.parse(
    request.body
  );

  try {
    const deletarTransactionUseCase = makeDeletarTransactionUseCase();

    await deletarTransactionUseCase.execute({
      id,
      idUserEquipeDirigente,
    });

    return reply.status(200).send({
      message: "Transação deletada com sucesso!",
    });
  } catch (error) {
    if (
      error instanceof ErroTransactionNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja ||
      error instanceof ErroAoDeletarTransaction
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
