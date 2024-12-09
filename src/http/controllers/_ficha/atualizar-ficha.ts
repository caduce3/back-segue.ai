import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { EmailJaCadastrado } from "@/use-cases/@errors/erro-email-ja-cadastrado";
import { FichajaExiste } from "@/use-cases/@errors/ficha/erro-ficha-ja-existe";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeAtualizarFichaUseCase } from "@/use-cases/@factories/ficha/make-atualizar-ficha-use-case";
import {
  CoresCirculos,
  Escolaridade,
  Pastoral,
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
    nomeJovem: z.string().optional(),
    email: z.string().email().optional(),
    telefone: z.string().optional(),
    endereco: z.string().optional(),
    dataNascimento: z.string().optional(),
    naturalidade: z.string().optional(),
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
    religiao: z.string().optional(),
    igrejaFrequenta: z.string().optional(),
    sacramentos: z
      .enum([
        Sacramentos.BATISMO,
        Sacramentos.CRISMA,
        Sacramentos.EUCARISTIA,
        Sacramentos.NENHUM,
      ])
      .optional(),
    pastoral: z
      .enum([
        Pastoral.POVO_DA_RUA,
        Pastoral.CARIDADE,
        Pastoral.CATEQUESE,
        Pastoral.COMUNICACAO,
        Pastoral.FAMILIA,
        Pastoral.JOVENS,
        Pastoral.LITURGIA,
        Pastoral.MUSICA,
        Pastoral.SAUDE,
        Pastoral.OUTRO,
      ])
      .optional(),
    nomeConvidadoPor: z.string().optional(),
    telefoneConvidadoPor: z.string().optional(),
    enderecoConvidadoPor: z.string().optional(),
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
  });

  const {
    id,
    igrejaId,
    idUserEquipeDirigente,
    nomePastaFichas,
    dataRecebimento,
    nomeJovem,
    email,
    telefone,
    endereco,
    dataNascimento,
    naturalidade,
    filiacaoPai,
    filiacaoMae,
    escolaridade,
    religiao,
    igrejaFrequenta,
    sacramentos,
    pastoral,
    nomeConvidadoPor,
    telefoneConvidadoPor,
    enderecoConvidadoPor,
    observacoes,
    anoEncontro,
    corCirculoOrigem,
  } = atualizarFichaBodySchema.parse(request.body);

  try {
    const atualizarFichaUseCase = makeAtualizarFichaUseCase();

    await atualizarFichaUseCase.execute({
      id,
      igrejaId,
      idUserEquipeDirigente,
      nomePastaFichas,
      dataRecebimento,
      nomeJovem,
      email,
      telefone,
      endereco,
      dataNascimento,
      naturalidade,
      filiacaoPai,
      filiacaoMae,
      escolaridade,
      religiao,
      igrejaFrequenta,
      sacramentos,
      pastoral,
      nomeConvidadoPor,
      telefoneConvidadoPor,
      enderecoConvidadoPor,
      observacoes,
      anoEncontro,
      corCirculoOrigem,
    });
  } catch (error) {
    if (
      error instanceof FichajaExiste ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja ||
      error instanceof EmailJaCadastrado
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(200).send({
    message: "Ficha atualizada com sucesso!",
  });
}
