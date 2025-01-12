import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { ErroAoCriarFichaEquipe } from "@/use-cases/@errors/ficha-equipe/erro-criar-ficha-equipe";
import { FichaNaoExiste } from "@/use-cases/@errors/ficha/erro-ficha-nao-existe";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeCadastrarFichaEquipeUseCase } from "@/use-cases/@factories/ficha-equipe.ts/make-cadastrar-ficha-equipe-use-case";
import {
  AvaliacaoEquipe,
  Equipes,
  FuncaoEquipe,
  TipoEcontro,
} from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function cadastrarFichaEquipe(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const cadastrarFichaEquipeBodySchema = z.object({
    igrejaId: z.string().uuid(),
    idUserEquipeDirigente: z.string().uuid(),
    fichaId: z.string().uuid(),
    equipe: z.enum([
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
      Equipes.CG,
      Equipes.ESPIRITUALIZADORA
    ]),
    ano: z.string(),
    funcao: z.enum([
      FuncaoEquipe.COORDENADOR,
      FuncaoEquipe.ED,
      FuncaoEquipe.EQUIPISTA,
    ]),
    avaliacao: z.enum([
      AvaliacaoEquipe.NEGATIVA,
      AvaliacaoEquipe.POSITIVA,
      AvaliacaoEquipe.NEUTRA,
    ]),
    observacoes: z.string().optional(),
    tipoEncontro: z.enum([
      TipoEcontro.PRIMEIRA_ETAPA,
      TipoEcontro.SEGUNDA_ETAPA,
      TipoEcontro.CARAVANA,
    ]),
  });

  const {
    igrejaId,
    idUserEquipeDirigente,
    fichaId,
    equipe,
    ano,
    funcao,
    avaliacao,
    observacoes,
    tipoEncontro,
  } = cadastrarFichaEquipeBodySchema.parse(request.body);

  try {
    const cadastrarFichaEquipeUseCase = makeCadastrarFichaEquipeUseCase();

    await cadastrarFichaEquipeUseCase.execute({
      igrejaId,
      idUserEquipeDirigente,
      fichaId,
      equipe,
      ano,
      funcao,
      avaliacao,
      observacoes,
      tipoEncontro,
    });
  } catch (error) {
    if (
      error instanceof FichaNaoExiste ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja ||
      error instanceof ErroAoCriarFichaEquipe
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send({
    message: "Equipe cadastrada com sucesso na ficha!",
  });
}
