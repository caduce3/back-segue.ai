import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { CoresCirculos } from "@prisma/client";
import { makePegarFichasUseCase } from "@/use-cases/@factories/ficha/pegar-fichas-use-case";
import { ErroAoCarregarFichas } from "@/use-cases/@errors/ficha/erro-carregar-fichas";

export async function pegarFichas(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pegarFichasBodySchema = z.object({
    page: z.number().positive(),
    igrejaId: z.string().uuid(),
    idUserEquipeDirigente: z.string().uuid(),
    nomePastaFichas: z.string().optional(),
    nomePrincipalOuSecundario: z.string().optional(),
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
    nomePrincipalOuSecundario,
    anoEncontro,
    corCirculoOrigem,
  } = pegarFichasBodySchema.parse(request.body);

  try {
    const pegarFichasUseCase = makePegarFichasUseCase();

    const { fichasList, totalItens, totalPages } =
      await pegarFichasUseCase.execute({
        page,
        igrejaId,
        idUserEquipeDirigente,
        nomePastaFichas,
        nomePrincipalOuSecundario,
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
