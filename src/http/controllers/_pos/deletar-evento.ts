import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { ErroAoDeletarEvento } from "@/use-cases/@errors/pos/erro-deletar-evento";
import { ErroEventoNaoExiste } from "@/use-cases/@errors/pos/erro-evento-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeDeletarEventoUseCase } from "@/use-cases/@factories/pos/make-deletar-evento-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletarEvento(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deletarEventoBodySchema = z.object({
    id: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { id, idUserEquipeDirigente } = deletarEventoBodySchema.parse(
    request.body
  );

  try {
    const deletarEventoUseCase = makeDeletarEventoUseCase();

    await deletarEventoUseCase.execute({
      id,
      idUserEquipeDirigente,
    });

    return reply.status(200).send({
      message: "Evento deletado com sucesso!",
    });
  } catch (error) {
    if (
      error instanceof ErroEventoNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja ||
      error instanceof ErroAoDeletarEvento
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
