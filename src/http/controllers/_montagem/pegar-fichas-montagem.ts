import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { CoresCirculos } from "@prisma/client";
import { ErroAoCarregarFichas } from "@/use-cases/@errors/ficha/erro-carregar-fichas";
import { makePegarFichasMontagemUseCase } from "@/use-cases/@factories/montagem/make-pegar-fichas-use-case";

export async function pegarFichasMontagem(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pegarFichasMontagemBodySchema = z.object({
    page: z.number().positive(),
    igrejaId: z.string().uuid(),
    idUserEquipeDirigente: z.string().uuid(),
    nomePastaFichas: z.string().optional(),
    nomeJovem: z.string().optional(),
    anoEncontro: z.string().optional(),
    corCirculoOrigem: z
      .enum([
        CoresCirculos.AMARELO,
        CoresCirculos.AZUL,
        CoresCirculos.LARANJA,
        CoresCirculos.ROSA,
        CoresCirculos.VERDE,
        CoresCirculos.VERMELHO,
      ])
      .optional(),
  });

  const {
    page,
    igrejaId,
    idUserEquipeDirigente,
    nomePastaFichas,
    nomeJovem,
    anoEncontro,
    corCirculoOrigem,
  } = pegarFichasMontagemBodySchema.parse(request.body);

  try {
    const pegarFichasMontagemUseCase = makePegarFichasMontagemUseCase();

    const { fichasList, totalItens, totalPages } =
      await pegarFichasMontagemUseCase.execute({
        page,
        igrejaId,
        idUserEquipeDirigente,
        nomePastaFichas,
        nomeJovem,
        anoEncontro,
        corCirculoOrigem,
      });

    return reply.status(200).send({
      totalItens,
      totalPages,
      currentPage: page,
      fichasList,
    });
  } catch (error) {
    if (
      error instanceof ErroAoCarregarFichas ||
      error instanceof ErroAoCarregarPagina ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
