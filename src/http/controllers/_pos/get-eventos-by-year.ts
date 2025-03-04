import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { makePegarEventosUseCase } from "@/use-cases/@factories/pos/make-pegar-eventos-use-case";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroAoCarregarEventos } from "@/use-cases/@errors/pos/erro-carregar-evento";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeGetEventosByYearsUseCase } from "@/use-cases/@factories/pos/make-get-eventos-by-year-use-case";

export async function getEventosByYear(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getEventosByYearBodySchema = z.object({
    year: z.string(),
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { year, igrejaId, idUserEquipeDirigente } =
    getEventosByYearBodySchema.parse(request.query);

  try {
    const getEventosByYearUseCase = makeGetEventosByYearsUseCase();

    const { eventosList } = await getEventosByYearUseCase.execute({
      year,
      igrejaId,
      idUserEquipeDirigente,
    });

    return reply.status(200).send({
      eventosList,
    });
  } catch (error) {
    if (
      error instanceof ErroAoCarregarEventos ||
      error instanceof ErroAoCarregarPagina ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
