import { IgrejaRepository } from "@/repositories/igreja-repository";
import { TransactionRepository } from "@/repositories/transaction-repository";
import {
  CategoriaTransacao,
  MetodoPagamentoTransacao,
  TipoTransacao,
  Transaction,
} from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { ErroAoAtualizarTransactions } from "../@errors/transaction/erro-atualizar-transaction";

interface AtualizarTransactionRequest {
  id: string;
  nome?: string;
  tipo?: TipoTransacao;
  valor?: number;
  categoria?: CategoriaTransacao;
  descricao?: string;
  metodoPagamento?: MetodoPagamentoTransacao;
  date?: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
}

interface AtualizarTransactionResponse {
  transaction: Transaction;
}

export class AtualizarTransactionUseCase {
  constructor(
    private transactionRepository: TransactionRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
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
  }: AtualizarTransactionRequest): Promise<AtualizarTransactionResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const transaction = await this.transactionRepository.atualizarTransaction(
      id,
      {
        nome,
        tipo,
        valor,
        categoria,
        descricao,
        metodoPagamento,
        date,
      }
    );

    if (!transaction) throw new ErroAoAtualizarTransactions();

    return {
      transaction,
    };
  }
}
