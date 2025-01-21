import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { FichajaExiste } from "@/use-cases/@errors/ficha/erro-ficha-ja-existe";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeCadastrarFichaUseCase } from "@/use-cases/@factories/ficha/make-cadastrar-ficha-use-case";
import { CoresCirculos, Escolaridade, Sacramentos } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function cadastrarFicha(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const cadastrarFichaBodySchema = z.object({
    igrejaId: z.string().uuid(),
    idUserEquipeDirigente: z.string().uuid(),

    nomePastaFichas: z.string(),
    dataRecebimento: z.string(),
    endereco: z.string(),
    igrejaFrequenta: z.string().optional(),
    pastoral: z.string().optional(),
    observacoes: z.string().optional(),
    anoEncontro: z.string(),
    corCirculoOrigem: z.enum([
      CoresCirculos.AMARELO,
      CoresCirculos.AZUL,
      CoresCirculos.LARANJA,
      CoresCirculos.ROSA,
      CoresCirculos.VERDE,
      CoresCirculos.VERMELHO,
    ]),

    nomePrincipal: z.string(),
    emailPrincipal: z.string().email(),
    telefonePrincipal: z.string(),
    dataNascimentoPrincipal: z.string(),
    naturalidadePrincipal: z.string(),
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
    tipoFicha: z.enum(["JOVEM", "CASAL"]),
  });

  const {
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
    tipoFicha
  } = cadastrarFichaBodySchema.parse(request.body);

  try {
    const cadastrarFichaUseCase = makeCadastrarFichaUseCase();

    await cadastrarFichaUseCase.execute({
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
      tipoFicha
    });
  } catch (error) {
    if (
      error instanceof FichajaExiste ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send({
    message: "Ficha cadastrada com sucesso!",
  });
}
