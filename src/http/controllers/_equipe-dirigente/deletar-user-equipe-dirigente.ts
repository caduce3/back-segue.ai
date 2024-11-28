import { ErroAoDeletarUserEquipeDirigente } from "@/use-cases/@errors/equipeDirigente/erro-deletar-user-equipe-dirigente";
import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeDeletarUserEquipeDirigenteUseCase } from "@/use-cases/@factories/equipe-dirigente/make-deletar-user-equipe-dirigente-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletarUserEquipeDirigente(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deletarUserEquipeDirigenteBodySchema = z.object({
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { igrejaId, idUserEquipeDirigente } =
    deletarUserEquipeDirigenteBodySchema.parse(request.body);

  try {
    const deletarUserEquipeDirigenteUseCase =
      makeDeletarUserEquipeDirigenteUseCase();

    await deletarUserEquipeDirigenteUseCase.execute({
      igrejaId,
      idUserEquipeDirigente,
    });

    return reply.status(200).send({
      message: "Jovem ED deletado com sucesso!",
    });
  } catch (error) {
    if (
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja ||
      error instanceof ErroAoDeletarUserEquipeDirigente
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
