import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { makePegarEventosUseCase } from "@/use-cases/@factories/pos/make-pegar-eventos-use-case";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroAoCarregarEventos } from "@/use-cases/@errors/pos/erro-carregar-evento";

export async function pegarEventos(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pegarEventosBodySchema = z.object({
    page: z.number().positive(),
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { page, igrejaId, idUserEquipeDirigente } =
    pegarEventosBodySchema.parse(request.body);

  try {
    const pegarEventosUseCase = makePegarEventosUseCase();

    const { eventosList, totalItens, totalPages } =
      await pegarEventosUseCase.execute({
        page,
        igrejaId,
        idUserEquipeDirigente,
      });

    return reply.status(200).send({
      totalItens,
      totalPages,
      currentPage: page,
      eventosList,
    });
  } catch (error) {
    if (
      error instanceof ErroAoCarregarEventos ||
      error instanceof ErroAoCarregarPagina ||
      error instanceof IgrejaNaoExiste
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
