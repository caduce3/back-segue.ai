import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makePegarPalestrasUseCase } from "@/use-cases/@factories/palestra/make-pegar-palestras-use-case";
import { ErroAoCarregarPalestras } from "@/use-cases/@errors/palestra/erro-carregar-palestra";

export async function pegarPalestras(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pegarPalestrasQuerySchema = z.object({
    page: z.string(),
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
    nomePalestrante: z.string().optional(),
    temaPalestra: z.string().optional(),
    dataInicio: z.string().optional(),
    dataFim: z.string().optional(),
  });

  const {
    page,
    igrejaId,
    idUserEquipeDirigente,
    nomePalestrante,
    temaPalestra,
    dataInicio,
    dataFim,
  } = pegarPalestrasQuerySchema.parse(request.query);

  try {
    const pegarPalestrasUseCase = makePegarPalestrasUseCase();

    const { palestrasList, totalItens, totalPages } =
      await pegarPalestrasUseCase.execute({
        page: Number(page),
        igrejaId,
        idUserEquipeDirigente,
        nomePalestrante,
        temaPalestra,
        dataInicio,
        dataFim,
      });

    return reply.status(200).send({
      totalItens,
      totalPages,
      currentPage: Number(page),
      palestrasList,
    });
  } catch (error) {
    if (
      error instanceof ErroAoCarregarPalestras ||
      error instanceof ErroAoCarregarPagina ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
