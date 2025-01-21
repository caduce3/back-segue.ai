import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { EmailJaCadastrado } from "@/use-cases/@errors/erro-email-ja-cadastrado";
import { FichajaExiste } from "@/use-cases/@errors/ficha/erro-ficha-ja-existe";
import { ErroDeRegraNaMontagem } from "@/use-cases/@errors/ficha/erro-montagem-ficha";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeAtualizarFichaUseCase } from "@/use-cases/@factories/ficha/make-atualizar-ficha-use-case";
import {
  CoresCirculos,
  Equipes,
  Escolaridade,
  FuncaoEquipe,
  Sacramentos,
} from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function atualizarFicha(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const atualizarFichaBodySchema = z.object({
    id: z.string().uuid(),
    igrejaId: z.string().uuid(),
    idUserEquipeDirigente: z.string().uuid(),

    nomePastaFichas: z.string().optional(),
    dataRecebimento: z.string().optional(),
    endereco: z.string().optional(),
    igrejaFrequenta: z.string().optional(),
    pastoral: z.string().optional(),
    observacoes: z.string().optional(),
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

    nomePrincipal: z.string().optional(),
    emailPrincipal: z.string().email().optional(),
    telefonePrincipal: z.string().optional(),
    dataNascimentoPrincipal: z.string().optional(),
    naturalidadePrincipal: z.string().optional(),
    apelidoPrincipal: z.string().optional(),
    filiacaoPai: z.string().optional(),
    filiacaoMae: z.string().optional(),
    escolaridade: z
      .enum([
        Escolaridade.DOUTORADO,
        Escolaridade.ENSINO_FUNDAMENTAL,
        Escolaridade.ENSINO_FUNDAMENTAL_INCOMPLETO,
        Escolaridade.ENSINO_MEDIO,
        Escolaridade.ENSINO_MEDIO_INCOMPLETO,
        Escolaridade.ENSINO_SUPERIOR_COMPLETO,
        Escolaridade.ENSINO_SUPERIOR_INCOMPLETO,
        Escolaridade.MESTRADO,
        Escolaridade.POS_DOUTORADO,
        Escolaridade.POS_GRADUACAO,
      ])
      .optional(),
    sacramentos: z
      .enum([
        Sacramentos.BATISMO,
        Sacramentos.CRISMA,
        Sacramentos.EUCARISTIA,
        Sacramentos.NENHUM,
      ])
      .optional(),

    nomeSecundario: z.string().optional(),
    emailSecundario: z.string().email().optional(),
    telefoneSecundario: z.string().optional(),
    dataNascimentoSecundario: z.string().optional(),
    naturalidadeSecundario: z.string().optional(),
    apelidoSecundario: z.string().optional(),

    status: z.enum(["ATIVO", "INATIVO"]).optional(),
    equipeAtual: z
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
        Equipes.VISITACAO,
        Equipes.NENHUMA,
        Equipes.CG,
        Equipes.ESPIRITUALIZADORA,
        Equipes.PROVER,
      ])
      .optional(),
    funcaoEquipeAtual: z
      .enum([
        FuncaoEquipe.EQUIPISTA,
        FuncaoEquipe.COORDENADOR,
        FuncaoEquipe.APOIO,
      ])
      .optional(),
  });

  const {
    id,
    igrejaId,
    idUserEquipeDirigente,

    nomePastaFichas,
    dataRecebimento,
    endereco,
    igrejaFrequenta,
    pastoral,
    observacoes,
    anoEncontro,
    corCirculoOrigem,
    nomePrincipal,
    emailPrincipal,
    telefonePrincipal,
    dataNascimentoPrincipal,
    naturalidadePrincipal,
    apelidoPrincipal,
    filiacaoPai,
    filiacaoMae,
    escolaridade,
    sacramentos,
    nomeSecundario,
    emailSecundario,
    telefoneSecundario,
    dataNascimentoSecundario,
    naturalidadeSecundario,
    apelidoSecundario,

    status,
    equipeAtual,
    funcaoEquipeAtual,
  } = atualizarFichaBodySchema.parse(request.body);

  try {
    const atualizarFichaUseCase = makeAtualizarFichaUseCase();

    await atualizarFichaUseCase.execute({
      id,
      igrejaId,
      idUserEquipeDirigente,

      nomePastaFichas,
      dataRecebimento,
      endereco,
      igrejaFrequenta,
      pastoral,
      observacoes,
      anoEncontro,
      corCirculoOrigem,
      nomePrincipal,
      emailPrincipal,
      telefonePrincipal,
      dataNascimentoPrincipal,
      naturalidadePrincipal,
      apelidoPrincipal,
      filiacaoPai,
      filiacaoMae,
      escolaridade,
      sacramentos,
      nomeSecundario,
      emailSecundario,
      telefoneSecundario,
      dataNascimentoSecundario,
      naturalidadeSecundario,
      apelidoSecundario,

      status,
      equipeAtual,
      funcaoEquipeAtual,
    });
  } catch (error) {
    if (
      error instanceof FichajaExiste ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja ||
      error instanceof EmailJaCadastrado ||
      error instanceof ErroDeRegraNaMontagem
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(200).send({
    message: "Ficha atualizada com sucesso!",
  });
}
