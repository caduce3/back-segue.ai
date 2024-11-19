import { IgrejaRepository } from "@/repositories/igreja-repository";
import { TransactionRepository } from "@/repositories/transaction-repository";
import { Transaction } from "@prisma/client";
import { ErroAoCarregarPagina } from "../@errors/erro-carregar-pagina";
import { ErroAoCarregarTransactions } from "../@errors/transaction/erro-carregar-transaction";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";

interface PegarUnicaTransactionRequest {
  id: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
}

interface PegarUnicaTransactionResponse {
  transaction: Transaction;
}

export class PegarUnicaTransactionUseCase {
  constructor(
    private transactionRepository: TransactionRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
    igrejaId,
    idUserEquipeDirigente,
  }: PegarUnicaTransactionRequest): Promise<PegarUnicaTransactionResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const transaction =
      await this.transactionRepository.findTransactionById(id);
    if (!transaction) throw new ErroAoCarregarTransactions();

    return {
      transaction,
    };
  }
}
