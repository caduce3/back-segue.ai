import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { ErroAoAtualizarFichaEquipe } from "@/use-cases/@errors/ficha-equipe/erro-atualizar-ficha-equipe";
import { FichaNaoExiste } from "@/use-cases/@errors/ficha/erro-ficha-nao-existe";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeAtualizarFichaEquipeUseCase } from "@/use-cases/@factories/ficha-equipe.ts/make-atualizar-ficha-equipe-use-case";
import { AvaliacaoEquipe, Equipes, FuncaoEquipe } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function atualizarFichaEquipe(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const atualizarFichaEquipeBodySchema = z.object({
    igrejaId: z.string().uuid(),
    idUserEquipeDirigente: z.string().uuid(),
    id: z.string().uuid(),
    equipe: z
      .enum([
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
      ])
      .optional(),
    ano: z.string().optional(),
    funcao: z
      .enum([FuncaoEquipe.COORDENADOR, FuncaoEquipe.ED, FuncaoEquipe.EQUIPISTA])
      .optional(),
    avaliacao: z
      .enum([
        AvaliacaoEquipe.NEGATIVA,
        AvaliacaoEquipe.POSITIVA,
        AvaliacaoEquipe.NEUTRA,
      ])
      .optional(),
    observacoes: z.string().optional(),
  });

  const {
    igrejaId,
    idUserEquipeDirigente,
    id,
    equipe,
    ano,
    funcao,
    avaliacao,
    observacoes,
  } = atualizarFichaEquipeBodySchema.parse(request.body);

  try {
    const atualizarFichaEquipeUseCase = makeAtualizarFichaEquipeUseCase();

    await atualizarFichaEquipeUseCase.execute({
      igrejaId,
      idUserEquipeDirigente,
      id,
      equipe,
      ano,
      funcao,
      avaliacao,
      observacoes,
    });
  } catch (error) {
    if (
      error instanceof FichaNaoExiste ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja ||
      error instanceof ErroAoAtualizarFichaEquipe
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(200).send({
    message: "Equipe atualizada com sucesso na ficha!",
  });
}
