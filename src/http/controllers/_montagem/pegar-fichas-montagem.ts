import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { CoresCirculos, Equipes } from "@prisma/client";
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
    equipeAtual: z.enum([
      Equipes.ANIMACAO,
      Equipes.CANTO,
      Equipes.CIRCULO,
      Equipes.COZINHA,
      Equipes.ED_FICHAS,
      Equipes.ED_FINANCAS,
      Equipes.ED_MONTAGEM,
      Equipes.ED_PALESTRA,
      Equipes.ED_POS,
      Equipes.ESTACIONAMENTO,
      Equipes.FAXINA,
      Equipes.GRAFICA,
      Equipes.LANCHE,
      Equipes.LITURGIA,
      Equipes.MINI_MERCADO,
      Equipes.SALA,
      Equipes.TAXI,
      Equipes.VIGILIA_PAROQUIAL,
      Equipes.CARAVANA,
      Equipes.NENHUMA,
      Equipes.CG,
    ]),
  });

  const {
    page,
    igrejaId,
    idUserEquipeDirigente,
    nomePastaFichas,
    nomeJovem,
    anoEncontro,
    corCirculoOrigem,
    equipeAtual,
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
        equipeAtual,
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
