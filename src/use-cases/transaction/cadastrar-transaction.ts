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

interface CadastrarTransactionRequest {
  nome: string;
  tipo: TipoTransacao;
  valor: number;
  categoria: CategoriaTransacao;
  descricao?: string;
  metodoPagamento: MetodoPagamentoTransacao;
  date: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
}

interface CadastrarTransactionResponse {
  transaction: Transaction;
}

export class CadastrarTransactionUseCase {
  constructor(
    private transactionRepository: TransactionRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    nome,
    tipo,
    valor,
    categoria,
    descricao,
    metodoPagamento,
    date,
    igrejaId,
    idUserEquipeDirigente,
  }: CadastrarTransactionRequest): Promise<CadastrarTransactionResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const transaction = await this.transactionRepository.registrarTransaction({
      nome,
      tipo,
      valor,
      categoria,
      descricao,
      metodoPagamento,
      date: new Date(date),
      igreja: {
        connect: {
          id: igrejaId,
        },
      },
    });

    return {
      transaction,
    };
  }
}
