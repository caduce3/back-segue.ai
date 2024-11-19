import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeCadastrarTransactionUseCase } from "@/use-cases/@factories/transaction/make-cadastrar-transaction-use-case";
import {
  CategoriaTransacao,
  MetodoPagamentoTransacao,
  TipoTransacao,
} from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function cadastrarTransaction(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const cadastrarTransactionBodySchema = z.object({
    nome: z.string(),
    tipo: z.enum([
      TipoTransacao.DEPOSITO,
      TipoTransacao.DESPESA,
      TipoTransacao.INVESTIMENTO,
    ]),
    valor: z.number().positive(),
    categoria: z.enum([
      CategoriaTransacao.BINGO,
      CategoriaTransacao.COMIDA,
      CategoriaTransacao.DOACAO,
      CategoriaTransacao.OUTRO,
      CategoriaTransacao.PATROCINIO,
      CategoriaTransacao.TRANSPORTE,
    ]),
    descricao: z.string().optional(),
    metodoPagamento: z.enum([
      MetodoPagamentoTransacao.BOLETO_BANCARIO,
      MetodoPagamentoTransacao.CARTAO_CREDITO,
      MetodoPagamentoTransacao.CARTAO_DEBITO,
      MetodoPagamentoTransacao.DINHEIRO,
      MetodoPagamentoTransacao.OUTRO,
      MetodoPagamentoTransacao.PIX,
      MetodoPagamentoTransacao.TRANSFERENCIA_BANCARIA,
    ]),
    date: z.string(),
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const {
    nome,
    tipo,
    valor,
    categoria,
    descricao,
    metodoPagamento,
    date,
    igrejaId,
    idUserEquipeDirigente,
  } = cadastrarTransactionBodySchema.parse(request.body);

  try {
    const cadastrarTransactionUseCase = makeCadastrarTransactionUseCase();

    await cadastrarTransactionUseCase.execute({
      nome,
      tipo,
      valor,
      categoria,
      descricao,
      metodoPagamento,
      date,
      igrejaId,
      idUserEquipeDirigente,
    });
  } catch (error) {
    if (
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send({
    message: "Transação cadastrada com sucesso!",
  });
}
