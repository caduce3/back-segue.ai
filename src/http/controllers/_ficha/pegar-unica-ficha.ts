import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makePegarUnicaFichaUseCase } from "@/use-cases/@factories/ficha/make-pegar-unica-ficha-use-case";
import { FichaNaoExiste } from "@/use-cases/@errors/ficha/erro-ficha-nao-existe";

export async function pegarUnicaFicha(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pegarUnicaFichaBodySchema = z.object({
    id: z.string(),
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { id, igrejaId, idUserEquipeDirigente } =
    pegarUnicaFichaBodySchema.parse(request.body);

  try {
    const pegarUnicaFichaUseCase = makePegarUnicaFichaUseCase();

    const ficha = await pegarUnicaFichaUseCase.execute({
      id,
      igrejaId,
      idUserEquipeDirigente,
    });

    return reply.status(200).send(ficha);
  } catch (error) {
    if (
      error instanceof FichaNaoExiste ||
      error instanceof ErroAoCarregarPagina ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
