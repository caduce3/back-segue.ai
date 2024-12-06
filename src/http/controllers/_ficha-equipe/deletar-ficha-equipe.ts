import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { FichaEquipeNaoExiste } from "@/use-cases/@errors/ficha-equipe/erro-deletar-ficha-equipe";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeDeletarFichaEquipeUseCase } from "@/use-cases/@factories/ficha-equipe.ts/make-deletar-ficha-equipe-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletarFichaEquipe(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deletarFichaEquipeBodySchema = z.object({
    id: z.string().uuid(),
    idUserEquipeDirigente: z.string().uuid(),
    igrejaId: z.string().uuid(),
  });

  const { id, idUserEquipeDirigente, igrejaId } =
    deletarFichaEquipeBodySchema.parse(request.body);

  try {
    const deletarFichaEquipeUseCase = makeDeletarFichaEquipeUseCase();

    await deletarFichaEquipeUseCase.execute({
      id,
      idUserEquipeDirigente,
      igrejaId,
    });

    return reply.status(200).send({
      message: "Equipe deletada da ficha com sucesso!",
    });
  } catch (error) {
    if (
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja ||
      error instanceof FichaEquipeNaoExiste ||
      error instanceof IgrejaNaoExiste
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
