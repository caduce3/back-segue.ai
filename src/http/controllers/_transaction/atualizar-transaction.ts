import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroAoAtualizarTransactions } from "@/use-cases/@errors/transaction/erro-atualizar-transaction";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeAtualizarTransactionUseCase } from "@/use-cases/@factories/transaction/make-atualizar-transaction-use-case";
import {
  CategoriaTransacao,
  MetodoPagamentoTransacao,
  TipoTransacao,
} from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function atualizarTransaction(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const atualizarTransactionBodySchema = z.object({
    id: z.string(),
    idUserEquipeDirigente: z.string(),
    igrejaId: z.string(),
    nome: z.string().optional(),
    tipo: z
      .enum([
        TipoTransacao.DEPOSITO,
        TipoTransacao.DESPESA,
        TipoTransacao.INVESTIMENTO,
      ])
      .optional(),
    valor: z.number().positive().optional(),
    categoria: z
      .enum([
        CategoriaTransacao.BINGO,
        CategoriaTransacao.COMIDA,
        CategoriaTransacao.DOACAO,
        CategoriaTransacao.OUTRO,
        CategoriaTransacao.PATROCINIO,
        CategoriaTransacao.TRANSPORTE,
      ])
      .optional(),
    descricao: z.string().optional(),
    metodoPagamento: z
      .enum([
        MetodoPagamentoTransacao.BOLETO_BANCARIO,
        MetodoPagamentoTransacao.CARTAO_CREDITO,
        MetodoPagamentoTransacao.CARTAO_DEBITO,
        MetodoPagamentoTransacao.DINHEIRO,
        MetodoPagamentoTransacao.OUTRO,
        MetodoPagamentoTransacao.PIX,
        MetodoPagamentoTransacao.TRANSFERENCIA_BANCARIA,
      ])
      .optional(),
    date: z.string().optional(),
  });

  const {
    id,
    nome,
    tipo,
    valor,
    categoria,
    descricao,
    metodoPagamento,
    date,
    igrejaId,
    idUserEquipeDirigente,
  } = atualizarTransactionBodySchema.parse(request.body);

  try {
    const atualizarTransactionUseCase = makeAtualizarTransactionUseCase();

    await atualizarTransactionUseCase.execute({
      id,
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
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja ||
        error instanceof ErroAoAtualizarTransactions
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(200).send({
    message: "Transação atualizada com sucesso!",
  });
}
