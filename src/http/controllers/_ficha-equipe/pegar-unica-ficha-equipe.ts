import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makePegarUnicaFichaEquipeUseCase } from "@/use-cases/@factories/ficha-equipe.ts/make-pegar-unica-ficha-equipe-use-case";
import { FichaEquipeNaoExiste } from "@/use-cases/@errors/ficha-equipe/erro-deletar-ficha-equipe";

export async function pegarUnicaFichaEquipe(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pegarUnicaFichaEquipeBodySchema = z.object({
    id: z.string(),
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { id, igrejaId, idUserEquipeDirigente } =
    pegarUnicaFichaEquipeBodySchema.parse(request.body);

  try {
    const pegarUnicaFichaEquipeUseCase = makePegarUnicaFichaEquipeUseCase();

    const ficha = await pegarUnicaFichaEquipeUseCase.execute({
      id,
      igrejaId,
      idUserEquipeDirigente,
    });

    return reply.status(200).send(ficha);
  } catch (error) {
    if (
      error instanceof FichaEquipeNaoExiste ||
      error instanceof ErroAoCarregarPagina ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
