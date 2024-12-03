import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { FichaNaoExiste } from "@/use-cases/@errors/ficha/erro-ficha-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeDeletarFichaUseCase } from "@/use-cases/@factories/ficha/make-deletar-ficha-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletarFicha(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deletarFichaBodySchema = z.object({
    id: z.string().uuid(),
    idUserEquipeDirigente: z.string().uuid(),
  });

  const { id, idUserEquipeDirigente } = deletarFichaBodySchema.parse(
    request.body
  );

  try {
    const deletarFichaUseCase = makeDeletarFichaUseCase();

    await deletarFichaUseCase.execute({
      id,
      idUserEquipeDirigente,
    });

    return reply.status(200).send({
      message: "Ficha deletada com sucesso!",
    });
  } catch (error) {
    if (
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja ||
      error instanceof FichaNaoExiste
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
