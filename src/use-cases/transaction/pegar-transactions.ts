import { IgrejaRepository } from "@/repositories/igreja-repository";
import { TransactionRepository } from "@/repositories/transaction-repository";
import { Transaction } from "@prisma/client";
import { IgrejaNaoExiste } from "../@errors/igreja/erro-igreja-nao-existe";
import { ErroAoCarregarPagina } from "../@errors/erro-carregar-pagina";
import { ErroAoCarregarTransactions } from "../@errors/transaction/erro-carregar-transaction";

interface PegarTransactionRequest {
  page: number;
  igrejaId: string;
}

interface PegarTransactionResponse {
  transactionsList: Transaction[];
  totalItens: number;
  totalPages: number;
  currentPage: number;
}

export class PegarTransactionsUseCase {
  constructor(
    private transactionRepository: TransactionRepository,
    private igrejaRepository: IgrejaRepository
  ) {}

  async execute({
    page,
    igrejaId,
  }: PegarTransactionRequest): Promise<PegarTransactionResponse> {
    if (page <= 0) page = 1;
    const take = 10;

    const verifyIgrejaExist =
      await this.igrejaRepository.findIgrejaById(igrejaId);
    if (!verifyIgrejaExist) throw new IgrejaNaoExiste();

    const { transactions, totalCount } =
      await this.transactionRepository.pegarTransactions(take, page, igrejaId);

    if (!transactions || transactions.length === 0) {
      return {
        transactionsList: [],
        totalItens: 0,
        totalPages: 0,
        currentPage: 0,
      };
    }

    const totalPages = Math.ceil(totalCount / take);
    if (totalPages === 0) throw new ErroAoCarregarTransactions();
    if (page > totalPages) throw new ErroAoCarregarPagina();

    return {
      transactionsList: transactions,
      totalItens: totalCount,
      totalPages,
      currentPage: page,
    };
  }
}
