import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { makePegarEventosUseCase } from "@/use-cases/@factories/pos/make-pegar-eventos-use-case";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroAoCarregarEventos } from "@/use-cases/@errors/pos/erro-carregar-evento";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";

export async function pegarEventos(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pegarEventosBodySchema = z.object({
    page: z.string(),
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
    nome: z.string().optional(),
    dataInicio: z.string().optional(),
    dataFim: z.string().optional(),
  });

  const { page, igrejaId, idUserEquipeDirigente, nome, dataInicio, dataFim } =
    pegarEventosBodySchema.parse(request.query);

  try {
    const pegarEventosUseCase = makePegarEventosUseCase();

    const { eventosList, totalItens, totalPages } =
      await pegarEventosUseCase.execute({
        page: Number(page),
        igrejaId,
        idUserEquipeDirigente,
        nome,
        dataInicio,
        dataFim,
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
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
