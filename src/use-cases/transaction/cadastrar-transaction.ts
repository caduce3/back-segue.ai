import { IgrejaRepository } from "@/repositories/igreja-repository";
import { TransactionRepository } from "@/repositories/transaction-repository";
import {
  CategoriaTransacao,
  MetodoPagamentoTransacao,
  TipoTransacao,
  Transaction,
} from "@prisma/client";
import { IgrejaNaoExiste } from "../@errors/igreja/erro-igreja-nao-existe";

interface CadastrarTransactionRequest {
  nome: string;
  tipo: TipoTransacao;
  valor: number;
  categoria: CategoriaTransacao;
  descricao?: string;
  metodoPagamento: MetodoPagamentoTransacao;
  date: string;
  igrejaId: string;
}

interface CadastrarTransactionResponse {
  transaction: Transaction;
}

export class CadastrarTransactionUseCase {
  constructor(
    private transactionRepository: TransactionRepository,
    private igrejaRepository: IgrejaRepository
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
  }: CadastrarTransactionRequest): Promise<CadastrarTransactionResponse> {

    const verifyIgrejaExist = await this.igrejaRepository.findIgrejaById(igrejaId);
    if (!verifyIgrejaExist) throw new IgrejaNaoExiste();

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
