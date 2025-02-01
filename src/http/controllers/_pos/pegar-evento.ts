import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { makePegarUnicoEventoUseCase } from "@/use-cases/@factories/pos/make-pegar-evento-use-case";
import { ErroEventoNaoExiste } from "@/use-cases/@errors/pos/erro-evento-nao-existe";

export async function pegarUnicoEvento(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pegarUnicaEventoBodySchema = z.object({
    id: z.string(),
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { id, igrejaId, idUserEquipeDirigente } =
    pegarUnicaEventoBodySchema.parse(request.body);

  try {
    const pegarUnicaEventoUseCase = makePegarUnicoEventoUseCase();

    const evento = await pegarUnicaEventoUseCase.execute({
      id,
      igrejaId,
      idUserEquipeDirigente,
    });

    return reply.status(200).send(evento);
  } catch (error) {
    if (
      error instanceof ErroEventoNaoExiste ||
      error instanceof ErroAoCarregarPagina ||
      error instanceof IgrejaNaoExiste
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
