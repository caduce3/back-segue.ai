import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { ErroAoDeletarPalestra } from "@/use-cases/@errors/palestra/erro-deletar-palestra";
import { ErroPalestraNaoExiste } from "@/use-cases/@errors/palestra/erro-palestra-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeDeletarPalestraUseCase } from "@/use-cases/@factories/palestra/make-deletar-palestra-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletarPalestra(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deletarPalestraBodySchema = z.object({
    id: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { id, idUserEquipeDirigente } = deletarPalestraBodySchema.parse(
    request.body
  );

  try {
    const deletarPalestraUseCase = makeDeletarPalestraUseCase();

    await deletarPalestraUseCase.execute({
      id,
      idUserEquipeDirigente,
    });

    return reply.status(200).send({
      message: "Palestra deletada com sucesso!",
    });
  } catch (error) {
    if (
      error instanceof ErroPalestraNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja ||
      error instanceof ErroAoDeletarPalestra
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
